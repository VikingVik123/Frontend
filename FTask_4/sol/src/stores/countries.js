import { defineStore } from 'pinia'
import { getAllCountries } from '../services/countries_service'

export const useCountriesStore = defineStore('countries', {
  state: () => ({
    allCountries: [],
    searchQuery: '',
    regionFilter: '',
    loading: false,
    error: null,
  }),

  getters: {
    countries(state) {
      let filtered = state.allCountries

      // Apply search filter
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        filtered = filtered.filter(country => 
          country.name.common.toLowerCase().includes(query)
        )
      }

      // Apply region filter
      if (state.regionFilter) {
        filtered = filtered.filter(country => 
          country.region === state.regionFilter
        )
      }

      return filtered
    }
  },

  actions: {
    async fetchCountries() {
      this.loading = true
      this.error = null

      try {
        const response = await getAllCountries()
        this.allCountries = response.data
      } catch (err) {
        this.error = 'Failed to load countries'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    setSearchQuery(query) {
      this.searchQuery = query
    },

    setRegionFilter(region) {
      this.regionFilter = region
    }
  }
})
