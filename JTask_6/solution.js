// Get all FAQ question buttons
const faqQuestions = document.querySelectorAll('.faq-question');

// Add click event listener to each question
faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Toggle the active state
    faqItem.classList.toggle('active');
    
    // Update aria-expanded attribute
    question.setAttribute('aria-expanded', !isActive);
  });
});
