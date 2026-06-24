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


    // Tilt 3D na foto de perfil
    const card  = document.getElementById('profile-card');
    const shine = document.getElementById('profile-shine');

    if (card && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    card.addEventListener('mousemove', (e) => {
        const rect   = card.getBoundingClientRect();
        const cx     = rect.left + rect.width  / 2;
        const cy     = rect.top  + rect.height / 2;
        const dx     = (e.clientX - cx) / (rect.width  / 2); // -1 a 1
        const dy     = (e.clientY - cy) / (rect.height / 2); // -1 a 1

        const rotX = -dy * 14; // graus
        const rotY =  dx * 14;

        card.style.transform =
        `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04,1.04,1.04)`;

        // Reflexo de luz segue o cursor
        const shineX = (dx + 1) / 2 * 100; // 0% a 100%
        const shineY = (dy + 1) / 2 * 100;
        shine.style.background =
        `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.2) 0%, transparent 60%)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform =
        'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
        setTimeout(() => {
        card.style.transition = 'transform 0.08s ease, box-shadow 0.3s ease';
        }, 500);
    });
    }

    
    
});
