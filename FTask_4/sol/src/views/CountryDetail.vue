<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HeaderBar from '../components/HeaderBar.vue'
import { getCountryByName } from '../services/countries_service'

const route = useRoute()
const router = useRouter()
const country = ref(null)
const loading = ref(true)

const loadCountry = async () => {
  loading.value = true
  try {
    const response = await getCountryByName(route.params.name)
    country.value = response.data[0]
    await loadBorderCountries()
  } catch (error) {
    console.error('Failed to load country:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadCountry()
})

const goBack = () => {
  router.push('/')
}

const nativeName = computed(() => {
  if (!country.value?.name?.nativeName) return 'N/A'
  const names = Object.values(country.value.name.nativeName)
  return names[0]?.common || 'N/A'
})

const currencies = computed(() => {
  if (!country.value?.currencies) return 'N/A'
  return Object.values(country.value.currencies)
    .map(curr => curr.name)
    .join(', ')
})

const languages = computed(() => {
  if (!country.value?.languages) return 'N/A'
  return Object.values(country.value.languages).join(', ')
})

const borderCountries = ref([])

const loadBorderCountries = async () => {
  if (!country.value?.borders || country.value.borders.length === 0) return
  
  try {
    const codes = country.value.borders.join(',')
    const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${codes}&fields=name,cca3`)
    const data = await response.json()
    borderCountries.value = data
  } catch (error) {
    console.error('Failed to load border countries:', error)
  }
}

const navigateToBorder = (borderName) => {
  router.push(`/country/${borderName}`)
  // Reset and reload
  country.value = null
  loading.value = true
}
</script>

<template>
  <HeaderBar />
  
  <div class="detail-container">
    <button class="back-button" @click="goBack">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      Back
    </button>

    <div v-if="loading" class="loading">Loading country details...</div>

    <div v-else-if="country" class="country-detail">
      <div class="flag-section">
        <img :src="country.flags.svg" :alt="country.name.common" />
      </div>

      <div class="info-section">
        <h2>{{ country.name.common }}</h2>

        <div class="info-columns">
          <div class="info-column">
            <p><strong>Native Name:</strong> {{ nativeName }}</p>
            <p><strong>Population:</strong> {{ country.population.toLocaleString() }}</p>
            <p><strong>Region:</strong> {{ country.region }}</p>
            <p><strong>Sub Region:</strong> {{ country.subregion || 'N/A' }}</p>
            <p><strong>Capital:</strong> {{ country.capital ? country.capital[0] : 'N/A' }}</p>
          </div>

          <div class="info-column">
            <p><strong>Top Level Domain:</strong> {{ country.tld ? country.tld[0] : 'N/A' }}</p>
            <p><strong>Currencies:</strong> {{ currencies }}</p>
            <p><strong>Languages:</strong> {{ languages }}</p>
          </div>
        </div>

        <div v-if="borderCountries.length" class="borders-section">
          <strong>Border Countries:</strong>
          <div class="border-tags">
            <button 
              v-for="border in borderCountries" 
              :key="border.cca3"
              class="border-tag"
              @click="navigateToBorder(border.name.common)"
            >
              {{ border.name.common }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-container {
  padding: 2.5rem 5%;
  background-color: var(--body-bg);
  min-height: calc(100vh - 80px);
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 2rem;
  background-color: var(--element-bg);
  color: var(--text-color);
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 4rem;
  transition: transform 0.2s ease;
}

.back-button:hover {
  transform: translateY(-2px);
}

.loading {
  text-align: center;
  padding: 3rem;
  font-size: 1.125rem;
  color: var(--text-color);
}

.country-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8rem;
  align-items: center;
}

.flag-section img {
  width: 100%;
  max-width: 560px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
}

.info-section h2 {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-color);
  margin-bottom: 2rem;
}

.info-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 3rem;
}

.info-column p {
  margin: 0.75rem 0;
  font-size: 0.95rem;
  color: var(--text-color);
}

.info-column strong {
  font-weight: 600;
}

.borders-section {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 2rem;
}

.borders-section strong {
  font-weight: 600;
  white-space: nowrap;
  padding-top: 0.5rem;
}

.border-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.border-tag {
  padding: 0.4rem 1.5rem;
  background-color: var(--element-bg);
  color: var(--text-color);
  border: none;
  border-radius: 3px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 0.875rem;
  transition: transform 0.2s ease;
}

.border-tag:hover {
  transform: translateY(-2px);
}

@media (max-width: 1200px) {
  .detail-container {
    padding: 2rem 4%;
  }
  
  .country-detail {
    gap: 5rem;
  }
}

@media (max-width: 1024px) {
  .country-detail {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .info-columns {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .detail-container {
    padding: 2rem 4%;
  }
  
  .back-button {
    padding: 0.5rem 1.5rem;
    margin-bottom: 3rem;
    font-size: 0.813rem;
  }
  
  .back-button svg {
    width: 18px;
    height: 18px;
  }
  
  .country-detail {
    gap: 2.5rem;
  }
  
  .flag-section img {
    max-width: 100%;
  }
  
  .info-section h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .info-columns {
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .info-column p {
    font-size: 0.875rem;
    margin: 0.6rem 0;
  }
  
  .borders-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .borders-section strong {
    padding-top: 0;
  }
  
  .border-tags {
    gap: 0.625rem;
  }
  
  .border-tag {
    padding: 0.4rem 1.2rem;
    font-size: 0.813rem;
  }
}
</style>
