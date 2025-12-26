<script setup>
</script>

<template>
    <div class="result-card">
        <img src="/assets/images/illustration-empty.svg">
        <div class="result-text">
            <h2>Results shown here</h2>
            <p>Complete the form and click “calculate repayments” to see what 
                your monthly repayments would be.
            </p>
        </div>
    </div>
</template>

<style scoped>
.result-card {
    background-color: hsl(202, 55%, 16%);
    border-radius: 1rem;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    text-align: center;
    max-width: 20rem;
    margin: 2rem auto;
}

.result-text {
    color: hsl(0, 0%, 100%);
    margin-bottom: 1rem;
}
</style>