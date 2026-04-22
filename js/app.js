/* ============================================================================
   MOAD KHENNOUS — PORTFOLIO
   Animation Engine: GSAP ScrollTrigger + Canvas Particles
   ============================================================================ */

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    /* ========== 1. PRELOADER ========== */
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader?.classList.add('hidden');
            initHeroAnimation();
        }, 1200);
    });

    /* Fallback: ensure preloader hides even if load event already fired */
    if (document.readyState === 'complete') {
        setTimeout(() => {
            preloader?.classList.add('hidden');
            initHeroAnimation();
        }, 1200);
    }

    /* ========== 2. CANVAS PARTICLE SYSTEM ========== */
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrame;
        let canvasWidth, canvasHeight;

        const PARTICLE_COLORS = [
            { r: 200, g: 135, b: 92 },
            { r: 201, g: 168, b: 76 },
            { r: 196, g: 168, b: 130 },
            { r: 184, g: 107, b: 75 },
            { r: 212, g: 197, b: 169 },
        ];

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function resizeCanvas() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvasWidth = window.innerWidth;
            canvasHeight = window.innerHeight;
            canvas.width = canvasWidth * dpr;
            canvas.height = canvasHeight * dpr;
            canvas.style.width = canvasWidth + 'px';
            canvas.style.height = canvasHeight + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function createParticles() {
            const isMobile = window.innerWidth < 768;
            const count = isMobile ? 35 : 70;
            particles = [];

            for (let i = 0; i < count; i++) {
                const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
                particles.push({
                    x: Math.random() * canvasWidth,
                    y: Math.random() * canvasHeight,
                    size: Math.random() * 2 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: -Math.random() * 0.2 - 0.05,
                    opacity: Math.random() * 0.5 + 0.1,
                    color: color,
                    pulse: Math.random() * Math.PI * 2,
                    pulseSpeed: Math.random() * 0.01 + 0.005,
                });
            }
        }

        function drawParticles() {
            if (prefersReduced) return;
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            const scrollFade = Math.max(0, 1 - window.scrollY / (canvasHeight * 0.8));
            if (scrollFade <= 0) {
                animationFrame = requestAnimationFrame(drawParticles);
                return;
            }

            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.pulse += p.pulseSpeed;

                if (p.x < -10) p.x = canvasWidth + 10;
                if (p.x > canvasWidth + 10) p.x = -10;
                if (p.y < -10) p.y = canvasHeight + 10;

                const opacityPulse = p.opacity + Math.sin(p.pulse) * 0.15;
                const finalOpacity = Math.max(0, opacityPulse * scrollFade);

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${finalOpacity})`;
                ctx.fill();

                if (p.size > 1.2) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${finalOpacity * 0.08})`;
                    ctx.fill();
                }
            });

            animationFrame = requestAnimationFrame(drawParticles);
        }

        function initCanvas() {
            if (prefersReduced) return;
            resizeCanvas();
            createParticles();
            drawParticles();
        }

        let resizeTimeout;
        window.addEventListener('resize', () => {
            if (prefersReduced) return;
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                resizeCanvas();
                createParticles();
            }, 200);
        });

        initCanvas();
    }

    /* ========== 3. HERO ANIMATION ========== */
    let heroAnimPlayed = false;
    function initHeroAnimation() {
        if (heroAnimPlayed) return;
        heroAnimPlayed = true;
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.to('.hero-overline', {
            opacity: 1,
            y: 0,
            duration: 0.8,
        })
        .to('.hero-name-line', {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
        }, '-=0.4')
        .to('.hero-tagline', {
            opacity: 1,
            y: 0,
            duration: 0.8,
        }, '-=0.5')
        .to('.hero-description', {
            opacity: 1,
            y: 0,
            duration: 0.8,
        }, '-=0.4')
        .to('.hero-actions', {
            opacity: 1,
            y: 0,
            duration: 0.8,
        }, '-=0.4')
        .to('.hero-socials', {
            opacity: 1,
            y: 0,
            duration: 0.8,
        }, '-=0.4');
    }

    /* ========== 5. TYPEWRITER ========== */
    const typingEl = document.getElementById('typing-text');
    const words = [
        'Étudiant BTS SIO',
        'Développeur Web Junior',
        'Passionné de Cybersécurité',
        'Développeur Java Junior',
    ];
    let wordIdx = 0;
    let charIdx = 0;
    let deleting = false;

    function typeWriter() {
        if (!typingEl) return;
        const current = words[wordIdx];

        if (deleting) {
            charIdx--;
            typingEl.textContent = current.substring(0, charIdx);
        } else {
            charIdx++;
            typingEl.textContent = current.substring(0, charIdx);
        }

        let speed = deleting ? 35 : 80;

        if (!deleting && charIdx === current.length) {
            speed = 2200;
            deleting = true;
        } else if (deleting && charIdx === 0) {
            deleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            speed = 400;
        }

        setTimeout(typeWriter, speed);
    }

    setTimeout(typeWriter, 2000);

    /* ========== 6. SCROLL PROGRESS BAR ========== */
    const progressBar = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    }, { passive: true });

    /* ========== 7. NAVIGATION ========== */
    const header = document.getElementById('main-header');
    const navToggle = document.getElementById('nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Header background on scroll
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        mobileNav.classList.toggle('open');
        document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Scroll spy
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < 200 && rect.bottom > 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === current);
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    /* ========== 8. SCROLL-TO-TOP ========== */
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ========== 9. GSAP SCROLL ANIMATIONS ========== */

    // Section title reveals
    gsap.utils.toArray('[data-anim="reveal"]').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 30,
            duration: 0.9,
            ease: 'power3.out',
        });
    });

    // Timeline items
    gsap.utils.toArray('[data-anim="timeline"]').forEach((el, i) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 82%',
                toggleActions: 'play none none none',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
        });
    });

    // Featured projects
    gsap.utils.toArray('[data-anim="project"]').forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
        });
    });

    // List items (projects + certifications)
    gsap.utils.toArray('[data-anim="list-item"]').forEach((el, i) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                toggleActions: 'play none none none',
            },
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.05,
            ease: 'power3.out',
        });
    });

    // Skill domains
    gsap.utils.toArray('[data-anim="skill"]').forEach((el, i) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
        });
    });

    /* ========== 10. PARALLAX DEPTH ========== */
    gsap.utils.toArray('.section-index').forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el.closest('.section'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
            },
            y: -30,
            ease: 'none',
        });
    });

    gsap.utils.toArray('.project-number').forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el.closest('.project-feature'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
            },
            y: -20,
            ease: 'none',
        });
    });

    /* ========== 11. SMOOTH ANCHOR SCROLL ========== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();

            const offset = targetId === '#hero' ? 0 : 20;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top: top,
                behavior: 'smooth',
            });
        });
    });

    /* ========== 12. ZELLIGE DIVIDER PARALLAX ========== */
    gsap.utils.toArray('.zellige-divider').forEach(el => {
        gsap.fromTo(el, 
            { opacity: 0, scaleX: 0.3 },
            {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                },
                opacity: 0.4,
                scaleX: 1,
                duration: 1.2,
                ease: 'power3.out',
            }
        );
    });

    /* ========== 13. CONTACT SECTION SPECIAL ANIMATION ========== */
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        gsap.from('.contact-body', {
            scrollTrigger: {
                trigger: contactSection,
                start: 'top 70%',
                toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 40,
            duration: 1,
            ease: 'power3.out',
        });
    }

    /* ========== 14. HOVER MAGNETIC EFFECT ON BUTTONS ========== */
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

});
