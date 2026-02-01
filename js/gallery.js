// ==========================================================================
// Gallery JavaScript - Carrega obras e exposições do JSON
// ==========================================================================

(function() {
    'use strict';

    // Detectar qual galeria estamos
    const galleryObras = document.getElementById('gallery-obras');
    const galleryExposicoes = document.getElementById('gallery-exposicoes');

    // Função para criar item da galeria
    function createGalleryItem(item, type) {
        const div = document.createElement('div');
        div.className = 'gallery__item';

        // Criar estrutura com glightbox
        const link = document.createElement('a');
        link.href = item.image;
        link.className = 'glightbox';

        // Criar descrição para o modal do glightbox
        let description = `<h3>${item.title}</h3>`;

        if (type === 'obra') {
            if (item.description) description += `<p>${item.description}</p>`;
            if (item.dimensions) description += `<p><strong>Dimensões:</strong> ${item.dimensions}</p>`;
            if (item.technique) description += `<p><strong>Técnica:</strong> ${item.technique}</p>`;
            if (item.year) description += `<p><strong>Ano:</strong> ${item.year}</p>`;
            if (item.status) description += `<p><strong>Status:</strong> ${item.status}</p>`;
            if (item.price) description += `<p><strong>Preço:</strong> ${item.price}</p>`;
        } else if (type === 'exposicao') {
            if (item.description) description += `<p>${item.description}</p>`;
            if (item.location) description += `<p><strong>Local:</strong> ${item.location}</p>`;
            if (item.dates) description += `<p><strong>Data:</strong> ${item.dates}</p>`;
            if (item.status) description += `<p><strong>Status:</strong> ${item.status}</p>`;
        }

        link.setAttribute('data-glightbox', `description: ${description}`);

        // Imagem
        const img = document.createElement('img');
        img.src = item.thumbnail || item.image;
        img.alt = item.title;
        img.className = 'gallery__item__image';
        img.loading = 'lazy';
        // Adicionar width e height para prevenir CLS
        img.width = 400;
        img.height = 400;

        // Overlay com informações (hover)
        const overlay = document.createElement('div');
        overlay.className = 'gallery__item__overlay';

        const title = document.createElement('h3');
        title.className = 'gallery__item__title';
        title.textContent = item.title;

        const desc = document.createElement('p');
        desc.className = 'gallery__item__description';

        if (type === 'obra') {
            desc.textContent = item.shortDescription || item.description || '';
        } else if (type === 'exposicao') {
            desc.textContent = `${item.location || ''} ${item.dates || ''}`.trim();
        }

        overlay.appendChild(title);
        if (desc.textContent) overlay.appendChild(desc);

        link.appendChild(img);
        link.appendChild(overlay);
        div.appendChild(link);

        return div;
    }

    // Carregar obras
    if (galleryObras) {
        fetch('data/obras.json')
            .then(response => response.json())
            .then(data => {
                data.obras.forEach(obra => {
                    const item = createGalleryItem(obra, 'obra');
                    galleryObras.appendChild(item);
                });

                // Inicializar GLightbox
                const lightbox = GLightbox({
                    touchNavigation: true,
                    loop: true,
                    autoplayVideos: false
                });
            })
            .catch(error => {
                console.error('Erro ao carregar obras:', error);
                galleryObras.innerHTML = '<p style="text-align: center; padding: 2rem;">Erro ao carregar obras.</p>';
            });
    }

    // Carregar exposições
    if (galleryExposicoes) {
        fetch('data/exposicoes.json')
            .then(response => response.json())
            .then(data => {
                data.exposicoes.forEach(exposicao => {
                    const item = createGalleryItem(exposicao, 'exposicao');
                    galleryExposicoes.appendChild(item);
                });

                // Inicializar GLightbox
                const lightbox = GLightbox({
                    touchNavigation: true,
                    loop: true,
                    autoplayVideos: false
                });
            })
            .catch(error => {
                console.error('Erro ao carregar exposições:', error);
                galleryExposicoes.innerHTML = '<p style="text-align: center; padding: 2rem;">Erro ao carregar exposições.</p>';
            });
    }

})();
