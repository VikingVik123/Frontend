<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <button class="add-button" @click="handleClick">
    <img src="/src/assets/images/icon-add-to-cart.svg" alt="cart icon">
    <span class="add-to-cart">
      Add to Cart
    </span>
  </button>
</template>

<style scoped>
  .add-button {
  border-radius: 2rem;
  border: 1px solid transparent;
  padding: 0.5em 1em;
  font-size: 1em;
  font-weight: 600;
  font-family: inherit;
  background-color: #eed1d1;
  cursor: pointer;
  transition: border-color 0.25s;
}
.add-button:hover {
  border-color: #646cff;
}
.add-button:focus,
.add-button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
</style>
