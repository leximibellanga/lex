// Chuva binária (0/1) no canvas da Hero + máquina de escrever na profissão
document.addEventListener('DOMContentLoaded', () => {
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ----- Chuva binária ----- */
    const canvas = document.getElementById('matrix-canvas');
    if (canvas && !reducedMotion) {
        const ctx = canvas.getContext('2d');
        let width, height, columns, drops;
        const fontSize = 16;

        const resize = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
            columns = Math.floor(width / fontSize);
            drops = Array.from({ length: columns }, () => Math.random() * -height / fontSize);
        };
        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            const isDark = document.documentElement.classList.contains('dark');
            ctx.fillStyle = isDark ? 'rgba(13,11,18,0.12)' : 'rgba(255,255,255,0.12)';
            ctx.fillRect(0, 0, width, height);

            ctx.font = `${fontSize}px JetBrains Mono, monospace`;
            ctx.fillStyle = isDark ? 'rgba(138,99,210,0.55)' : 'rgba(100,65,164,0.45)';

            drops.forEach((y, i) => {
                const char = Math.random() > 0.5 ? '1' : '0';
                const x = i * fontSize;
                ctx.fillText(char, x, y * fontSize);
                drops[i] = y * fontSize > height && Math.random() > 0.975 ? 0 : y + 1;
            });
        };

        setInterval(draw, 55);
    }

    /* ----- Máquina de escrever ----- */
    const typedEl = document.getElementById('typed-text');
    if (typedEl) {
        const words = ['Engenheiro de Software', 'Desenvolvedor de sistemas', 'Programador', 'Vibe Coder'];
        let wordIndex = 0, charIndex = 0, deleting = false;

        const type = () => {
            const word = words[wordIndex];
            if (!deleting) {
                charIndex++;
                typedEl.textContent = word.slice(0, charIndex);
                if (charIndex === word.length) {
                    deleting = true;
                    setTimeout(type, 1600);
                    return;
                }
            } else {
                charIndex--;
                typedEl.textContent = word.slice(0, charIndex);
                if (charIndex === 0) {
                    deleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }
            }
            setTimeout(type, deleting ? 45 : 90);
        };
        type();
    }
})




