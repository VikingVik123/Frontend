<script setup>
import { computed } from 'vue'

const props = defineProps({
  cart: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['remove-item', 'confirm-order'])

const cartTotal = computed(() => {
  return props.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const cartCount = computed(() => {
  return props.cart.reduce((sum, item) => sum + item.quantity, 0)
})

const removeItem = (itemName) => {
  emit('remove-item', itemName)
}

const confirmOrder = () => {
  emit('confirm-order')
}
</script>

<template>
  <aside class="cart-section">
    <h2 class="cart-title">Your Cart ({{ cartCount }})</h2>
    
    <!-- Empty cart state -->
    <div v-if="cart.length === 0" class="empty-cart">
      <img src="/assets/images/illustration-empty-cart.svg" alt="Empty cart" class="empty-cart-icon">
      <p>Your added items will appear here</p>
    </div>
    
    <!-- Cart with items -->
    <div v-else class="cart-content">
      <div class="cart-items">
        <div v-for="item in cart" :key="item.name" class="cart-item">
          <div class="item-details">
            <h4 class="item-name">{{ item.name }}</h4>
            <div class="item-info">
              <span class="item-quantity">{{ item.quantity }}x</span>
              <span class="item-price">@ ${{ item.price.toFixed(2) }}</span>
              <span class="item-total">${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
          <button 
            @click="removeItem(item.name)" 
            class="remove-btn"
            aria-label="Remove item"
          >
            <img src="/assets/images/icon-remove-item.svg" alt="Remove">
          </button>
        </div>
      </div>
      
      <!-- Order total -->
      <div class="order-total">
        <span>Order Total</span>
        <span class="total-amount">${{ cartTotal.toFixed(2) }}</span>
      </div>
      
      <!-- Carbon neutral banner -->
      <div class="carbon-neutral">
        <img src="/assets/images/icon-carbon-neutral.svg" alt="Carbon neutral">
        <span>This is a <strong>carbon-neutral</strong> delivery</span>
      </div>
      
      <!-- Confirm button -->
      <button @click="confirmOrder" class="confirm-btn">
        Confirm Order
      </button>
    </div>
  </aside>
</template>

<style scoped>
.cart-section {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.cart-title {
  color: #c73b0f;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
}

/* Empty cart */
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  text-align: center;
}

.empty-cart-icon {
  width: 128px;
  height: auto;
  margin-bottom: 1rem;
}

.empty-cart p {
  color: #87635a;
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;
}

/* Cart content */
.cart-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f5eeec;
}

.item-details {
  flex: 1;
}

.item-name {
  color: #260f08;
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.item-quantity {
  color: #c73b0f;
  font-weight: 600;
}

.item-price {
  color: #87635a;
}

.item-total {
  color: #87635a;
  font-weight: 600;
}

.remove-btn {
  background: transparent;
  border: 1px solid #caafa7;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.remove-btn:hover {
  border-color: #260f08;
}

.remove-btn img {
  width: 10px;
  height: 10px;
}

/* Order total */
.order-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
}

.order-total span:first-child {
  color: #260f08;
  font-size: 0.875rem;
}

.total-amount {
  color: #260f08;
  font-size: 1.5rem;
  font-weight: 700;
}

/* Carbon neutral */
.carbon-neutral {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #fcf8f6;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #260f08;
}

.carbon-neutral img {
  width: 21px;
  height: 20px;
}

/* Confirm button */
.confirm-btn {
  width: 100%;
  background: #c73b0f;
  color: #ffffff;
  border: none;
  border-radius: 2rem;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.confirm-btn:hover {
  background: #952d0a;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .cart-section {
    position: relative;
    top: 0;
  }
}

@media (max-width: 480px) {
  .cart-section {
    padding: 1rem;
  }

  .cart-title {
    font-size: 1.25rem;
  }

  .empty-cart-icon {
    width: 100px;
  }

  .total-amount {
    font-size: 1.25rem;
  }
}
</style>
