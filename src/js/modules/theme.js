const theme = () => {

    const trigger = document.querySelector('[data-theme]'),
          triggerText = trigger.querySelector('span'),
          body = document.body,
          lang = document.documentElement.lang;

    let curTheme = trigger.getAttribute('data-theme');

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
    switchSystemTheme();

    trigger.addEventListener('click', () => {
        if (curTheme === 'system') {
            curTheme = 'light';
            if (lang === 'ru') {
                triggerText.innerHTML = 'Светлая';
            } else {
                triggerText.innerHTML = 'Light';
            }
            body.classList.remove('dark');
            trigger.setAttribute('data-theme', 'light');
        } else if (curTheme === 'light') {
            curTheme = 'dark';
            if (lang === 'ru') {
                triggerText.innerHTML = 'Темная';
            } else {
                triggerText.innerHTML = 'Dark';
            }
            body.classList.add('dark');
            trigger.setAttribute('data-theme', 'dark');
        } else if (curTheme === 'dark') {
            curTheme = 'system';
            if (lang === 'ru') {
                triggerText.innerHTML = 'Система';
            } else {
                triggerText.innerHTML = 'System';
            }
            switchSystemTheme();
            trigger.setAttribute('data-theme', 'system');
        }
    })
}

export default theme;