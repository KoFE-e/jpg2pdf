const backend = () => {
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
        }
    }

    async function be_logout() {
        const response = await fetch('http://127.0.0.1:8080/api/logout', {
            method: 'GET',
        });

        const data = await response.json();
        document.getElementById("response").innerText = data.message;

        if (data.success === "true") {
            sessionStorage.removeItem('isAuthenticated');
            sessionStorage.removeItem('username');
        }
    }

    async function waitFor200() {
        // Ожидаем статус 200
        const response = await fetch('http://127.0.0.1:8080/api/getFilesData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: sessionStorage.getItem("username"),
                isAuthenticated: sessionStorage.getItem("isAuthenticated")
            }),
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(data => {
                console.log('Успешный ответ:', data);

                const fileTableBody = document.getElementById('fileTableBody');
                fileTableBody.innerHTML = '';

                // Парсинг и отображение данных
                data.forEach(file => {
                    const row = fileTableBody.insertRow();
                    row.insertCell(0).textContent = file.id;
                    row.insertCell(1).textContent = file.username;
                    row.insertCell(2).textContent = file.filename;
                    row.insertCell(3).textContent = new Date(file.created_at).toLocaleString();
                });
            });
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
                    waitFor200();
                }
            })
            .then(data => {
                console.log('Успешный ответ:', data);

                const fileTableBody = document.getElementById('fileTableBody');
                fileTableBody.innerHTML = '';

                // Парсинг и отображение данных
                data.forEach(file => {
                    const row = fileTableBody.insertRow();
                    row.insertCell(0).textContent = file.id;
                    row.insertCell(1).textContent = file.username;

                    // Создаем ссылку на файл
                    const fileLink = document.createElement('a');
                    fileLink.textContent = file.filename;
                    fileLink.href = "http://127.0.0.1:8080/api/getFile?file=" + file.filename;

                    // Вставляем ссылку в ячейку
                    const cell = row.insertCell(2);
                    cell.appendChild(fileLink);

                    row.insertCell(3).textContent = new Date(file.created_at).toLocaleString();
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

            document.getElementById("currentUser").innerText = sessionStorage.getItem("username")
        }
    }

    async function be_uploadFile() {
        const file = document.getElementById('fileInput').files[0];

        const formData = new FormData();
        formData.append('file', file);
        formData.append('username', sessionStorage.getItem("username"));

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:8080/api/upload-file', true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    document.getElementById('message').textContent = 'Файл успешно загружен и сохранен на сервере.';
                } else {
                    document.getElementById('message').textContent = 'Ошибка при загрузке файла и имени.';
                }
            }
        };

        xhr.send(formData);
    }

    document.getElementById("currentUser").innerText = sessionStorage.getItem("username")

    document.getElementById("loginButton").addEventListener("click", () => {
        be_login();
    })

    document.getElementById("registerButton").addEventListener("click", () => {
        be_register();
    })
}

export default backend;