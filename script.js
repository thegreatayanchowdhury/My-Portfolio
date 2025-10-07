document.addEventListener('DOMContentLoaded', () => {

    // Mobile Navigation Toggle
    window.toggleNav = function() {
        document.getElementById('nav-links').classList.toggle('active');
    }

    // Typing Effect
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
    typeEffect();

    // Dark/Light Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const localStorageKey = 'themePreference';

    function applyTheme(isDarkMode) {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.body.classList.remove('dark-mode');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    function initializeTheme() {
        const saved = localStorage.getItem(localStorageKey);
        if (saved) applyTheme(saved === 'dark');
        else if (window.matchMedia('(prefers-color-scheme: dark)').matches) applyTheme(true);
    }

    function toggleTheme() {
        const dark = document.body.classList.contains('dark-mode');
        applyTheme(!dark);
        localStorage.setItem(localStorageKey, !dark ? 'dark' : 'light');
    }

    themeToggle.addEventListener('click', toggleTheme);
    initializeTheme();
});
