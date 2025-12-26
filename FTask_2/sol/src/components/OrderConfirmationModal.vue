<script setup>
import { computed } from 'vue'

const props = defineProps({
  cart: {
    type: Array,
    required: true
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'start-new-order'])

const orderTotal = computed(() => {
  return props.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const closeModal = () => {
  emit('close')
}

const startNewOrder = () => {
  emit('start-new-order')
}
</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-backdrop" @click="closeModal">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <img src="/assets/images/icon-order-confirmed.svg" alt="Order confirmed" class="confirm-icon">
          <h2>Order Confirmed</h2>
          <p class="subtitle">We hope you enjoy your food!</p>
        </div>

        <div class="order-items">
          <div v-for="item in cart" :key="item.name" class="order-item">
            <div class="item-left">
              <img :src="item.image.thumbnail" :alt="item.name" class="item-thumbnail">
              <div class="item-details">
                <h4>{{ item.name }}</h4>
                <div class="item-info">
                  <span class="item-quantity">{{ item.quantity }}x</span>
                  <span class="item-price">@ ${{ item.price.toFixed(2) }}</span>
                </div>
              </div>
            </div>
            <div class="item-total">${{ (item.price * item.quantity).toFixed(2) }}</div>
          </div>

          <div class="order-total-row">
            <span>Order Total</span>
            <span class="total-amount">${{ orderTotal.toFixed(2) }}</span>
          </div>
        </div>

        <button @click="startNewOrder" class="new-order-btn">
          Start New Order
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-container {
  background: white;
  border-radius: 0.75rem;
  max-width: 37rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2.5rem;
}

.modal-header {
  margin-bottom: 2rem;
}

.confirm-icon {
  width: 3rem;
  height: 3rem;
  margin-bottom: 1.5rem;
}

.modal-header h2 {
  color: #260f08;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.subtitle {
  color: #87635a;
  font-size: 1rem;
  margin: 0;
}

.order-items {
  background: #fcf8f6;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #f5eeec;
}

.order-item:last-of-type {
  margin-bottom: 1.5rem;
}

.item-left {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.item-thumbnail {
  width: 3rem;
  height: 3rem;
  border-radius: 0.25rem;
  object-fit: cover;
}

.item-details h4 {
  color: #260f08;
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.item-info {
  display: flex;
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
  color: #260f08;
  font-weight: 600;
  font-size: 1rem;
}

.order-total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
}

.order-total-row span:first-child {
  color: #260f08;
  font-size: 0.875rem;
}

.total-amount {
  color: #260f08;
  font-size: 1.5rem;
  font-weight: 700;
}

.new-order-btn {
  width: 100%;
  background: #c73b0f;
  color: white;
  border: none;
  border-radius: 2rem;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.new-order-btn:hover {
  background: #952d0a;
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9);
}

/* Scrollbar styling */
.modal-container::-webkit-scrollbar {
  width: 0.5rem;
}

.modal-container::-webkit-scrollbar-track {
  background: #f5eeec;
  border-radius: 0.25rem;
}

.modal-container::-webkit-scrollbar-thumb {
  background: #caafa7;
  border-radius: 0.25rem;
}

.modal-container::-webkit-scrollbar-thumb:hover {
  background: #87635a;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .modal-container {
    max-width: 95%;
    padding: 2rem 1.5rem;
    max-height: 85vh;
  }

  .modal-header h2 {
    font-size: 2rem;
  }

  .order-items {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .modal-backdrop {
    padding: 0.5rem;
  }

  .modal-container {
    padding: 1.5rem 1rem;
    border-radius: 0.5rem;
  }

  .confirm-icon {
    width: 2.5rem;
    height: 2.5rem;
    margin-bottom: 1rem;
  }

  .modal-header h2 {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 0.875rem;
  }

  .item-thumbnail {
    width: 2.5rem;
    height: 2.5rem;
  }

  .item-left {
    gap: 0.75rem;
  }

  .item-details h4 {
    font-size: 0.8rem;
  }

  .item-info {
    font-size: 0.8rem;
  }

  .item-total {
    font-size: 0.9rem;
  }

  .total-amount {
    font-size: 1.25rem;
  }

  .new-order-btn {
    padding: 0.875rem;
    font-size: 0.9rem;
  }
}
</style>
