const modal = () => {

    function bindModal(triggerSelector, modalSelector) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll();

        console.log(windows);
        function closeAllModals() {
            windows.forEach(item => {
                item.classList.remove('modal_active');
            });
        }

        function openModal() {
            closeAllModals();

            modal.classList.add('modal_active');
        }

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                openModal();
            });
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeAllModals();
            }
        });
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    bindModal('[data-trigger="login"]', '.modal_login');
    bindModal('[data-trigger="register"]', '.modal_register');
    bindModal('[data-trigger="help"]', '.modal_help');

};

export default modal;