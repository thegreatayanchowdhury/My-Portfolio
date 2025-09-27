function toggleNav() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
}

// Typing effect
let i = 0;
const text = "I am a AI & ML Specialist and AI & ML Lead at GDG on Campus AEC";
const speed = 100;

function typeEffect() {
    if (i < text.length) {
        document.getElementById("element").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeEffect, speed);
    }
}

window.onload = function() {
    const element = document.getElementById("element");
    if (element) {
        typeEffect();
    }
};


