const btn = document.getElementById('share-btn');
const popup = document.getElementById('share-popup');

btn.addEventListener('click', () => {
  popup.classList.toggle('show');
  btn.classList.toggle('active');
});