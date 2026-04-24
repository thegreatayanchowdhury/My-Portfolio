document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugin
    gsap.registerPlugin(ScrollTrigger);
    // 1. Lock scroll while loading
    document.body.classList.add('is-loading');

    // 2. Preloader Animation
    const logs = [
        "Checking System...",
        "Checking Network...",
        "System and Network Checking Complete...",
        "Establishing Secure Handshake...",
        "Initialization Complete."
    ];
    
    const logElement = document.getElementById('log-text');
    const fill = document.querySelector('.progress-bar-fill');
    
    // 2. Preloader Timeline
    const masterTL = gsap.timeline({
        onComplete: () => {
            document.body.classList.remove('is-loading');
            startHeroAnimations();
        }
    });

    // Laser scanning animation
    masterTL.to(".scan-line", {
        top: "100%",
        duration: 1.5,
        repeat: 2,
        yoyo: true,
        ease: "power1.inOut"
    });

    // Progress bar fill & Log change
    masterTL.to(fill, {
        width: "100%",
        duration: 3,
        ease: "power2.inOut",
        onUpdate: function() {
            const prog = Math.floor(this.progress() * 4);
            logElement.innerText = logs[prog];
        }
    }, 0);

    // Fade out loader
    masterTL.to(".loader-wrapper", {
        opacity: 0,
        scale: 1.1,
        duration: 0.5,
        ease: "power2.in"
    }).set(".loader-wrapper", { display: "none" });

    // 3. Define Hero Animations in a function
    function startHeroAnimations() {
        const tl = gsap.timeline();

        // Your existing hero animations
        tl.from(".main-title", {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out"
        })
            .from(".pre-title, .hero-footer", {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.6");
    }
    // --- 1. Mobile Navigation Toggle ---
    window.toggleNav = function () {
        const navLinks = document.getElementById('nav-links');
        navLinks.classList.toggle('active');
    }

    // --- 2. Typing Effect Logic ---
    const textToType = "I am a AI & ML Specialist and AI & ML Lead at GDG on Campus AEC";
    const typingSpeed = 75;
    let charIndex = 0;

    function typeEffect() {
        const element = document.getElementById("element");
        if (!element) return;

        if (charIndex < textToType.length) {
            element.innerHTML += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, typingSpeed);
        }
    }

    // Start typing
    typeEffect();

    // --- 3. Dark/Light Mode Toggle Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const localStorageKey = 'themePreference';

    function applyTheme(isDarkMode) {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            document.body.classList.remove('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    function initializeTheme() {
        const savedTheme = localStorage.getItem(localStorageKey);
        if (savedTheme) {
            applyTheme(savedTheme === 'dark');
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme(true);
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isCurrentlyDarkMode = document.body.classList.contains('dark-mode');
            const newTheme = !isCurrentlyDarkMode;
            applyTheme(newTheme);
            localStorage.setItem(localStorageKey, newTheme ? 'dark' : 'light');
        });
    }

    initializeTheme();

    // --- 4. GSAP ANIMATIONS (New Features) ---

    // A. Custom Cursor Logic (Only for Desktop)
    const cursor = document.querySelector('.cursor');
    if (window.innerWidth > 850) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
        });

        // B. Ambient Glow Movement
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;

            gsap.to(".ambient-glow", {
                x: x * 100,
                y: y * 100,
                duration: 2,
                ease: "power2.out"
            });
        });
        // Add this inside the (window.innerWidth > 850) block in script.js
        const links = document.querySelectorAll('a, button, .btn');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(cursor, { scale: 1.5, duration: 0.3 });
            });
            link.addEventListener('mouseleave', () => {
                gsap.to(cursor, { scale: 1, duration: 0.3 });
            });
        });
    }

    // C. Hero Text Reveal (Timeline)
    const tl = gsap.timeline();
    tl.from(".main-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
    })
        .from(".pre-title, .hero-footer", {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.6"); // Overlaps with the main title animation

    // D. Scroll Reveal for Sections
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%", // Starts when the section is 85% from the top of the viewport
                toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        });
    });

});