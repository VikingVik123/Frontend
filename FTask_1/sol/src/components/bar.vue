<script setup>
defineProps({
  category: String,
  score: Number,
  icon: String
})
</script>

<template>
  <div class="bar">
    <div class="bar-content">
      <img :src="icon" :alt="category" class="icon">
      <span class="category">{{ category }}</span>
    </div>
    <div class="score">
      <span class="score-value">{{ score }}</span>
      <span class="score-total"> / 100</span>
    </div>
  </div>
</template>

<style scoped>
.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
}

.bar:nth-child(1) {
  background-color: hsla(0, 100%, 67%, 0.05);
}

.bar:nth-child(1) .category {
  color: hsl(0, 100%, 67%);
}

.bar:nth-child(2) {
  background-color: hsla(39, 100%, 56%, 0.05);
}

.bar:nth-child(2) .category {
  color: hsl(39, 100%, 56%);
}

.bar:nth-child(3) {
  background-color: hsla(166, 100%, 37%, 0.05);
}

.bar:nth-child(3) .category {
  color: hsl(166, 100%, 37%);
}

.bar:nth-child(4) {
  background-color: hsla(234, 85%, 45%, 0.05);
}

.bar:nth-child(4) .category {
  color: hsl(234, 85%, 45%);
}

.bar-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
}

.category {
  font-weight: 700;
  font-size: 1.125rem;
}

.score {
  font-weight: 700;
  font-size: 1.125rem;
}

.score-value {
  color: hsl(224, 30%, 27%);
}

.score-total {
  color: hsla(224, 30%, 27%, 0.5);
}
</style>