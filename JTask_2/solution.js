const form = document.getElementById('signup-form');
const emailInput = document.getElementById('email');
const errorText = document.getElementById('error-text');

function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function showErrorState() {
    errorText.classList.remove("hidden");      // show error
    emailInput.classList.add("error-input");   // red border + bg
}

function clearErrorState() {
    errorText.classList.add("hidden");         // hide error
    emailInput.classList.remove("error-input");
}

if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = emailInput.value.trim();

        if (!validateEmail(email)) {
            showErrorState();
            return;
        }

        clearErrorState();

        // redirect with email
        window.location.href = `success.html?email=${encodeURIComponent(email)}`;
    });
}


// SUCCESS PAGE LOGIC
const successParagraph = document.querySelector("#succ p");

if (successParagraph) {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");

    if (email) {
        successParagraph.innerHTML = `
            A confirmation email has been sent to <strong>${email}</strong>. 
            Please open it and click the button inside to confirm your subscription.
        `;
    }
}

// DISMISS BUTTON
const dismissBtn = document.getElementById("dismiss-btn");
if (dismissBtn) {
    dismissBtn.addEventListener("click", () => {
        window.location.href = "solution.html";
    });
}
