<script setup>
import { ref, onMounted } from 'vue'

const isDarkMode = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark-mode')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark-mode')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDarkMode.value = true
    document.documentElement.classList.add('dark-mode')
  }
})
</script>

<template>
    <div class="header-bar">
        <h2>Where in the world?</h2>
        <button class="theme-toggle" @click="toggleDarkMode">
            <svg v-if="!isDarkMode" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
        </button>
    </div>
</template>

<style scoped>
.header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 5%;
    background-color: var(--element-bg);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-bar h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--text-color);
}

.theme-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    font-weight: 600;
    cursor: pointer;
    background: none;
    border: none;
    color: var(--text-color);
    font-size: 0.875rem;
    font-family: 'Nunito Sans', sans-serif;
    transition: opacity 0.2s ease;
}

.theme-toggle:hover {
    opacity: 0.7;
}

.theme-toggle svg {
    width: 16px;
    height: 16px;
}

@media (max-width: 768px) {
    .header-bar {
        padding: 1.5rem 4%;
    }
    
    .header-bar h2 {
        font-size: 0.875rem;
    }
    
    .theme-toggle {
        font-size: 0.75rem;
        gap: 0.4rem;
    }
    
    .theme-toggle svg {
        width: 14px;
        height: 14px;
    }
}
</style>