import Validator from "./validator";

const backend = () => {
    const header = document.querySelector('.header');
    const validatorLogin = new Validator('#loginForm', '#loginForm .modal__form__input', '#loginForm .modal__form__input_mail', '#loginForm .modal__form__input_password'),
        validatorRegister = new Validator('#registerForm', '#registerForm .modal__form__input', '#registerForm .modal__form__input_mail', '#registerForm .modal__form__input_password', '#registerForm .modal__form__input_confirm');

    async function be_login() {
        const login = document.getElementById("l_mail").value;
        const password = document.getElementById("l_password").value;

        const response = await fetch('http://127.0.0.1:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: login, password: password}),
        });

        const data = await response.json();

        if (data.success === "true") {
            sessionStorage.setItem('isAuthenticated', 'true');
            sessionStorage.setItem('username', login);

            document.getElementById("currentUser").innerText = sessionStorage.getItem("username")
            header.classList.add('header_login');
            window.location.reload()
        }
    }

    async function be_logout() {
        const response = await fetch('http://127.0.0.1:8080/api/logout', {
            method: 'GET',
        });

        const data = await response.json();

        if (data.success === "true") {
            sessionStorage.removeItem('isAuthenticated');
            sessionStorage.removeItem('username');
            header.classList.remove('header_login');
            window.location.reload()
        }
    }

    async function be_getFilesData() {
        const response = await fetch('http://127.0.0.1:8080/api/getFilesData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: sessionStorage.getItem("username"),
                isAuthenticated: sessionStorage.getItem("isAuthenticated"),
            }),
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    //waitFor200();
                }
            })
            .then(data => {
                console.log('Успешный ответ:', data);

                const modalFilesList = document.querySelector('.modal__files-list');

                // Очищаем существующие элементы
                modalFilesList.innerHTML = '';

                // Парсинг и отображение данных
                data.forEach(file => {
                    const fileItem = document.createElement('div');
                    fileItem.classList.add('modal__file');

                    const fileImg = document.createElement('img');
                    fileImg.src = 'assets/icons/pdf.png';
                    fileImg.alt = 'pdf';
                    fileImg.classList.add('modal__file__img');
                    fileItem.appendChild(fileImg);

                    const fileText = document.createElement('div');
                    fileText.classList.add('modal__file__text');

                    const fileName = document.createElement('div');
                    fileName.classList.add('modal__file__text-filename');
                    fileName.textContent = file.filename;
                    fileText.appendChild(fileName);

                    const fileLink = document.createElement('a');
                    fileLink.classList.add('modal__file__text-link');
                    fileLink.textContent = "Скачать";
                    //fileLink.addEventListener("click", be_getFile(file.id));
                    fileLink.href = "http://127.0.0.1:8080/api/getFile?id=" + file.id;

                    const fileCounter = document.getElementById('fileCounter');
                    fileCounter.textContent = data.length;

                    fileText.appendChild(fileLink)
                    fileItem.appendChild(fileText)

                    modalFilesList.appendChild(fileItem)
                });
            });
    }


    async function be_register() {
        const username = document.getElementById("r_username").value;
        const password = document.getElementById("r_password").value;
        const email = document.getElementById("r_email").value;

        const response = await fetch('http://127.0.0.1:8080/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password, email: email}),
        });

        const data = await response.json();

        if (data.success === "true") {
            sessionStorage.setItem('isAuthenticated', 'true');
            sessionStorage.setItem('username', username);

            document.getElementById("currentUser").innerText = sessionStorage.getItem("username");
            header.classList.add('header_login');
            window.location.reload()
        }
    }

    function updateFileCounter() {
        const modalFilesList = document.querySelector('.modal__files-list');
        const fileCounter = document.querySelector('.header__menu__files-counter');

        const fileCount = modalFilesList.childElementCount;

        fileCounter.textContent = fileCount;
    }

    document.getElementById("currentUser").innerText = sessionStorage.getItem("username")

    document.getElementById("loginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        //validatorLogin.showErrors();
        if (!document.getElementById("loginForm").querySelector('.error')) {
            be_login();
        }

    })

    document.getElementById("registerForm").addEventListener("submit", (e) => {
        e.preventDefault();
        validatorRegister.showErrors();
        if (!document.getElementById("registerForm").querySelector('.error')) {
            be_register();
        }
    })

    document.getElementById("fileListButton").addEventListener("click", () => {
        be_getFilesData();
    })

    be_getFilesData();

    const loginOrLogoutButton = document.getElementById("loginAndLogoutButton");
    if (sessionStorage.getItem("isAuthenticated") !== "true") {
        if (document.documentElement.lang === 'ru') {
            loginOrLogoutButton.innerText = "Вход";
        } else {
            loginOrLogoutButton.innerText = "Sign in";
        }
    } else {
        header.classList.add('header_login');
        if (document.documentElement.lang === 'ru') {
            loginOrLogoutButton.innerText = "Выйти";
        } else {
            loginOrLogoutButton.innerText = "Sign out";
        }
        loginOrLogoutButton.addEventListener("click", () => {
            be_logout();
        })
    }
}

export default backend;