function initTrendsChart() {
    const ctx = document.getElementById('trendsChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue',
                data: [800000, 950000, 1000000, 1100000, 1150000, 1200000],
                borderColor: '#2563eb',
                tension: 0.4
            },
            {
                label: 'Customers',
                data: [1800, 2000, 2150, 2250, 2350, 2450],
                borderColor: '#10b981',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function generatePrediction() {
    alert('Generating new AI predictions...');
}

function exportData() {
    alert('Exporting data...');
}

// Initialize
initTrendsChart();