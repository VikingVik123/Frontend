<script setup>
import { ref, onMounted } from 'vue'
import Result from './Result.vue'
import bar from './bar.vue'

const data = ref([])

onMounted(async () => {
  const response = await fetch('/data.json')
  data.value = await response.json()
})
</script>

<template>
  <div class="container">
    <Result />
    <div class="summary-section">
      <h2 class="summary-title">Summary</h2>
      <div class="bars-container">
        <bar 
          v-for="item in data" 
          :key="item.category"
          :category="item.category"
          :score="item.score"
          :icon="item.icon"
        />
      </div>
      <button class="continue-btn">Continue</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 46rem;
  background-color: white;
  border-radius: 2rem;
  box-shadow: 0 1.875rem 3.75rem rgba(61, 108, 236, 0.15);
}

.summary-section {
  padding: 2.5rem 2.5rem 2.5rem 2rem;
  width: 50%;
  display: flex;
  flex-direction: column;
}

.summary-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: hsl(224, 30%, 27%);
  margin-bottom: 1.75rem;
}

.bars-container {
  flex: 1;
}

.continue-btn {
  width: 100%;
  padding: 1rem;
  background-color: hsl(224, 30%, 27%);
  color: white;
  border: none;
  border-radius: 2rem;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;
}

.continue-btn:hover {
  background: linear-gradient(180deg, hsl(252, 100%, 67%) 0%, hsl(241, 81%, 54%) 100%);
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    width: 100%;
    max-width: 23.4375rem;
    border-radius: 0 0 2rem 2rem;
  }

  .summary-section {
    width: 100%;
    padding: 1.5rem 2rem 2rem 2rem;
  }
}
</style>