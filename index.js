// Chart Colors
const pieChartColors = [
    '#1B5E20',
    '#FF5722',
    '#4CAF50',
    '#FB8C00',
    '#388E3C'
];

const barChartColors = [
    '#1B5E20',
    '#FF5722',
    '#4CAF50',
    '#FB8C00'
];

// Chart Data
const recallData = {
    labels: ['Vendor A', 'Vendor B', 'Vendor C'],
    datasets: [{
        data: [20, 30, 50],
        backgroundColor: pieChartColors.slice(0, 3)
    }]
};

const retailerData = {
    labels: ['Retailer X', 'Retailer Y', 'Retailer Z'],
    datasets: [{
        data: [10, 40, 50],
        backgroundColor: pieChartColors.slice(2, 5)
    }]
};

const recalledProductsData = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    datasets: [{
        label: 'Recalls',
        data: [25, 40, 35, 20],
        backgroundColor: barChartColors
    }]
};

// Initialize Charts
function initializeCharts() {
    // Recall Chart
    const recallChart = document.getElementById('recallChart');
    if (recallChart) {
        new Chart(recallChart, {
            type: 'pie',
            data: recallData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { family: 'Outfit' }
                        }
                    }
                }
            }
        });
    }

    // Retailer Chart
    const retailerChart = document.getElementById('retailerChart');
    if (retailerChart) {
        new Chart(retailerChart, {
            type: 'pie',
            data: retailerData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { family: 'Outfit' }
                        }
                    }
                }
            }
        });
    }

    // Recalled Products Chart
    const recalledProductsChart = document.getElementById('recalledProductsChart');
    if (recalledProductsChart) {
        new Chart(recalledProductsChart, {
            type: 'bar',
            data: recalledProductsData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0, 0, 0, 0.1)' }
                    },
                    x: {
                        grid: { display: false }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
}

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Initializing charts...");
    initializeCharts();
});