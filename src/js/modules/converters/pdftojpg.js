import 'html2canvas';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

import { success, error } from '../notifications';

const pdftojpg = () => {
    const lang = document.documentElement.lang;

    const catchNotErrorType = (e) => {
        if (e.name !== 'TypeError') {
            if (lang === 'en') {
                error(e);
            } else {
                error(e);
            }
        }
    }

    function ConvertFile(selectedFile) {
        if (selectedFile) {
            if (selectedFile.type === 'application/pdf') {
                const fileURL = URL.createObjectURL(selectedFile);
        
                pdfjsLib.getDocument({url: fileURL}).promise.then(function (pdf) {
                    pdf.getPage(1).then(function (page) {
                        const viewport = page.getViewport({scale: 1});
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
        
                        const renderContext = {
                            canvasContext: context,
                            viewport: viewport,
                        };
        
                        page.render(renderContext).promise.then(function () {
                            // Создаем изображение JPEG из canvas
                            const imgData = canvas.toDataURL('image/jpeg');

                            const blob = dataURLtoBlob(imgData);
                            const fileToSend = new File([blob], 'converted.jpg', { type: 'image/jpeg' });
        
                            // Создаем ссылку для скачивания
                            const a = document.createElement('a');
                            a.href = fileToSend;
                            a.download = 'converted.jpg';
                            a.style.display = 'none';
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);

                            // отправляем файл на сервер
                            const formData = new FormData();
                            formData.append('file', imgData);
                            formData.append('username', sessionStorage.getItem("username"));

                            const xhr = new XMLHttpRequest();
                            xhr.open('POST', 'http://127.0.0.1:8080/api/upload-file', true);
                            xhr.send(formData);
                            //
                        });
                    });
                    if (lang === 'en') {
                        success('The file has been successfully converted. Check downloads');
                    } else {
                        success('Файл успешно конвертирован. Проверьте загрузки');
                    }
                })
                .catch((error) => {
                    catchNotErrorType(error);
                });
            } else {
                if (lang === 'en') {
                    error('Please drop a valid PDF file.');
                } else {
                    error('Пожалуйста, поместите PDF файл');
                }
            }
        }
    }
    
    try {
        // Handle file drop event
        const dropArea = document.querySelector('[data-pdftojpg]')
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
        catchNotErrorType(e);
    }
}

export default pdftojpg;