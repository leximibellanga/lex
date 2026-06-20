// Gera os cards de projecto e controla o modal de "privado / em andamento"
document.addEventListener('DOMContentLoaded', () => {
    const statusLabel = {
        public: 'Público',
        progress: 'Em andamento',
        private: 'Privado',
    };

    const statusClass = {
        public: 'status-public',
        progress: 'status-progress',
        private: 'status-private',
    };

    const createCard = (project) => {
        const card = document.createElement('div');
        card.className = 'reveal project-card';

        const isOpen = project.status === 'public';

        card.innerHTML = `
        <div class="project-thumb overflow-hidden">
            <img src="${project.img}" alt="projecto ${project.title} class="block object-cover object-[center_center]">
        </div>
        <div class="project-body">
            <span class="status-badge ${statusClass[project.status]}">${statusLabel[project.status]}</span>
            <h4 class="font-semibold text-lg">${project.title}</h4>
            <p class="text-muted text-sm flex-1">${project.description}</p>
            <div class="flex flex-wrap gap-2">
                ${project.stack.map((s) => `<span class="skill-tag">${s}</span>`).join('')}
            </div>
            <button class="btn-outline w-fit project-action" data-status="${project.status}" data-link="${project.link}">
                ${isOpen ? 'Ver projecto' : 'Ver detalhes'}
            </button>
        </div>
    `;
        return card;
    };

    const renderInto = (selector, list) => {
        const container = document.querySelector(selector);
        if (!container) return;
        list.forEach((project) => container.appendChild(createCard(project)));
    };

    renderInto('#home-projects-grid', projectsData.filter((p) => p.featured).slice(0, 3));
    renderInto('#all-projects-grid', projectsData);

    // Re-observar elementos .reveal criados dinamicamente
    if (window.IntersectionObserver) {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add('reveal-visible');
                    observer.unobserve(e.target);
                }
            }),
            { threshold: 0.15 }
        );
        document.querySelectorAll('.project-card.reveal').forEach((el) => observer.observe(el));
    }

    // Modal
    const modal = document.getElementById('project-modal');
    const modalMessage = document.getElementById('modal-message');
    const modalClose = document.getElementById('modal-close');

    document.addEventListener('click', (e) => {
        if (!e.target.classList.contains('project-action')) return;
        const status = e.target.dataset.status;
        const link = e.target.dataset.link;

        if (status === 'public') {
            window.open(link, '_blank');
            return;
        }

        modalMessage.textContent =
            status === 'private'
                ? '// este projecto é privado — código-fonte não disponível publicamente.'
                : '// este projecto ainda está em andamento — volta em breve!';
        modal.classList.remove('hidden');
    });

    modalClose?.addEventListener('click', () => modal.classList.add('hidden'));
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') modal?.classList.add('hidden');
    });
});
