const hamburger = () => {
    const hamburger = document.querySelector('.hamburger'),
          menu = document.querySelector('.menu');

    function addClasses() {
        hamburger.classList.add('expanded');
        menu.classList.add('menu_active');
    }

    function removeClasses() {
        hamburger.classList.remove('expanded');
        menu.classList.remove('menu_active');
    }
    
    hamburger.addEventListener('click', () => {
        if (menu.classList.contains('menu_active')) {
            removeClasses();
        } else {
            addClasses();
        }
    });

    window.addEventListener('click', (e) => {
        if (e.target.closest('.menu') != menu && e.target.closest('.hamburger') != hamburger) {
            removeClasses();
        }
    });
}

export default hamburger;