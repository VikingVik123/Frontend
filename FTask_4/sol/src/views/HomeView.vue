<script setup>
import HeaderBar from '../components/HeaderBar.vue';
import SearchBar from '../components/SearchBar.vue';

import { onMounted } from 'vue'
import { useCountriesStore } from '../stores/countries.js'
import CountryBox from '../components/CountryBox.vue'

const countriesStore = useCountriesStore()

onMounted(() => {
  countriesStore.fetchCountries()
})
</script>


<template>
  <HeaderBar />
  <SearchBar />
  <div class="loading" v-if="countriesStore.loading">
    Loading countries...
  </div>
  <div class="error" v-else-if="countriesStore.error">
    {{ countriesStore.error }}
  </div>
  <div class="countries-grid" v-else>
    <CountryBox
      v-for="country in countriesStore.countries"
      :key="country.cca3"
      :country="country"
    />
  </div>
</template>

<style scoped>
.countries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(264px, 1fr));
  gap: 4.5rem;
  padding: 2rem 5%;
  background-color: var(--body-bg);
}

.loading,
.error {
  padding: 3rem 5%;
  text-align: center;
  font-size: 1.125rem;
  color: var(--text-color);
}

@media (max-width: 1200px) {
  .countries-grid {
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .countries-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding: 2rem 4%;
  }
  
  .loading,
  .error {
    padding: 2rem 4%;
    font-size: 1rem;
  }
}
</style>