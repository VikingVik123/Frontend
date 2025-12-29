<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  country: {
    type: Object,
    required: true,
  }
})

const router = useRouter()

const goToDetail = () => {
  router.push(`/country/${props.country.name.common}`)
}
</script>

<template>
  <div class="country-card" @click="goToDetail">
    <div class="flag-container">
      <img :src="country.flags.svg" :alt="country.name.common" />
    </div>
    <div class="country-info">
      <h3>{{ country.name.common }}</h3>
      <p><strong>Population:</strong> {{ country.population.toLocaleString() }}</p>
      <p><strong>Region:</strong> {{ country.region }}</p>
      <p><strong>Capital:</strong> {{ country.capital ? country.capital[0] : 'N/A' }}</p>
    </div>
  </div>
</template>

<style scoped>
.country-card {
  background-color: var(--element-bg);
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.country-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.flag-container {
  width: 100%;
  height: 160px;
  overflow: hidden;
}

.flag-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.country-info {
  padding: 1.5rem;
}

.country-info h3 {
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
  font-weight: 800;
  color: var(--text-color);
}

.country-info p {
  margin: 0.5rem 0;
  font-size: 0.875rem;
  color: var(--text-color);
}

.country-info p strong {
  font-weight: 600;
}
</style>
