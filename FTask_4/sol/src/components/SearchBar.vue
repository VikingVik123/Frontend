<script setup>
import { ref, watch } from 'vue'
import { useCountriesStore } from '../stores/countries.js'

const countriesStore = useCountriesStore()

const searchQuery = ref('')
const selectedRegion = ref('')

// Watch search input and update store
watch(searchQuery, (newValue) => {
  countriesStore.setSearchQuery(newValue)
})

// Watch region filter and update store
watch(selectedRegion, (newValue) => {
  countriesStore.setRegionFilter(newValue)
})
</script>

<template>
    <div class="search-bar">
        <div class="search-input-wrapper">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input 
                type="text" 
                placeholder="Search for a country..." 
                v-model="searchQuery"
            />
        </div>
        <select class="filter-dropdown" v-model="selectedRegion">
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
        </select>
    </div>
</template>

<style scoped>
.search-bar {
    display: flex;
    gap: 1rem;
    padding: 2rem 5%;
    background-color: var(--body-bg);
    flex-wrap: wrap;
}

.search-input-wrapper {
    position: relative;
    flex: 1;
    min-width: 280px;
    max-width: 480px;
}

.search-icon {
    position: absolute;
    left: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    color: var(--text-color);
    opacity: 0.5;
}

.search-input-wrapper input {
    width: 100%;
    padding: 1rem 1.5rem 1rem 3.5rem;
    font-size: 0.875rem;
    border: none;
    border-radius: 5px;
    background-color: var(--element-bg);
    color: var(--text-color);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Nunito Sans', sans-serif;
}

.search-input-wrapper input::placeholder {
    color: var(--text-color);
    opacity: 0.5;
}

.filter-dropdown {
    padding: 1rem 1.5rem;
    font-size: 0.875rem;
    border: none;
    border-radius: 5px;
    background-color: var(--element-bg);
    color: var(--text-color);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    min-width: 200px;
    font-family: 'Nunito Sans', sans-serif;
}

@media (max-width: 768px) {
    .search-bar {
        padding: 1.5rem 4%;
        gap: 2.5rem;
    }
    
    .search-input-wrapper {
        max-width: 100%;
        min-width: 100%;
    }
    
    .filter-dropdown {
        width: 200px;
        min-width: auto;
    }
}
</style>