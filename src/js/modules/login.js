const login = () => {
    const loginBtn = document.querySelector('.header__menu-loginbtn'),
          header = document.querySelector('.header');

    loginBtn.addEventListener('click', () => {
        header.classList.toggle('header_login');
    });
}

export default login;