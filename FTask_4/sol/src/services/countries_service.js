import axios from 'axios'

const BASE_URL = 'https://restcountries.com/v3.1'

export const getAllCountries = () => {
  return axios.get(`${BASE_URL}/all?fields=name,cca3,region,capital,population,flags`)
}

export const getCountryByName = (name) => {
  return axios.get(`${BASE_URL}/name/${name}?fullText=true`)
}