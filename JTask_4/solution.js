const billInput = document.getElementById("box");
const peopleInput = document.getElementById("people");
const tipButtons = document.querySelectorAll(".tip-selection button");
const customTip = document.querySelector(".custom-tip input");

const tipAmountOutput = document.querySelectorAll(".result-row p")[0];
const totalOutput = document.querySelectorAll(".result-row p")[1];

const resetBtn = document.querySelector(".reset-btn");

// State
let bill = 0;
let tipPercent = 0;
let people = null;

// Functions
function calculate() {
    if (bill > 0 && people > 0) {
        const tipPerPerson = (bill * tipPercent) / people;
        const totalPerPerson = (bill / people) + tipPerPerson;

        tipAmountOutput.textContent = `$${tipPerPerson.toFixed(2)}`;
        totalOutput.textContent = `$${totalPerPerson.toFixed(2)}`;
    } else {
        tipAmountOutput.textContent = "$0.00";
        totalOutput.textContent = "$0.00";
    }
}

// ------------------ BILL INPUT ------------------
billInput.addEventListener("input", () => {
    bill = parseFloat(billInput.value) || 0;
    calculate();
});

// ------------------ PEOPLE INPUT ------------------
// PEOPLE VALIDATION
const peopleError = document.getElementById("people-error");

peopleInput.addEventListener("input", () => {
    const value = parseFloat(peopleInput.value);

    if (value === 0 || peopleInput.value === "") {
        peopleInput.classList.add("error");
        peopleError.style.display = "inline";
        people = 0;
    } else {
        peopleInput.classList.remove("error");
        peopleError.style.display = "none";
        people = value;
    }

    calculate();
});

// ------------------ TIP BUTTONS ------------------
tipButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        // Remove active class from all buttons
        tipButtons.forEach((b) => b.classList.remove("active"));

        // Add active class to clicked button
        btn.classList.add("active");

        // Disable custom tip when button clicked
        customTip.value = "";
        tipPercent = parseFloat(btn.textContent) / 100;

        calculate();
    });
});

// ------------------ CUSTOM TIP INPUT ------------------
customTip.addEventListener("input", () => {
    // Remove active class from all buttons
    tipButtons.forEach((b) => b.classList.remove("active"));

    tipPercent = parseFloat(customTip.value) / 100 || 0;

    calculate();
});

// ------------------ RESET BUTTON ------------------
resetBtn.addEventListener("click", () => {
    billInput.value = "";
    peopleInput.value = "";
    customTip.value = "";
    tipButtons.forEach((b) => b.classList.remove("active"));

    bill = 0;
    tipPercent = 0;
    people = 1;

    tipAmountOutput.textContent = "$0.00";
    totalOutput.textContent = "$0.00";
});