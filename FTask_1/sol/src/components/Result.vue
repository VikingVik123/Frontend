<script setup>
</script>

<template>
  <div class="result-section">
    <h2 class="title">Your Result</h2>
    <div class="circle">
      <div class="score">76</div>
      <div class="total">of 100</div>
    </div>
    <h3 class="grade">Great</h3>
    <p class="description">
      You scored higher than 65% of the people who have taken these tests.
    </p>
  </div>
</template>

<style scoped>
.result-section {
  background: linear-gradient(180deg, hsl(252, 100%, 67%) 0%, hsl(241, 81%, 54%) 100%);
  border-radius: 2rem;
  padding: 2.5rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
  width: 50%;
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
  color: hsla(0, 0%, 100%, 0.7);
  margin-bottom: 2rem;
}

.circle {
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  background: linear-gradient(180deg, hsla(256, 72%, 46%, 1) 0%, hsla(241, 72%, 46%, 0) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.score {
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1;
}

.total {
  font-size: 1.125rem;
  color: hsla(0, 0%, 100%, 0.5);
  font-weight: 700;
}

.grade {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.125rem;
  color: hsla(0, 0%, 100%, 0.7);
  line-height: 1.5;
  max-width: 16rem;
}

@media (max-width: 768px) {
  .result-section {
    width: 100%;
    border-radius: 0 0 2rem 2rem;
    padding: 1.5rem 3.5rem 2.5rem 3.5rem;
  }

  .title {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
  }

  .circle {
    width: 8.75rem;
    height: 8.75rem;
    margin-bottom: 1.5rem;
  }

  .score {
    font-size: 3.5rem;
  }

  .total {
    font-size: 1rem;
  }

  .grade {
    font-size: 1.5rem;
  }

  .description {
    font-size: 1rem;
  }
}
</style>
