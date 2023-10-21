const theme = () => {

    const trigger = document.querySelector('[data-theme]'),
          triggerText = trigger.querySelector('span'),
          body = document.body,
          lang = document.documentElement.lang;

    let curTheme = localStorage.getItem('theme');

    function isSystemDark() {
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        return darkThemeMq.matches;
    }
    
    function switchSystemTheme() {
        if (isSystemDark()) {
            body.classList.add('dark');
        } else {
            body.classList.remove('dark');
        }
    }

    function prevTheme() {
        const theme = localStorage.getItem('theme');
        switch(theme) {
            case 'dark':
                body.classList.add('dark');
                changeText('Темная', 'Dark');
                break;
            case 'light':
                body.classList.remove('dark');
                changeText('Светлая', 'Light');
                break;
            case 'system':
                switchSystemTheme();
                changeText('Система', 'System');
                break;
        }
    }
    prevTheme();

    function changeText(rusTheme, enTheme) {
        if (lang === 'ru') {
            triggerText.innerHTML = rusTheme;
        } else {
            triggerText.innerHTML = enTheme;
        }

    }

    trigger.addEventListener('click', () => {
        if (curTheme === 'system') {
            curTheme = 'light';
            localStorage.setItem('theme', 'light');
            changeText('Светлая', 'Light');
            body.classList.remove('dark');
            trigger.setAttribute('data-theme', 'light');
        } else if (curTheme === 'light') {
            curTheme = 'dark';
            localStorage.setItem('theme', 'dark');
            changeText('Темная', 'Dark');
            body.classList.add('dark');
            trigger.setAttribute('data-theme', 'dark');
        } else if (curTheme === 'dark') {
            curTheme = 'system';
            localStorage.setItem('theme', 'system');
            changeText('Система', 'System');
            switchSystemTheme();
            trigger.setAttribute('data-theme', 'system');
        }
    })
}

export default theme;