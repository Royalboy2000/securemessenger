document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    const icon = themeSwitcher.querySelector('i');

    // Function to set the theme
    const setTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light-theme');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
            if (window.updateGlobeColor) {
                window.updateGlobeColor(0x000000); // Black for light theme
            }
        } else {
            body.classList.remove('light-theme');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
            if (window.updateGlobeColor) {
                window.updateGlobeColor(0xffffff); // White for dark theme
            }
        }
    };

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    // Event listener for the theme switcher button
    themeSwitcher.addEventListener('click', () => {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });
});