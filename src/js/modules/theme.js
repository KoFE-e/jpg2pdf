const theme = () => {

    const trigger = document.querySelector('[data-theme]'),
          triggerText = trigger.querySelector('span'),
          body = document.body;

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
            triggerText.innerHTML = 'Светлая';
            body.classList.remove('dark');
            trigger.setAttribute('data-theme', 'light');
        } else if (curTheme === 'light') {
            curTheme = 'dark';
            triggerText.innerHTML = 'Темная';
            body.classList.add('dark');
            trigger.setAttribute('data-theme', 'dark');
        } else if (curTheme === 'dark') {
            curTheme = 'system';
            triggerText.innerHTML = 'Система';
            switchSystemTheme();
            trigger.setAttribute('data-theme', 'system');
        }
    })
}

export default theme;