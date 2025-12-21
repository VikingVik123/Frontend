// Get the selected rating from localStorage
const selectedRating = localStorage.getItem('selectedRating');

// Display the rating in the thank you message
if (selectedRating) {
    document.getElementById('selected-rating').textContent = selectedRating;
}
