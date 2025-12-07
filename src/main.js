import './style.css'

document.addEventListener('DOMContentLoaded', () => {
    initUniverse();
    initComets();
    initSmoothScroll();
    initProjectAnimations();
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
