// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize Particles.js with Tron-inspired blue theme
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 100,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#00f3ff'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 1,
                    color: '#00f3ff'
                }
            },
            opacity: {
                value: 0.6,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.2,
                    sync: false
                }
            },
            size: {
                value: 2,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.5,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 120,
                color: '#00f3ff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 150,
                    line_linked: {
                        opacity: 0.8
                    }
                },
                bubble: {
                    distance: 200,
                    size: 6,
                    duration: 2,
                    opacity: 0.8,
                    speed: 3
                },
                repulse: {
                    distance: 100,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(0, 5, 15, 0.4)';
            } else {
                navbar.style.background = 'rgba(0, 5, 15, 0.25)';
            }
        }
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.status-panel, .email-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Enhanced email card hover effects
    const emailCard = document.getElementById('email-card');
    if (emailCard) {
        emailCard.addEventListener('mouseenter', function() {
            // Add transmission effect
            const transmissionIndicator = this.querySelector('.transmission-indicator');
            if (transmissionIndicator) {
                transmissionIndicator.style.animation = 'transmissionPulse 0.6s ease-out';
            }
            
            // Add grid line animation
            const gridLines = this.querySelectorAll('.grid-line');
            gridLines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.background = 'rgba(0, 243, 255, 0.8)';
                    line.style.boxShadow = '0 0 10px #00f3ff';
                }, index * 100);
            });
        });

        emailCard.addEventListener('mouseleave', function() {
            // Reset grid lines
            const gridLines = this.querySelectorAll('.grid-line');
            gridLines.forEach(line => {
                line.style.background = 'rgba(0, 243, 255, 0.3)';
                line.style.boxShadow = 'none';
            });
        });
    }

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleText = 'SHAPING DIGITAL TOMORROWS';
        let titleIndex = 0;

        function typeTitle() {
            if (titleIndex < titleText.length) {
                heroTitle.textContent = titleText.slice(0, titleIndex + 1);
                titleIndex++;
                setTimeout(typeTitle, 100);
            } else {
                // Add the animated underline after typing is complete
                const underline = document.createElement('div');
                underline.className = 'animated-underline';
                heroTitle.appendChild(underline);
            }
        }

        // Start typing effect after a short delay
        setTimeout(function() {
            heroTitle.textContent = '';
            typeTitle();
        }, 1000);
    }

    // Add random glitch effect to the holographic cube
    const cube = document.querySelector('.cube');
    if (cube) {
        setInterval(function() {
            if (Math.random() < 0.1) { // 10% chance every interval
                cube.style.filter = 'hue-rotate(60deg) brightness(1.5)';
                setTimeout(function() {
                    cube.style.filter = 'none';
                }, 200);
            }
        }, 3000);
    }

    // Add floating animation to status text
    const statusText = document.querySelector('.status-text');
    if (statusText) {
        statusText.style.animation = 'statusFloat 4s ease-in-out infinite';
        
        const floatStyle = document.createElement('style');
        floatStyle.textContent = `
            @keyframes statusFloat {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-5px); }
            }
            @keyframes transmissionPulse {
                0% { 
                    box-shadow: 0 0 5px rgba(0, 243, 255, 0.5);
                    transform: scale(1);
                }
                50% { 
                    box-shadow: 0 0 20px rgba(0, 243, 255, 1);
                    transform: scale(1.05);
                }
                100% { 
                    box-shadow: 0 0 5px rgba(0, 243, 255, 0.5);
                    transform: scale(1);
                }
            }
        `;
        document.head.appendChild(floatStyle);
    }

    // Add digital noise effect to background occasionally
    function addDigitalNoise() {
        const body = document.body;
        const noiseOverlay = document.createElement('div');
        noiseOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 243, 255, 0.03) 2px,
                rgba(0, 243, 255, 0.03) 4px
            );
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.1s ease;
        `;
        
        body.appendChild(noiseOverlay);
        
        // Flash the noise briefly
        setTimeout(() => {
            noiseOverlay.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            noiseOverlay.style.opacity = '0';
            setTimeout(() => {
                body.removeChild(noiseOverlay);
            }, 100);
        }, 150);
    }

    // Trigger digital noise effect randomly
    setInterval(() => {
        if (Math.random() < 0.05) { // 5% chance every 5 seconds
            addDigitalNoise();
        }
    }, 5000);

    // Add circuit board pattern animation to progress bar
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        // Create additional circuit pattern overlay
        const circuitOverlay = document.createElement('div');
        circuitOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                linear-gradient(90deg, transparent 48%, rgba(0, 243, 255, 0.5) 50%, transparent 52%);
            background-size: 20px 100%;
            animation: circuitScan 3s linear infinite;
            pointer-events: none;
        `;
        
        progressFill.appendChild(circuitOverlay);
        
        const circuitStyle = document.createElement('style');
        circuitStyle.textContent = `
            @keyframes circuitScan {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(200%); }
            }
        `;
        document.head.appendChild(circuitStyle);
    }
});

// Add window resize handler for particles
window.addEventListener('resize', function() {
    if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        window.pJSDom[0].pJS.fn.canvasSize();
    }
});

// Add Tron-style loading effect
window.addEventListener('load', function() {
    // Create loading grid effect
    const loadingGrid = document.createElement('div');
    loadingGrid.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: 
            linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px);
        background-size: 50px 50px;
        z-index: 10000;
        opacity: 1;
        transition: opacity 1s ease;
        pointer-events: none;
    `;
    
    document.body.appendChild(loadingGrid);
    
    setTimeout(() => {
        loadingGrid.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loadingGrid);
        }, 1000);
    }, 500);
});

