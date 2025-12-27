<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    monthlyRepayment: {
        type: Number,
        default: null
    },
    totalRepayment: {
        type: Number,
        default: null
    }
});

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 2
    }).format(value);
};
</script>

<template>
    <div class="result-card">
        <div v-if="!monthlyRepayment" class="results-empty">
            <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192" fill="none">
                <circle cx="96" cy="96" r="74" fill="#D8DB2F"/>
                <rect x="62" y="60" width="68" height="60" fill="#1E3A4A" rx="4"/>
                <rect x="75" y="75" width="10" height="20" fill="#D8DB2F" rx="2"/>
                <rect x="95" y="75" width="10" height="20" fill="#D8DB2F" rx="2"/>
                <rect x="107" y="75" width="10" height="20" fill="#D8DB2F" rx="2"/>
                <rect x="75" y="100" width="10" height="10" fill="#D8DB2F" rx="2"/>
            </svg>
            <h2>Results shown here</h2>
            <p>Complete the form and click "calculate repayments" to see what your monthly repayments would be.</p>
        </div>

        <div v-else class="results-content">
            <h2>Your results</h2>
            <p class="results-description">
                Your results are shown below based on the information you provided. 
                To adjust the results, edit the form and click "calculate repayments" again.
            </p>
            
            <div class="results-box">
                <div class="result-item">
                    <p class="result-label">Your monthly repayments</p>
                    <p class="result-value monthly">{{ formatCurrency(monthlyRepayment) }}</p>
                </div>
                
                <hr class="divider" />
                
                <div class="result-item">
                    <p class="result-label">Total you'll repay over the term</p>
                    <p class="result-value total">{{ formatCurrency(totalRepayment) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.result-card {
    background-color: hsl(202, 55%, 16%);
    padding: 2rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    border-top-right-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
    border-bottom-left-radius: 5rem;
    min-height: 350px;
}

.results-empty {
    text-align: center;
    color: hsl(0, 0%, 100%);
}

.results-empty svg {
    width: 12rem;
    height: 12rem;
    margin-bottom: 1rem;
}

.results-empty h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: hsl(0, 0%, 100%);
    margin-bottom: 1rem;
}

.results-empty p {
    color: hsl(203, 41%, 72%);
    line-height: 1.6;
    font-size: 0.875rem;
}

.results-content {
    width: 100%;
    color: hsl(0, 0%, 100%);
}

.results-content h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.results-description {
    color: hsl(203, 41%, 72%);
    line-height: 1.6;
    margin-bottom: 2.5rem;
    font-size: 0.875rem;
}

.results-box {
    background-color: rgba(0, 0, 0, 0.25);
    border-top: 4px solid hsl(61, 70%, 52%);
    border-radius: 0.5rem;
    padding: 2rem 2rem 2.5rem 2rem;
}

.result-item {
    margin-bottom: 1.5rem;
}

.result-item:last-child {
    margin-bottom: 0;
}

.result-label {
    color: hsl(203, 41%, 72%);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
}

.result-value {
    font-weight: 700;
    color: hsl(0, 0%, 100%);
}

.result-value.monthly {
    font-size: 3rem;
    color: hsl(61, 70%, 52%);
    margin: 0.5rem 0 1.5rem;
}

.result-value.total {
    font-size: 1.5rem;
}

.divider {
    border: none;
    border-top: 1px solid hsla(203, 41%, 72%, 0.3);
    margin: 2rem 0;
}

@media (max-width: 768px) {
    .result-card {
        border-radius: 0 0 1.5rem 1.5rem;
        border-bottom-left-radius: 1.5rem;
    }
    
    .result-value.monthly {
        font-size: 2.5rem;
    }
}
</style>