class Validator {

    constructor(formSelector, fieldsSelector, emailSelector, passwordSelector, confirmPasswordSelector = '') {
        this.form = document.querySelector(formSelector);
        this.fields = document.querySelectorAll(fieldsSelector);
        this.email = document.querySelector(emailSelector);
        this.password = document.querySelector(passwordSelector);
        if (confirmPasswordSelector != '') {
            this.confirmPassword = document.querySelector(confirmPasswordSelector);
        }

    }

    checkLang() {
        return document.documentElement.lang;
    }

    clearErrors(form) {
        const errors = form.querySelectorAll('.error');
        errors.forEach(item => {
            item.remove();
        });
    };
    
    createError(message) {
        const error = document.createElement('span');
                error.classList.add('error');
                error.textContent = message;
        return error;
    };
    
    validateEmpty(field) {
        return field.value == '';
    };
    
    validateLength(field) {
        return field.value.length < 2;
    };
    
    validateEmail(email) {
        return email.value.match('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
    };
    
    validatePassword(password, confirmPassword) {
        return password.value == confirmPassword.value;
    };
    
    checkEmpty(fields) {
        fields.forEach(item => {
            if (this.validateEmpty(item)) {
                let error;
                if (this.checkLang() === 'ru') {
                    error = this.createError("Поле не должно быть пустым");
                } else {
                    error = this.createError("The field must not be empty");
                }
                item.parentElement.querySelector('.errors').appendChild(error);
            }
        });
    };
    
    minLength(fields) {
        fields.forEach(item => {
            if (this.validateLength(item)) {
                let error;
                if (this.checkLang() === 'ru') {
                    error = this.createError("Длина должна быть не менее 2 символов");
                } else {
                    error = this.createError("The length must be at least 2 characters");
                }
                item.parentElement.querySelector('.errors').appendChild(error);
            }
        });
    };
    
    checkEmail(email) {
        if (!this.validateEmail(email)) {
            let error;
            if (this.checkLang() === 'ru') {
                error = this.createError("Введите адрес почты");
            } else {
                error = this.createError("Enter the mail address");
            }
            email.parentElement.querySelector('.errors').appendChild(error);
        }
    };
    
    checkPassword(password, confirmPassword) {
        if (!this.validatePassword(password, confirmPassword)) {
            let error;
            if (this.checkLang() === 'ru') {
                error = this.createError("Пароли не совпадают");
            } else {
                error = this.createError("The passwords don't match");
            }
            confirmPassword.parentElement.querySelector('.errors').appendChild(error);
        }
    };
    
    showErrors() {
        this.clearErrors(this.form);
        this.checkEmpty(this.fields);
        this.minLength(this.fields);
        this.checkEmail(this.email);
        if (this.confirmPassword) {
            this.checkPassword(this.password, this.confirmPassword);
        }
        this.fields.forEach(item => {
            if (item.parentElement.querySelector('.error')) {
                item.parentElement.querySelector('.errors').classList.add('errors_active');
            } else {
                item.parentElement.querySelector('.errors').classList.remove('errors_active');
            }
        })
    };

}

export default Validator;