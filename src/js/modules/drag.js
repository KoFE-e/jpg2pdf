const drag = () => {
    const fileInput = document.querySelector('[name="files"]'),
          overlay = document.querySelector('.file__drag');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInput.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        overlay.classList.add('file__drag_active');
    }

    function unhighlight() {
        overlay.classList.remove('file__drag_active');
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInput.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInput.addEventListener(eventName, unhighlight, false);
    });
}

export default drag;