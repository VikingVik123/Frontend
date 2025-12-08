// script.js
const shareBtn = document.querySelector('.share-btn');
const popup = document.querySelector('.share-popup');
const authorBox = document.querySelector('.author-box');

shareBtn.addEventListener('click', () => {
  shareBtn.classList.toggle('active');
  popup.classList.toggle('active');
  
  // On mobile: hide author info when popup is open
  if (window.innerWidth <= 680) {
    authorBox.classList.toggle('active');
  }
});