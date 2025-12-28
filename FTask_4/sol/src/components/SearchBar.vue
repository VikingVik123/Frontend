<script setup>
</script>

<template>
    <div class="search-bar">
        <input type="text" placeholder="Search for a country..." />
        <select class="filter-dropdown">
            <option value="">Filter by Region</option>
            <option value="africa">Africa</option>
            <option value="americas">Americas</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
        </select>
    </div>
</template>

<style scoped>
.search-bar {
    display: flex;
    gap: 1rem;
    padding: 2rem 5%;
    background-color: transparent;
}

.search-bar input {
    flex: 0 0 400px;
    padding: 1rem 1.5rem;
    font-size: 0.875rem;
    border: none;
    border-radius: 5px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filter-dropdown {
    padding: 1rem 1.5rem;
    font-size: 0.875rem;
    border: none;
    border-radius: 5px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    min-width: 200px;
}
</style>