<script setup>
import Container from './components/Container.vue';
</script>

<template>
  <div class="app-container">
    <Container />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@500;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 18px;
}

body {
  background-color: hsl(221, 100%, 96%);
}

.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
}
</style>
