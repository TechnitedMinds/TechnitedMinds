import './style.css'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID = 'service_sl2xt3x';
const EMAILJS_TEMPLATE_ID = 'template_94vpw1r';
const EMAILJS_PUBLIC_KEY = 'r_ReOTjngtydBWSzF';

document.addEventListener('DOMContentLoaded', () => {
    initUniverse();
    initComets();
    initSmoothScroll();
    initProjectAnimations();
    initMagicMotion();
    initContactForm();
    initModals();
});

function initUniverse() {
    const container = document.getElementById('universe');
    const starCount = 300;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Random Position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() < 0.9 ? Math.random() * 1.5 : Math.random() * 2.5;
        const delay = Math.random() * 5;
        const duration = Math.random() * 3 + 3;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;
        star.style.opacity = Math.random() * 0.5 + 0.1;

        container.appendChild(star);
    }
}

function initComets() {
    const container = document.getElementById('universe');

    // Create a comet every random interval
    // Create a comet every random interval
    function spawnComet() {
        if (!document.hidden) {
            const comet = document.createElement('div');
            comet.className = 'comet';

            // Start from top-right area usually
            const startX = Math.random() * 50 + 50; // 50-100% Right side
            const startY = Math.random() * 50; // 0-50% Top half

            comet.style.left = `${startX}%`;
            comet.style.top = `${startY}%`;

            // Randomize speed and tail length via duration and opacity
            const duration = Math.random() * 1.5 + 1; // 1s - 2.5s
            comet.style.animationDuration = `${duration}s`;

            container.appendChild(comet);

            // Cleanup after animation
            setTimeout(() => {
                comet.remove();
            }, duration * 1000);
        }

        // Schedule next comet
        const nextDelay = Math.random() * 4000 + 2000; // 2s - 6s
        setTimeout(spawnComet, nextDelay);
    }

    // Start the loop
    spawnComet();
}

function initSmoothScroll() {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const container = document.getElementById('universe');
        container.style.transform = `translateY(${scrolled * 0.2}px)`;
    });
}

function initProjectAnimations() {
    const cards = document.querySelectorAll('.glass-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Reveal Card
                entry.target.classList.remove('opacity-0', 'translate-y-20', 'scale-95');

                // Cleanup animation classes after transition completes
                // This ensures hover effects (which usually desire faster transitions) feel snappy again
                const delay = parseFloat(entry.target.style.transitionDelay) || 0;

                setTimeout(() => {
                    entry.target.classList.remove('duration-1000', 'ease-out');
                    entry.target.style.transitionDelay = '0s';
                }, 1000 + delay);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px'
    });

    cards.forEach((card, index) => {
        // Initial "Hidden" State
        // We use duration-1000 for a slow, premium entry
        card.classList.add('transition-all', 'duration-1000', 'ease-out', 'opacity-0', 'translate-y-20', 'scale-95');

        // Stagger Effect
        card.style.transitionDelay = `${index * 150}ms`;

        observer.observe(card);
    });
}

function initMagicMotion() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealItems = document.querySelectorAll('[data-magic~="reveal"]');

    revealItems.forEach((item) => {
        const delay = item.getAttribute('data-magic-delay');
        if (delay) {
            item.style.setProperty('--magic-delay', `${delay}ms`);
        }
    });

    if (reduceMotion) {
        revealItems.forEach((item) => item.classList.add('magic-revealed'));
        return;
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('magic-revealed');
            revealObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px'
    });

    revealItems.forEach((item) => revealObserver.observe(item));

    document.querySelectorAll('[data-magic~="cursor-glow"]').forEach((item) => {
        item.addEventListener('pointermove', (event) => {
            const rect = item.getBoundingClientRect();
            item.style.setProperty('--mx', `${event.clientX - rect.left}px`);
            item.style.setProperty('--my', `${event.clientY - rect.top}px`);
        });
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitButton = document.getElementById('contact-submit');
    const status = document.getElementById('contact-status');

    if (!form || !submitButton || !status) return;

    function setStatus(message, state = '') {
        status.textContent = message;
        if (state) {
            status.dataset.state = state;
        } else {
            delete status.dataset.state;
        }
    }

    function setLoading(isLoading) {
        submitButton.disabled = isLoading;
        submitButton.classList.toggle('is-loading', isLoading);
        submitButton.setAttribute('aria-busy', String(isLoading));
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            setStatus('Check the highlighted fields and try again.', 'error');
            return;
        }

        const formData = new FormData(form);
        const title = String(formData.get('title') || '').trim() || 'New project inquiry';
        const name = String(formData.get('name') || '').trim();
        const email = String(formData.get('email') || '').trim();
        const message = String(formData.get('message') || '').trim();

        setLoading(true);
        setStatus('Sending signal...');

        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    title,
                    name,
                    email,
                    reply_to: email,
                    message
                },
                { publicKey: EMAILJS_PUBLIC_KEY }
            );

            form.reset();
            setStatus('Inquiry sent. We will get back to you soon.', 'success');
        } catch (error) {
            console.error('EmailJS send failed:', error);
            setStatus('Could not send right now. Please try again in a moment.', 'error');
        } finally {
            setLoading(false);
        }
    });
}

/* --- MODAL SYSTEM --- */
function initModals() {
    const modalMap = {
        'privacy-policy': document.getElementById('modal-privacy-policy'),
        'terms': document.getElementById('modal-terms'),
    };

    function openModal(id) {
        const modal = modalMap[id];
        if (!modal) return;

        // Lock body scroll
        document.body.style.overflow = 'hidden';

        // Show overlay
        modal.classList.remove('modal-hidden');
        modal.setAttribute('aria-hidden', 'false');
    }

    function closeModal(id) {
        const modal = modalMap[id];
        if (!modal) return;

        // Hide overlay
        modal.classList.add('modal-hidden');
        modal.setAttribute('aria-hidden', 'true');

        // Restore body scroll
        document.body.style.overflow = '';

        // Reset scroll position inside modal body after transition
        const body = modal.querySelector('.modal-body');
        if (body) {
            setTimeout(() => { body.scrollTop = 0; }, 400);
        }
    }

    function closeAllModals() {
        Object.keys(modalMap).forEach(closeModal);
    }

    function getOpenModalId() {
        for (const [id, modal] of Object.entries(modalMap)) {
            if (!modal.classList.contains('modal-hidden')) return id;
        }
        return null;
    }

    // Handle hash-based routing
    function handleHash() {
        const hash = window.location.hash.replace('#', '');
        if (modalMap[hash]) {
            openModal(hash);
        } else {
            closeAllModals();
        }
    }

    // Footer link clicks
    document.querySelectorAll('[data-modal-open]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const id = trigger.getAttribute('data-modal-open');
            window.location.hash = id;
        });
    });

    // Close button clicks
    document.querySelectorAll('[data-modal-close]').forEach(btn => {
        btn.addEventListener('click', () => {
            history.pushState('', document.title, window.location.pathname + window.location.search);
            closeAllModals();
        });
    });

    // Backdrop clicks
    Object.values(modalMap).forEach(modal => {
        if (!modal) return;
        const backdrop = modal.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', () => {
                history.pushState('', document.title, window.location.pathname + window.location.search);
                closeAllModals();
            });
        }
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && getOpenModalId()) {
            history.pushState('', document.title, window.location.pathname + window.location.search);
            closeAllModals();
        }
    });

    // Listen for hash changes (back/forward navigation)
    window.addEventListener('hashchange', handleHash);

    // Check hash on initial load
    handleHash();
}
