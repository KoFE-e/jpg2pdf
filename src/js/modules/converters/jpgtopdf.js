import {jsPDF} from 'jspdf';
import { success, error } from '../notifications';

const jpgtopdf = () => {
    const lang = document.documentElement.lang;

    const createPDF = function(imgData) {
        const doc = new jsPDF();

        doc.addImage(imgData, 'JPEG', 10, 10, 190, 190, 'image');

        const pdfDataUri = doc.output('datauristring');
        const a = document.createElement('a');
        a.href = pdfDataUri;
        a.download = 'image.pdf';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    function ConvertFile(file) {
        if (file.size != 0 && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgData = new Image();
                imgData.src = e.target.result;
                imgData.onload = function() {
                    createPDF(imgData);
                };
            };
            reader.readAsDataURL(file);
            if (lang === 'en') {
                success('The file has been successfully converted. Check downloads');
            } else {
                success('Файл успешно конвертирован. Проверьте загрузки');
            }
        } else {
            if (lang === 'en') {
                error('Please drop a valid JPG image.');
            } else {
                error('Пожалуйста, поместите JPG файл');
            }
        }
    }

    // Handle file drop event
    try {
        const dropArea = document.querySelector('[data-jpgtopdf]');
        dropArea.addEventListener('dragover', function(e) {
            e.preventDefault();
        });

        dropArea.addEventListener('change', function(event) {
            const file = event.target.files[0];

            ConvertFile(file)
        });

        dropArea.addEventListener('drop', function(e) {
            e.preventDefault();

            const file = e.dataTransfer.files[0];

            ConvertFile(file)
        });
    } catch(e) {
        if (e.name !== 'TypeError') {
            if (lang === 'en') {
                error(e);
            } else {
                error(e);
            }
        }
    }
    
}

export default jpgtopdf;