<script setup>
import { defineEmits } from 'vue'
import AddButton from './AddButton.vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  cartQuantity: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['add-to-cart', 'remove-from-cart'])

const handleAddToCart = () => {
  emit('add-to-cart', props.product)
}

const handleRemoveFromCart = () => {
  emit('remove-from-cart', props.product.name)
}
</script>

<template>
  <div class="foodbox">
    <div class="food-image-container">
      <img 
        :src="product.image.desktop" 
        :alt="product.name"
        class="food-image"
      />
      <div v-if="cartQuantity === 0" class="button-overlay">
        <AddButton @click="handleAddToCart" />
      </div>
      <div v-else class="quantity-control">
        <button @click="handleRemoveFromCart" class="quantity-btn">-</button>
        <span class="quantity">{{ cartQuantity }}</span>
        <button @click="handleAddToCart" class="quantity-btn">+</button>
      </div>
    </div>
    
    <div class="food-info">
      <p class="category">{{ product.category }}</p>
      <h3 class="name">{{ product.name }}</h3>
      <p class="price">${{ product.price.toFixed(2) }}</p>
    </div>
  </div>
</template>

<style>
.foodbox {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.food-image-container {
  position: relative;
  width: 100%;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.food-image {
  width: 100%;
  height: 12.5rem;
  object-fit: cover;
  display: block;
  border-radius: 0.5rem;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;
}

.food-image:hover {
  border-color: #c73b0f;
}

.button-overlay {
  position: relative;
  bottom: 1.05rem;
  left: 50%;
  transform: translateX(-50%);
}

.quantity-control {
  position: relative;
  bottom: 1.2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #c73b0f;
  padding: 0.5em 1em;
  border-radius: 2rem;
  color: white;
  font-size: 1em;
  min-width: 3rem;
  justify-content: space-between;
}

.quantity-btn {
  background: transparent;
  border: 0.0625rem solid white;
  color: white;
  width: 1.25rem;
  height: 1.75rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.quantity-btn:hover {
  background: white;
  color: #c73b0f;
}

.quantity {
  font-weight: 600;
  min-width: 1.875rem;
  text-align: center;
  font-size: 0.875rem;
}

.food-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.category {
  color: #87635a;
  font-size: 0.875rem;
  margin: 0;
}

.name {
  color: #260f08;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.price {
  color: #c73b0f;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .foodbox {
    width: 100%;
  }

  .food-image {
    height: 15rem;
  }

  .quantity-control {
    min-width: 9rem;
    padding: 0.65em 0.9em;
  }
}

@media (max-width: 480px) {
  .food-image {
    height: 13rem;
  }

  .quantity-control {
    min-width: 8rem;
    font-size: 0.9em;
  }

  .name {
    font-size: 0.95rem;
  }

  .category,
  .price {
    font-size: 0.8rem;
  }
}
</style>