// Fetch data from JSON file
fetch('./time-tracking-dashboard-main/data.json')
    .then(response => response.json())
    .then(data => {
        // Store data globally for easy access
        window.trackingData = data;
        
        // Initialize with weekly view (default active)
        updateCards('weekly');
        
        // Add event listeners to filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                // Update cards with selected timeframe
                const timeframe = button.dataset.timeframe;
                updateCards(timeframe);
            });
        });
    })
    .catch(error => console.error('Error loading data:', error));

function updateCards(timeframe) {
    const data = window.trackingData;
    
    data.forEach(activity => {
        const activityName = activity.title.toLowerCase().replace(' ', '-');
        const card = document.querySelector(`[data-activity="${activityName}"]`);
        
        if (card) {
            const currentTime = activity.timeframes[timeframe].current;
            const previousTime = activity.timeframes[timeframe].previous;
            
            // Update current time
            const currentTimeElement = card.querySelector('.current-time');
            currentTimeElement.textContent = `${currentTime}hrs`;
            
            // Update previous time with appropriate label
            const previousTimeElement = card.querySelector('.previous-time');
            let timeLabel = '';
            
            if (timeframe === 'daily') {
                timeLabel = 'Yesterday';
            } else if (timeframe === 'weekly') {
                timeLabel = 'Last Week';
            } else if (timeframe === 'monthly') {
                timeLabel = 'Last Month';
            }
            
            previousTimeElement.textContent = `${timeLabel} - ${previousTime}hrs`;
        }
    });
}
