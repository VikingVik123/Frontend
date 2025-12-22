// Get form and form elements
const form = document.getElementById('contact-form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const emailAddress = document.getElementById('email-address');
const queryRadios = document.querySelectorAll('input[name="query"]');
const message = document.getElementById('message');
const consent = document.getElementById('consent');
const successMsg = document.getElementById('success-msg');

// Error message elements
const firstNameError = document.getElementById('first-name-error');
const lastNameError = document.getElementById('last-name-error');
const emailError = document.getElementById('email-address-error');
const queryError = document.getElementById('query-error');
const messageError = document.getElementById('message-error');
const consentError = document.getElementById('consent-error');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation functions
function validateFirstName() {
  if (firstName.value.trim() === '') {
    firstName.classList.add('error');
    firstNameError.classList.add('show');
    return false;
  } else {
    firstName.classList.remove('error');
    firstNameError.classList.remove('show');
    return true;
  }
}

function validateLastName() {
  if (lastName.value.trim() === '') {
    lastName.classList.add('error');
    lastNameError.classList.add('show');
    return false;
  } else {
    lastName.classList.remove('error');
    lastNameError.classList.remove('show');
    return true;
  }
}

function validateEmail() {
  if (emailAddress.value.trim() === '') {
    emailAddress.classList.add('error');
    emailError.textContent = 'This field is required';
    emailError.classList.add('show');
    return false;
  } else if (!emailRegex.test(emailAddress.value.trim())) {
    emailAddress.classList.add('error');
    emailError.textContent = 'Please enter a valid email address';
    emailError.classList.add('show');
    return false;
  } else {
    emailAddress.classList.remove('error');
    emailError.classList.remove('show');
    return true;
  }
}

function validateQueryType() {
  const isChecked = Array.from(queryRadios).some(radio => radio.checked);
  if (!isChecked) {
    queryError.classList.add('show');
    return false;
  } else {
    queryError.classList.remove('show');
    return true;
  }
}

function validateMessage() {
  if (message.value.trim() === '') {
    message.classList.add('error');
    messageError.classList.add('show');
    return false;
  } else {
    message.classList.remove('error');
    messageError.classList.remove('show');
    return true;
  }
}

function validateConsent() {
  if (!consent.checked) {
    consentError.classList.add('show');
    return false;
  } else {
    consentError.classList.remove('show');
    return true;
  }
}

// Add real-time validation on blur
firstName.addEventListener('blur', validateFirstName);
lastName.addEventListener('blur', validateLastName);
emailAddress.addEventListener('blur', validateEmail);
message.addEventListener('blur', validateMessage);

// Add real-time validation on input for better UX
firstName.addEventListener('input', () => {
  if (firstName.classList.contains('error')) {
    validateFirstName();
  }
});

lastName.addEventListener('input', () => {
  if (lastName.classList.contains('error')) {
    validateLastName();
  }
});

emailAddress.addEventListener('input', () => {
  if (emailAddress.classList.contains('error')) {
    validateEmail();
  }
});

message.addEventListener('input', () => {
  if (message.classList.contains('error')) {
    validateMessage();
  }
});

queryRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (queryError.classList.contains('show')) {
      validateQueryType();
    }
  });
});

consent.addEventListener('change', () => {
  if (consentError.classList.contains('show')) {
    validateConsent();
  }
});

// Form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validate all fields
  const isFirstNameValid = validateFirstName();
  const isLastNameValid = validateLastName();
  const isEmailValid = validateEmail();
  const isQueryValid = validateQueryType();
  const isMessageValid = validateMessage();
  const isConsentValid = validateConsent();

  // If all validations pass, show success message and reset form
  if (isFirstNameValid && isLastNameValid && isEmailValid && isQueryValid && isMessageValid && isConsentValid) {
    // Show success message
    successMsg.classList.add('show');

    // Reset form
    form.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMsg.classList.remove('show');
    }, 5000);

    // Scroll to top to show success message
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});
