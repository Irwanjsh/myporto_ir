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
      }, 1600);
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
