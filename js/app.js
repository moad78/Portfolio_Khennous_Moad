document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MENU MOBILE ---
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            const icon = menuToggle.querySelector('i');
            nav.classList.contains('open') ? 
                (icon.classList.remove('fa-bars'), icon.classList.add('fa-times')) : 
                (icon.classList.remove('fa-times'), icon.classList.add('fa-bars'));
        });
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    // --- 2. FILTRES PROJETS (FIXÉ) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'flex';
                    // Force le redraw pour l'animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // --- 3. SCROLL REVEAL (ROBUSTE) ---
    const revealElements = document.querySelectorAll('.reveal-up');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
    
    // Fallback immédiat pour le haut de page
    setTimeout(() => {
        revealElements.forEach(el => {
            if(el.getBoundingClientRect().top < window.innerHeight) el.classList.add('visible');
        });
    }, 100);

    // --- 4. SCROLL TO TOP (NOUVEAU) ---
    const scrollTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- SCROLL SPY CORRIGÉ (Fonctionne à 100%) ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    // On parcourt toutes les sections pour voir laquelle est visible
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Si le haut de la section est au-dessus du viewport ET le bas est dans le viewport
        if (rect.top < 150 && rect.bottom > 150) {
            current = section.getAttribute('id');
        }
    });
    
    // On active le lien correspondant
    navLinks.forEach(link => {
        link.classList.remove('active');
        if ('#' + current === link.getAttribute('href') || link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
    
    // DEBUG (à supprimer une fois que ça marche)
    // console.log('Section actuelle:', current);
});

// Force la détection au chargement
setTimeout(() => {
    const rect = document.querySelector('#competences').getBoundingClientRect();
    console.log('Compétences rect:', rect);
}, 500);

    // --- 5. LOTTIE ANIMATION (ANTI-DOUBLON) ---
    const animationContainer = document.getElementById('lottie-animation');
    // Vérifie si l'animation n'est pas déjà chargée (évite le bug des doubles)
    if (animationContainer && animationContainer.innerHTML.trim() === "") {
        try {
            lottie.loadAnimation({
                container: animationContainer,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: 'https://assets5.lottiefiles.com/packages/lf20_fcfjwiyb.json' 
            });
        } catch(e) { console.log("Erreur Lottie ignorée"); }
    }

    // --- 6. TYPEWRITER ---
    const textElement = document.querySelector('.text-taper span');
    const words = ["Étudiant BTS SIO", "Développeur Web Junior", "Passionné de Cyber", "Developpeur Java Junior"];
    let wordIndex = 0, charIndex = 0, isDeleting = false;
    
    function type() {
        if(!textElement) return;
        const currentWord = words[wordIndex];
        textElement.textContent = isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1);
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        let typeSpeed = isDeleting ? 40 : 100;
        if (!isDeleting && charIndex === currentWord.length) { typeSpeed = 2000; isDeleting = true; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; typeSpeed = 500; }
        setTimeout(type, typeSpeed);
    }
    type();

    // --- 7. BARRES COMPETENCES ---
    const skillSection = document.getElementById('competences');
    const progressBars = document.querySelectorAll('.progress');
    if (skillSection) {
        const observerSkills = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressBars.forEach(bar => {
                        const w = bar.style.width; bar.style.width = '0';
                        setTimeout(() => bar.style.width = w, 100);
                    });
                    observerSkills.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        observerSkills.observe(skillSection);
    }

    // --- 8. INTRO SCREEN DRAG & DROP ---
    const char = document.getElementById('draggable-char');
    const house = document.getElementById('target-house');
    const introScreen = document.getElementById('intro-screen');

    if (char && house && introScreen) {
        document.body.style.overflow = 'hidden'; // Bloque le scroll

        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        // Fonction pour démarrer le drag
        const startDrag = (e) => {
            isDragging = true;
            char.classList.add('is-dragging');
            
            // On coupe l'animation immédiatement via le style inline pour être sûr
            char.style.animation = 'none'; 

            // Récupère la position (Souris ou Touch)
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            // Position actuelle de l'élément
            const rect = char.getBoundingClientRect();
            
            // Calcul du décalage souris/élément
            // On compense le fait que le transform:translate(-50%, -50%) va être retiré
            startX = clientX - rect.left;
            startY = clientY - rect.top;
        };

        // Fonction pendant le mouvement
        const onDrag = (e) => {
            if (!isDragging) return;
            e.preventDefault(); // Empêche le scroll sur mobile

            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            // Déplace le personnage (suis le curseur)
            // On utilise fixed positionnement temporaire via style transform
            char.style.position = 'fixed';
            char.style.left = `${clientX - startX}px`;
            char.style.top = `${clientY - startY}px`;
            char.style.transform = 'none'; // Annule le translate CSS par défaut

            checkCollision();
        };

        // Fonction fin du drag
        const stopDrag = () => {
            if (!isDragging) return;
            isDragging = false;
            char.classList.remove('is-dragging');

            if (checkCollision()) {
                // VICTOIRE : Entrer dans le portfolio
                enterPortfolio();
            } else {
                // ÉCHEC : Retour à la position de départ (animation CSS ou reset)
                resetPosition();
            }
        };

        // Détection de collision (A-t-on touché la maison ?)
        const checkCollision = () => {
            const charRect = char.getBoundingClientRect();
            const houseRect = house.getBoundingClientRect();

            // On considère qu'il y a collision si le centre du perso est dans la maison
            const charCenterX = charRect.left + charRect.width / 2;
            const charCenterY = charRect.top + charRect.height / 2;

            const isOverlapping = (
                charCenterX > houseRect.left &&
                charCenterX < houseRect.right &&
                charCenterY > houseRect.top &&
                charCenterY < houseRect.bottom
            );

            if (isOverlapping) {
                house.classList.add('hovered'); // La porte s'allume
                return true;
            } else {
                house.classList.remove('hovered');
                return false;
            }
        };

        const enterPortfolio = () => {
            // Animation finale : Le perso disparait dans la porte
            char.style.transition = "all 0.5s ease";
            char.style.opacity = "0";
            char.style.transform = "scale(0.1)"; // Il rétrécit
            
            setTimeout(() => {
                introScreen.classList.add('hide'); // L'écran d'intro disparait
                setTimeout(() => {
                    introScreen.style.display = 'none';
                    document.body.style.overflow = 'auto'; // Réactive le scroll
                }, 800);
            }, 300);
        };

        const resetPosition = () => {
            // Reset : on le remet à sa place "d'arrêt" (devant la maison)
            char.style.transition = "all 0.5s ease";
            char.style.position = "absolute";
            
            // Sur Desktop : 20% (comme dans le CSS walk-in-stop)
            // Sur Mobile : 50% (centré)
            if (window.innerWidth <= 768) {
                char.style.left = "50%";
                char.style.top = "20%";
            } else {
                char.style.left = "20%"; // << C'est ici l'important
                char.style.top = "50%";
            }
            char.style.transform = "translate(-50%, -50%)";

            // Une fois remis en place, on réactive la transition rapide pour le prochain drag
            setTimeout(() => {
                char.style.transition = "transform 0.1s linear"; 
            }, 500);
        };

        // Événements Souris (PC)
        char.addEventListener('mousedown', startDrag);
        window.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', stopDrag);

        // Événements Touch (Mobile)
        char.addEventListener('touchstart', startDrag, { passive: false });
        window.addEventListener('touchmove', onDrag, { passive: false });
        window.addEventListener('touchend', stopDrag);
    }

    // --- 9. ANIMATION LOTTIE CONTACT (AJOUT) ---
    const contactLottieContainer = document.getElementById('lottie-contact');
    
    // On vérifie que le conteneur existe et qu'il est vide
    if (contactLottieContainer && contactLottieContainer.innerHTML.trim() === "") {
        try {
            lottie.loadAnimation({
                container: contactLottieContainer, // Le conteneur HTML
                renderer: 'svg',
                loop: true,
                autoplay: true,
                // Lien vers une animation "Paper Plane" (avion en papier) fiable
                path: 'https://assets6.lottiefiles.com/packages/lf20_2glqweqs.json' 
            });
            console.log("Animation Contact chargée avec succès");
        } catch(e) { 
            console.error("Erreur lors du chargement du Lottie Contact :", e); 
        }
    }
});
