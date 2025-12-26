<script setup>
import { ref, computed, onMounted } from 'vue'
import FoodBox from './components/FoodBox.vue'
import Cart from './components/Cart.vue'
import OrderConfirmationModal from './components/OrderConfirmationModal.vue'

// State management - storing products and cart
const products = ref([])
const cart = ref([])
const loading = ref(true)
const error = ref(null)
const showOrderModal = ref(false)
const confirmedOrder = ref([])

// Fetch data from JSON file (simulating API call)
const fetchProducts = async () => {
  try {
    loading.value = true
    const response = await fetch('/data.json')
    if (!response.ok) throw new Error('Failed to fetch products')
    const data = await response.json()
    products.value = data
  } catch (err) {
    error.value = err.message
    console.error('Error fetching products:', err)
  } finally {
    loading.value = false
  }
}

// Add item to cart
const addToCart = (product) => {
  const existingItem = cart.value.find(item => item.name === product.name)
  if (existingItem) {
    existingItem.quantity++
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }
}

// Remove item from cart
const removeFromCart = (productName) => {
  const index = cart.value.findIndex(item => item.name === productName)
  if (index !== -1) {
    if (cart.value[index].quantity > 1) {
      cart.value[index].quantity--
    } else {
      cart.value.splice(index, 1)
    }
  }
}

// Calculate total
const cartTotal = computed(() => {
  return cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

// Remove item completely from cart
const removeItemFromCart = (productName) => {
  const index = cart.value.findIndex(item => item.name === productName)
  if (index !== -1) {
    cart.value.splice(index, 1)
  }
}

// Confirm order
const confirmOrder = () => {
  if (cart.value.length === 0) return
  
  // Store the current cart for the modal
  confirmedOrder.value = [...cart.value]
  showOrderModal.value = true
  
  // Here you would typically send the order to an API
  console.log('Order details:', cart.value)
}

// Close modal
const closeOrderModal = () => {
  showOrderModal.value = false
}

// Start new order
const startNewOrder = () => {
  cart.value = []
  confirmedOrder.value = []
  showOrderModal.value = false
}

// Fetch products when component mounts
onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div class="app-container">
    <main class="products-section">
      <h1>Desserts</h1>
      
      <!-- Loading state -->
      <div v-if="loading" class="loading">Loading products...</div>
      
      <!-- Error state -->
      <div v-if="error" class="error">{{ error }}</div>
      
      <!-- Products grid -->
      <div v-else class="products-grid">
        <FoodBox 
          v-for="product in products" 
          :key="product.name"
          :product="product"
          :cart-quantity="cart.find(item => item.name === product.name)?.quantity || 0"
          @add-to-cart="addToCart"
          @remove-from-cart="removeFromCart"
        />
      </div>
    </main>

    <!-- Cart sidebar -->
    <Cart 
      :cart="cart"
      @remove-item="removeItemFromCart"
      @confirm-order="confirmOrder"
    />

    <!-- Order Confirmation Modal -->
    <OrderConfirmationModal 
      :cart="confirmedOrder"
      :is-open="showOrderModal"
      @close="closeOrderModal"
      @start-new-order="startNewOrder"
    />
  </div>
</template>

<style scoped>
.app-container {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  padding: 2rem;
}

.products-section h1 {
  margin-bottom: 2rem;
  text-align: left;
}

.products-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.loading, .error {
  padding: 2rem;
  text-align: center;
}

.error {
  color: #ff4444;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .app-container {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 1.5rem;
  }

  .products-section h1 {
    margin-bottom: 1.5rem;
    font-size: 2rem;
  }

  .products-grid {
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .app-container {
    padding: 0.5rem;
  }

  .products-section h1 {
    font-size: 1.75rem;
  }
}
</style>
