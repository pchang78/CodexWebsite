const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');
const themeToggle = document.querySelector('#theme-toggle');
const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');

const setMenuState = (isOpen) => {
  navMenu.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
};

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.contains('is-open');
  setMenuState(!isOpen);
});

navMenu.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    setMenuState(false);
  }
});

const applyTheme = (theme) => {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.setAttribute('aria-pressed', 'true');
    themeToggle.textContent = 'Light mode';
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.setAttribute('aria-pressed', 'false');
    themeToggle.textContent = 'Dark mode';
  }
};

const storedTheme = localStorage.getItem('apex-theme');
if (storedTheme) {
  applyTheme(storedTheme);
}

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';
  localStorage.setItem('apex-theme', nextTheme);
  applyTheme(nextTheme);
});

const showError = (input, message) => {
  const errorEl = input.parentElement.querySelector('.form-error');
  errorEl.textContent = message;
};

const clearError = (input) => {
  const errorEl = input.parentElement.querySelector('.form-error');
  errorEl.textContent = '';
};

const validateForm = () => {
  let isValid = true;
  const fields = Array.from(form.querySelectorAll('input, textarea'));

  fields.forEach((field) => {
    if (!field.checkValidity()) {
      showError(field, field.validationMessage);
      isValid = false;
    } else {
      clearError(field);
    }
  });

  return isValid;
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.textContent = '';

  if (!validateForm()) {
    formStatus.textContent = 'Please correct the highlighted fields.';
    formStatus.style.color = '#b91c1c';
    return;
  }

  formStatus.textContent = 'Thanks! Your message has been sent.';
  formStatus.style.color = '#0b3d91';
  form.reset();
});

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((el) => observer.observe(el));
