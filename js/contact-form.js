// Validação básica + envio via mailto + limpar campos
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const subject = form.subject.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !subject || !message) {
            status.textContent = '// preenche todos os campos antes de enviar.';
            status.classList.remove('hidden');
            return;
        }

        const body = encodeURIComponent(`Nome: ${name}\nE-mail: ${email}\n\n${message}`);
        const mailSubject = encodeURIComponent(subject);

        // Ajusta o e-mail de destino aqui:
        window.location.href = `mailto:teu-email@exemplo.com?subject=${mailSubject}&body=${body}`;

        status.textContent = '// abrindo o teu cliente de e-mail...';
        status.classList.remove('hidden');
    });

    document.getElementById('clear-form')?.addEventListener('click', () => {
        setTimeout(() => status.classList.add('hidden'), 50);
    });
});
