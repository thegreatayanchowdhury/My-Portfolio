document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Mobile Navigation Toggle ---
    window.toggleNav = function() {
        const navLinks = document.getElementById('nav-links');
        navLinks.classList.toggle('active');
    }

    // --- 2. Typing Effect Logic ---
    const textToType = "I am a AI & ML Specialist and AI & ML Lead at GDG on Campus AEC";
    const typingSpeed = 75; // Speed in milliseconds
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

    // Start the typing effect
    typeEffect();


    // --- 3. Dark/Light Mode Toggle Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const localStorageKey = 'themePreference';

    // Function to apply the theme based on the preference
    function applyTheme(isDarkMode) {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            themeToggle.setAttribute('aria-label', 'Toggle Light Mode');
        } else {
            document.body.classList.remove('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            themeToggle.setAttribute('aria-label', 'Toggle Dark Mode');
        }
    }

    // Function to check saved preference on load
    function initializeTheme() {
        const savedTheme = localStorage.getItem(localStorageKey);

        // 1. Check for saved preference
        if (savedTheme) {
            applyTheme(savedTheme === 'dark');
        }
        // 2. If no preference, check system setting
        else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme(true); // Default to dark if system prefers it
        }
        // 3. Otherwise, stay in light mode (default)
    }

    // Function to handle the toggle click
    function toggleTheme() {
        // Check current state (true if it has dark-mode class)
        const isCurrentlyDarkMode = document.body.classList.contains('dark-mode');

        // Toggle the theme
        const newTheme = !isCurrentlyDarkMode;
        applyTheme(newTheme);

        // Save the new preference to localStorage
        localStorage.setItem(localStorageKey, newTheme ? 'dark' : 'light');
    }

    // Attach listener to the button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Run the initialization function
    initializeTheme();
});
