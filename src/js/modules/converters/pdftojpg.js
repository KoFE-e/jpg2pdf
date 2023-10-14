import 'html2canvas';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const pdftojpg = () => {
    function ConvertFile(selectedFile) {
        if (selectedFile) {
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
    
                        // Создаем ссылку для скачивания
                        const a = document.createElement('a');
                        a.href = imgData;
                        a.download = 'page.jpg';
                        a.style.display = 'none';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    });
                });
            });
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
    } catch(e) {}
}

export default pdftojpg;