import Swal from 'sweetalert2'

const success = (message) => {
    const lang = document.documentElement.lang;
    const theme = document.body.classList.contains('dark') ? {
        background: '#252525',
        color: '#fff'
    } : {};
    if (lang === 'en') {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: message,
            ...theme
        })
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Успешно',
            text: message,
            ...theme
        })
    }
}

const error = (errorMessage) => {
    const lang = document.documentElement.lang;
    const theme = document.body.classList.contains('dark') ? {
        background: '#252525',
        color: '#fff'
    } : {};
    if (lang === 'en') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorMessage,
            ...theme
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ой...',
            text: errorMessage,
            ...theme
        })
    }
}

export {success, error}