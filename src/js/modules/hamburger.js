const hamburger = () => {
    const hamburger = document.querySelector('.hamburger'),
          menu = document.querySelector('.menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('expanded');
        menu.classList.toggle('menu_active');
    });
}

export default hamburger;