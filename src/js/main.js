import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const closeMenu = document.querySelector('.menu-close');
const menuContainer = document.querySelector('.menu-list');
const openMenu = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');

const contactForm = document.querySelector('.contact-form');
const nameInput = contactForm.querySelector('input[name="name"]');
const emailInput = contactForm.querySelector('input[name="email"]');
const messageInput = contactForm.querySelector('textarea[name="message"]');
const inputs = [nameInput, emailInput, messageInput];

openMenu.addEventListener('click', () => {
  mobileMenu.classList.add('active');
});

mobileMenu.addEventListener('click', e => {
  if (e.target !== menuContainer) {
    mobileMenu.classList.remove('active');
  }
});

function showError(input, message) {
  let error = input.nextElementSibling;
  if (!error || !error.classList.contains('error-message')) {
    error = document.createElement('div');
    error.classList.add('error-message');
    input.after(error);
  }
  error.textContent = message;
  input.classList.add('input-error');
}

function clearError(input) {
  let error = input.nextElementSibling;
  if (error && error.classList.contains('error-message')) {
    error.remove();
  }
  input.classList.remove('input-error');
}

inputs.forEach(input => {
  input.addEventListener('input', () => validateInput(input));
});

function validateInput(input) {
  if (input.name === 'email') {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(input.value.trim())) {
      showError(input, 'Enter a valid email');
      return false;
    }
  } else if (input.value.trim() === '') {
    showError(input, `${input.placeholder} is required`);
    return false;
  }

  clearError(input);
  return true;
}

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  let isValid = true;

  inputs.forEach(input => {
    if (!validateInput(input)) {
      isValid = false;
    }
  });

  if (isValid) {
    contactForm.reset();
    Toastify({
      text: 'Form submitted successfully',
      className: 'info',
      position: 'center',
      style: {
        background: 'linear-gradient(to right, #055baa, #0673da)',
      },
    }).showToast();
  }
});
