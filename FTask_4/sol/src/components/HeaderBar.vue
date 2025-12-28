<script setup>
</script>

<template>
    <div class="header-bar">
        <h2>Where in the world?</h2>
        <p>Dark Mode</p>
    </div>
</template>

<style scoped>
.header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 5%;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-bar h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 800;
}

.header-bar p {
    margin: 0;
    font-weight: 600;
    cursor: pointer;
}
</style>