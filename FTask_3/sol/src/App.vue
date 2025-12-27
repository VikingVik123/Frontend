<script setup>
import { ref } from 'vue';
import ResultCard from './components/ResultCard.vue';
import MortForm from './components/MortForm.vue';

const monthlyRepayment = ref(null);
const totalRepayment = ref(null);

const handleCalculate = (data) => {
  const { amount, term, rate, type } = data;
  
  // Convert annual rate to monthly rate
  const monthlyRate = rate / 100 / 12;
  const numPayments = term * 12;
  
  if (type === 'repayment') {
    // Calculate monthly repayment using mortgage formula
    // M = P[r(1+r)^n]/[(1+r)^n-1]
    const monthly = amount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                   (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    monthlyRepayment.value = monthly;
    totalRepayment.value = monthly * numPayments;
  } else {
    // Interest only: just pay monthly interest
    const monthly = amount * monthlyRate;
    
    monthlyRepayment.value = monthly;
    totalRepayment.value = (monthly * numPayments) + amount;
  }
};
</script>

<template>
  <div class="calculator-container">
    <MortForm @calculate="handleCalculate" />
    <ResultCard 
      :monthlyRepayment="monthlyRepayment" 
      :totalRepayment="totalRepayment" 
    />
  </div>
</template>

<style scoped>
.calculator-container {
  display: grid;
  grid-template-columns: 55% 45%;
  max-width: 900px;
  width: 100%;
  margin: 2rem;
  background-color: hsl(0, 0%, 100%);
  border-radius: 1.5rem;
  overflow: visible;
  box-shadow: 0 32px 64px rgba(30, 58, 74, 0.15);
}

@media (max-width: 768px) {
  .calculator-container {
    grid-template-columns: 1fr;
    margin: 1rem;
  }
}
</style>
