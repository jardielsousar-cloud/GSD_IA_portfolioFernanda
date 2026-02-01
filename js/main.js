// ==========================================================================
// Main JavaScript - Modal de Contato e Newsletter
// ==========================================================================

(function() {
    'use strict';

    // Modal de Contato
    const modalContato = document.getElementById('modal-contato');
    const contatoLinks = document.querySelectorAll('a[href="#contato"]');
    const closeButtons = document.querySelectorAll('.modal__close');
    const modalOverlay = modalContato?.querySelector('.modal__overlay');

    // Abrir modal de contato
    contatoLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (modalContato) {
                modalContato.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Fechar modal
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Fechar ao clicar no overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', () => {
            modalContato.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
            const activeNewsletter = document.querySelector('.newsletter.active');
            if (activeNewsletter) {
                activeNewsletter.classList.remove('active');
                document.body.style.overflow = '';
                localStorage.setItem('newsletter-dismissed', 'true');
            }
        }
    });

    // Newsletter Popup
    const newsletterPopup = document.getElementById('newsletter-popup');
    const newsletterClose = newsletterPopup?.querySelector('.newsletter__close');
    const newsletterOverlay = newsletterPopup?.querySelector('.newsletter__overlay');
    const newsletterForm = document.getElementById('form-newsletter');

    // Mostrar popup após 5 segundos se não foi fechado antes
    if (newsletterPopup && !localStorage.getItem('newsletter-dismissed')) {
        setTimeout(() => {
            newsletterPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 5000);
    }

    // Fechar newsletter
    if (newsletterClose) {
        newsletterClose.addEventListener('click', () => {
            newsletterPopup.classList.remove('active');
            document.body.style.overflow = '';
            localStorage.setItem('newsletter-dismissed', 'true');
        });
    }

    if (newsletterOverlay) {
        newsletterOverlay.addEventListener('click', () => {
            newsletterPopup.classList.remove('active');
            document.body.style.overflow = '';
            localStorage.setItem('newsletter-dismissed', 'true');
        });
    }

    // Enviar newsletter via Formspree
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitButton = newsletterForm.querySelector('.newsletter__submit');
            const originalText = submitButton.textContent;

            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;

            try {
                const response = await fetch(newsletterForm.action, {
                    method: 'POST',
                    body: new FormData(newsletterForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Email cadastrado com sucesso! Você receberá novidades sobre as exposições.');
                    newsletterPopup.classList.remove('active');
                    document.body.style.overflow = '';
                    localStorage.setItem('newsletter-dismissed', 'true');
                    newsletterForm.reset();
                } else {
                    throw new Error('Erro ao enviar');
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao cadastrar email. Tente novamente mais tarde.');
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // Form de contato - Formspree
    const formContato = document.getElementById('form-contato');
    if (formContato) {
        formContato.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitButton = formContato.querySelector('.form__submit');
            const originalText = submitButton.textContent;

            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;

            try {
                const response = await fetch(formContato.action, {
                    method: 'POST',
                    body: new FormData(formContato),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Mensagem enviada com sucesso! Retornaremos em breve.');
                    formContato.reset();
                    const modal = formContato.closest('.modal');
                    if (modal) {
                        modal.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                } else {
                    throw new Error('Erro ao enviar');
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao enviar mensagem. Tente novamente ou entre em contato por email: vulgo.egos@gmail.com');
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }

})();
