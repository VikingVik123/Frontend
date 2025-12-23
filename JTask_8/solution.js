// Mobile menu toggle functionality
const menuToggle = document.querySelector('.menu-toggle');
const menuClose = document.querySelector('.menu-close');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

// Open mobile menu
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.add('active');
  mobileMenuOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
});

// Close mobile menu
menuClose.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
  mobileMenuOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// Close menu when clicking overlay
mobileMenuOverlay.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
  mobileMenuOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
});
