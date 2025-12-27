<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['calculate']);

const mortgageAmount = ref('');
const mortgageTerm = ref('');
const interestRate = ref('');
const mortgageType = ref('repayment');

const errors = ref({
    amount: false,
    term: false,
    rate: false
});

const clearAll = () => {
    mortgageAmount.value = '';
    mortgageTerm.value = '';
    interestRate.value = '';
    mortgageType.value = 'repayment';
    errors.value = {
        amount: false,
        term: false,
        rate: false
    };
};

const calculateRepayments = () => {
    // Reset errors
    errors.value = {
        amount: !mortgageAmount.value,
        term: !mortgageTerm.value,
        rate: !interestRate.value
    };

    // Check if there are any errors
    if (errors.value.amount || errors.value.term || errors.value.rate) {
        return;
    }

    emit('calculate', {
        amount: parseFloat(mortgageAmount.value),
        term: parseFloat(mortgageTerm.value),
        rate: parseFloat(interestRate.value),
        type: mortgageType.value
    });
};
</script>

<template>
    <div class="form-section">
        <div class="header">
            <h1>Mortgage Calculator</h1>
            <button type="button" @click="clearAll" class="clear-btn">Clear All</button>
        </div>

        <form @submit.prevent="calculateRepayments">
            <div class="form-group">
                <label for="mortgage-amount">Mortgage Amount</label>
                <div class="input-wrapper prefix" :class="{ error: errors.amount }">
                    <span class="input-symbol">£</span>
                    <input 
                        type="number" 
                        id="mortgage-amount"
                        v-model="mortgageAmount"
                    />
                </div>
                <p v-if="errors.amount" class="error-message">This field is required</p>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="mortgage-term">Mortgage Term</label>
                    <div class="input-wrapper suffix" :class="{ error: errors.term }">
                        <input 
                            type="number" 
                            id="mortgage-term"
                            v-model="mortgageTerm"
                        />
                        <span class="input-symbol">years</span>
                    </div>
                    <p v-if="errors.term" class="error-message">This field is required</p>
                </div>

                <div class="form-group">
                    <label for="interest-rate">Interest Rate</label>
                    <div class="input-wrapper suffix" :class="{ error: errors.rate }">
                        <input 
                            type="number" 
                            id="interest-rate"
                            v-model="interestRate"
                            step="0.01"
                        />
                        <span class="input-symbol">%</span>
                    </div>
                    <p v-if="errors.rate" class="error-message">This field is required</p>
                </div>
            </div>
            <div class="form-group">
                <label>Mortgage Type</label>
                <div class="radio-group">
                    <label class="radio-label" :class="{ active: mortgageType === 'repayment' }">
                        <input 
                            type="radio" 
                            name="mortgage-type"
                            value="repayment"
                            v-model="mortgageType"
                        />
                        <span>Repayment</span>
                    </label>
                    <label class="radio-label" :class="{ active: mortgageType === 'interest-only' }">
                        <input 
                            type="radio" 
                            name="mortgage-type"
                            value="interest-only"
                            v-model="mortgageType"
                        />
                        <span>Interest Only</span>
                    </label>
                </div>
            </div>

            <button type="submit" class="submit-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="2"/>
                    <line x1="8" y1="6" x2="16" y2="6"/>
                    <line x1="8" y1="10" x2="16" y2="10"/>
                    <line x1="8" y1="14" x2="16" y2="14"/>
                    <line x1="8" y1="18" x2="10" y2="18"/>
                </svg>
                Calculate Repayments
            </button>
        </form>
    </div>
</template>

<style scoped>
.form-section {
    background-color: hsl(0, 0%, 100%);
    padding: 2rem;
    border-top-left-radius: 1.5rem;
    border-bottom-left-radius: 1.5rem;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.5rem;
}

.header h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: hsl(202, 55%, 16%);
    margin: 0;
}

.clear-btn {
    background: none;
    border: none;
    color: hsl(200, 24%, 40%);
    text-decoration: underline;
    cursor: pointer;
    font-size: 1rem;
    padding: 0;
    font-weight: 500;
}

.clear-btn:hover {
    color: hsl(202, 55%, 16%);
}

.form-group {
    margin-bottom: 1.5rem;
    min-width: 0;
}

.form-group label {
    display: block;
    color: hsl(200, 24%, 40%);
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.75rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid hsl(200, 24%, 60%);
    border-radius: 0.375rem;
    overflow: hidden;
    transition: border-color 0.2s;
    max-width: 100%;
}

.input-wrapper:focus-within {
    border-color: hsl(61, 70%, 52%);
}

.input-wrapper.error {
    border-color: hsl(4, 69%, 50%);
}

.input-wrapper.error .input-symbol {
    background-color: hsl(4, 69%, 50%);
    color: hsl(0, 0%, 100%);
    border-color: hsl(4, 69%, 50%);
}

.error-message {
    color: hsl(4, 69%, 50%);
    font-size: 0.875rem;
    margin-top: 0.5rem;
}

.input-wrapper.prefix .input-symbol {
    background-color: hsl(202, 86%, 94%);
    padding: 0.875rem 1rem;
    font-weight: 700;
    color: hsl(202, 55%, 16%);
    border-right: 1px solid hsl(200, 24%, 60%);
}

.input-wrapper.suffix .input-symbol {
    background-color: hsl(202, 86%, 94%);
    padding: 0.875rem 1rem;
    font-weight: 700;
    color: hsl(202, 55%, 16%);
    border-left: 1px solid hsl(200, 24%, 60%);
}

.input-wrapper input {
    flex: 1;
    border: none;
    padding: 0.875rem 1rem;
    font-size: 1.125rem;
    font-weight: 700;
    color: hsl(202, 55%, 16%);
    outline: none;
}

.input-wrapper input::-webkit-outer-spin-button,
.input-wrapper input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.radio-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.radio-label {
    display: flex;
    align-items: center;
    padding: 0.875rem 1rem;
    border: 1px solid hsl(200, 24%, 60%);
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
}

.radio-label:hover {
    border-color: hsl(61, 70%, 52%);
}

.radio-label.active {
    background-color: hsla(61, 70%, 52%, 0.15);
    border-color: hsl(61, 70%, 52%);
}

.radio-label input[type="radio"] {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 1rem;
    accent-color: hsl(61, 70%, 52%);
}

.radio-label span {
    font-weight: 700;
    color: hsl(202, 55%, 16%);
}

.submit-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    width: auto;
    background-color: hsl(61, 70%, 52%);
    color: hsl(202, 55%, 16%);
    border: none;
    border-radius: 2rem;
    padding: 1rem 2.5rem;
    font-size: 1.125rem;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 1rem;
}

.submit-btn:hover {
    background-color: hsla(61, 70%, 52%, 0.7);
}

.submit-btn svg {
    width: 1.5rem;
    height: 1.5rem;
}

@media (max-width: 768px) {
    .form-section {
        border-radius: 1.5rem 1.5rem 0 0;
    }

    .form-row {
        grid-template-columns: 1fr;
    }
}
</style>