import Validator from "./validator";

const forms = () => {
    const validatorLogin = new Validator('#loginForm', '#loginForm .modal__form__input', '#loginForm .modal__form__input_mail', '#loginForm .modal__form__input_password'),
        validatorRegister = new Validator('#registerForm', '#registerForm .modal__form__input', '#registerForm .modal__form__input_mail', '#registerForm .modal__form__input_password', '#registerForm .modal__form__input_confirm');

    const formLogin = document.querySelector('#loginForm'),
          formRegister = document.querySelector('#registerForm'),
          inputsLogin = document.querySelectorAll('#loginForm .modal__form__input'),
          inputsRegister = document.querySelectorAll('#registerForm .modal__form__input');

    function bindValidator(form, inputs, validator) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            validator.showErrors();
        }) 
        inputs.forEach(item => {
            if (item.name == 'password' || item.name == 'confirm' || item.name == 'mail') {
                item.addEventListener('keypress', function(e) {
                    if (e.key.match(/[а-яА-Я ]/ig)) {
                        e.preventDefault();
                    }
                });
            }
            item.addEventListener('input', () => {
                validator.showErrors();
            })
        })
    }

    bindValidator(formLogin, inputsLogin, validatorLogin);
    bindValidator(formRegister, inputsRegister, validatorRegister);

    function changeIndicator(value) {
        const passwordDiffBlock = document.querySelector('.modal__form__password-difficult'),
              passwordDiffIndic = passwordDiffBlock.querySelector('.modal__form__password-difficult-indicator span'),
              passwordDiffText = passwordDiffBlock.querySelector('.modal__form__password-difficult-text');

        const hasLowLetters = value.match(/[a-z]/),
              hasHighLetters = value.match(/[A-Z]/),
              hasNumbers = value.match(/[0-9]/),
              hasNonWords = value.match(/\W/);

        if (hasLowLetters && hasHighLetters && hasNumbers && hasNonWords && value.length >= 10) {
            passwordDiffIndic.style.width = '100%';
            passwordDiffIndic.style.backgroundColor = '#48ff45';
            passwordDiffIndic.style.borderRadius = '6px';
            passwordDiffText.innerHTML = 'Отличный пароль';
        } else if ((hasLowLetters && hasHighLetters && hasNumbers || hasLowLetters && hasHighLetters && hasNonWords) && value.length >= 7) {
            passwordDiffIndic.style.width = '75%';
            passwordDiffIndic.style.backgroundColor = '#b3ff6d';
            passwordDiffIndic.style.borderRadius = '6px 0 0 6px';
            passwordDiffText.innerHTML = 'Сложный пароль';
        } else if ((hasLowLetters && hasHighLetters || hasLowLetters && hasNumbers || hasLowLetters && hasNonWords || hasHighLetters && hasNumbers || hasHighLetters && hasNonWords || hasNumbers && hasNonWords) && value.length >= 5) {
            passwordDiffIndic.style.width = '50%';
            passwordDiffIndic.style.backgroundColor = '';
            passwordDiffIndic.style.borderRadius = '6px 0 0 6px';
            passwordDiffText.innerHTML = 'Ты можешь еще лучше!';
        } else if (hasLowLetters || hasHighLetters || hasNonWords || hasNumbers) {
            passwordDiffIndic.style.width = '25%';
            passwordDiffIndic.style.backgroundColor = '#ff5f5f';
            passwordDiffIndic.style.borderRadius = '6px 0 0 6px';
            passwordDiffText.innerHTML = 'Слабый пароль';
        } else {
            passwordDiffIndic.style.width = '0%';
            passwordDiffIndic.style.backgroundColor = '';
            passwordDiffIndic.style.borderRadius = '6px 0 0 6px';
            passwordDiffText.innerHTML = 'Начните вводить пароль';
        }
    }

    const password = document.querySelector('.modal_register .modal__form__input_password');

    password.addEventListener('input', () => {
        changeIndicator(password.value);
    })
}

export default forms;