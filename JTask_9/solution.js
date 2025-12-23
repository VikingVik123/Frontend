// State
let currentImageIndex = 1;
let quantity = 0;
let cart = [];

// Elements
const menuToggle = document.querySelector('.menu-toggle');
const menuClose = document.querySelector('.menu-close');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnail-container .thumbnail');
const prevBtnMobile = document.querySelector('.prev-btn-mobile');
const nextBtnMobile = document.querySelector('.next-btn-mobile');

const quantityValue = document.querySelector('.quantity-value');
const decreaseBtn = document.querySelector('.decrease-btn');
const increaseBtn = document.querySelector('.increase-btn');
const addToCartBtn = document.querySelector('.add-to-cart-btn');

const cartBtn = document.querySelector('.cart-btn');
const cartDropdown = document.querySelector('.cart-dropdown');
const cartCount = document.querySelector('.cart-count');
const cartEmpty = document.querySelector('.cart-empty');
const cartItems = document.querySelector('.cart-items');

const mainImageWrapper = document.querySelector('.main-image-wrapper');
const lightboxOverlay = document.querySelector('.lightbox-overlay');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxThumbnails = document.querySelectorAll('.lightbox-thumbnails .thumbnail');
const lightboxPrevBtn = document.querySelector('.lightbox-nav-btn.prev-btn');
const lightboxNextBtn = document.querySelector('.lightbox-nav-btn.next-btn');

// Mobile Menu
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.add('active');
  mobileMenuOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
});

const closeMobileMenu = () => {
  mobileMenu.classList.remove('active');
  mobileMenuOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
};

menuClose.addEventListener('click', closeMobileMenu);
mobileMenuOverlay.addEventListener('click', closeMobileMenu);

// Image Gallery Functions
function updateMainImage(imageNum) {
  currentImageIndex = imageNum;
  mainImage.src = `./ecommerce-product-page-main/images/image-product-${imageNum}.jpg`;
  
  // Update thumbnails
  thumbnails.forEach(thumb => thumb.classList.remove('active'));
  document.querySelector(`.thumbnail-container .thumbnail[data-image="${imageNum}"]`).classList.add('active');
}

function updateLightboxImage(imageNum) {
  currentImageIndex = imageNum;
  lightboxImage.src = `./ecommerce-product-page-main/images/image-product-${imageNum}.jpg`;
  
  // Update lightbox thumbnails
  lightboxThumbnails.forEach(thumb => thumb.classList.remove('active'));
  document.querySelector(`.lightbox-thumbnails .thumbnail[data-image="${imageNum}"]`).classList.add('active');
}

function navigateImage(direction) {
  let newIndex = currentImageIndex + direction;
  if (newIndex < 1) newIndex = 4;
  if (newIndex > 4) newIndex = 1;
  
  // Check if lightbox is open
  if (lightboxOverlay.classList.contains('active')) {
    updateLightboxImage(newIndex);
  } else {
    updateMainImage(newIndex);
  }
}

// Thumbnail clicks
thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', () => {
    const imageNum = parseInt(thumbnail.dataset.image);
    updateMainImage(imageNum);
  });
});

// Mobile navigation buttons
prevBtnMobile.addEventListener('click', (e) => {
  e.stopPropagation();
  navigateImage(-1);
});

nextBtnMobile.addEventListener('click', (e) => {
  e.stopPropagation();
  navigateImage(1);
});

// Lightbox
mainImageWrapper.addEventListener('click', (e) => {
  // Only open lightbox on desktop
  if (window.innerWidth >= 768 && !e.target.classList.contains('nav-btn') && !e.target.closest('.nav-btn')) {
    lightboxOverlay.classList.add('active');
    updateLightboxImage(currentImageIndex);
    document.body.style.overflow = 'hidden';
  }
});

lightboxClose.addEventListener('click', () => {
  lightboxOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
});

lightboxOverlay.addEventListener('click', (e) => {
  if (e.target === lightboxOverlay) {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Lightbox thumbnails
lightboxThumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', () => {
    const imageNum = parseInt(thumbnail.dataset.image);
    updateLightboxImage(imageNum);
  });
});

// Lightbox navigation
lightboxPrevBtn.addEventListener('click', () => navigateImage(-1));
lightboxNextBtn.addEventListener('click', () => navigateImage(1));

// Quantity Controls
function updateQuantity(newQuantity) {
  if (newQuantity < 0) return;
  quantity = newQuantity;
  quantityValue.textContent = quantity;
}

decreaseBtn.addEventListener('click', () => {
  updateQuantity(quantity - 1);
});

increaseBtn.addEventListener('click', () => {
  updateQuantity(quantity + 1);
});

// Cart Functions
function updateCartDisplay() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  if (totalItems > 0) {
    cartCount.textContent = totalItems;
    cartCount.classList.add('active');
    cartEmpty.style.display = 'none';
    cartItems.classList.add('active');
    
    // Render cart items
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <span class="cart-item-name">${item.name}</span>
          <span class="cart-item-price">
            $${item.price.toFixed(2)} x ${item.quantity} 
            <span class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</span>
          </span>
        </div>
        <button class="delete-btn" onclick="removeFromCart(${item.id})">
          <img src="./ecommerce-product-page-main/images/icon-delete.svg" alt="Delete">
        </button>
      </div>
    `).join('') + '<button class="checkout-btn">Checkout</button>';
  } else {
    cartCount.classList.remove('active');
    cartEmpty.style.display = 'block';
    cartItems.classList.remove('active');
    cartItems.innerHTML = '';
  }
}

function addToCart() {
  if (quantity === 0) return;
  
  const product = {
    id: 1,
    name: 'Fall Limited Edition Sneakers',
    price: 125.00,
    image: './ecommerce-product-page-main/images/image-product-1-thumbnail.jpg',
    quantity: quantity
  };
  
  // Check if product already in cart
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push(product);
  }
  
  updateCartDisplay();
  updateQuantity(0);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartDisplay();
}

// Make removeFromCart global so it can be called from HTML
window.removeFromCart = removeFromCart;

addToCartBtn.addEventListener('click', addToCart);

// Cart Dropdown Toggle
cartBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  cartDropdown.classList.toggle('active');
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
  if (!cartDropdown.contains(e.target) && !cartBtn.contains(e.target)) {
    cartDropdown.classList.remove('active');
  }
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  if (lightboxOverlay.classList.contains('active')) {
    if (e.key === 'Escape') {
      lightboxOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    } else if (e.key === 'ArrowLeft') {
      navigateImage(-1);
    } else if (e.key === 'ArrowRight') {
      navigateImage(1);
    }
  }
});
