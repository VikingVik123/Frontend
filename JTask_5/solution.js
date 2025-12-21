// Get all rating buttons
const ratingButtons = document.querySelectorAll('.rating-btn');
const submitBtn = document.getElementById('submit-btn');
let selectedRating = null;

// Add click event listener to each button
ratingButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        ratingButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Store the selected rating value
        selectedRating = button.textContent;
    });
});

// Add click event listener to submit button
submitBtn.addEventListener('click', () => {
    if (selectedRating) {
        // Store rating in localStorage
        localStorage.setItem('selectedRating', selectedRating);
        
        // Redirect to done page
        window.location.href = 'done.html';
    }
});
