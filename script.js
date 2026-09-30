// Typing effect untuk tagline
const typingEl = document.querySelector('.typing');

const phrases = [
  'Building things from scratch',
  'Learning every single day',
  'AI-assisted developer',
  'Turning ideas into code',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;

function type() {
  if (!typingEl) return;

  const current = phrases[phraseIndex];

  if (isPaused) return;

  if (!isDeleting) {
    typingEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      isPaused = true;
      setTimeout(() => {
        isPaused = false;
        isDeleting = true;
        type();
      }, 1800);
      return;
    }

    setTimeout(type, 65);
  } else {
    typingEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 300);
      return;
    }

    setTimeout(type, 35);
  }
}

setTimeout(type, 700);

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking on a link
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// Smooth scroll untuk anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  });
});

// Intersection Observer untuk animasi fade-in pada scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -80px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe semua section untuk fade-in animation
document.querySelectorAll('.section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(section);
});

// Detect dark/light preference (untuk future dark mode toggle)
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
