// Tema dark/light (default: light) + cursor customizado + menu mobile
document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const toggleBtn = document.getElementById('theme-toggle');
    const iconSun = document.getElementById('icon-sun');
    const iconMoon = document.getElementById('icon-moon');

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            root.classList.add('dark');
            iconSun.classList.remove('hidden');
            iconMoon.classList.add('hidden');
        } else {
            root.classList.remove('dark');
            iconMoon.classList.remove('hidden');
            iconSun.classList.add('hidden');
        }
    };

    const saved = localStorage.getItem('theme') || 'light';
    applyTheme(saved);

    toggleBtn.addEventListener('click', () => {
        const isDark = root.classList.contains('dark');
        const next = isDark ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem('theme', next);
    });

    // Menu mobile
    const menuBtn = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
    });
    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        });
    });

    
    
});
