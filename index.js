console.log("JavaScript file loaded!");

// Chart Data
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

// Sample Backend Data for Products Section
const productsData = [
    { id: 1001, upc: '123456789012', name: 'Product A', type: 'Electronics' },
    { id: 1002, upc: '987654321098', name: 'Product B', type: 'Clothing' },
    { id: 1003, upc: '456123789456', name: 'Product C', type: 'Appliances' },
    { id: 1004, upc: '789321654123', name: 'Product D', type: 'Furniture' }
];

// Function to Dynamically Generate Product Table

// Placeholder Data for Section Content
const sectionContent = {
    default: `
        <div class="content-row">
            <div class="section-card">
                <h2>Today's Recalls</h2>
                <canvas id="recallChart"></canvas>
            </div>
            <div class="section-card">
                <h2>Affected Retailers</h2>
                <canvas id="retailerChart"></canvas>
            </div>
        </div>
        <div class="content-row">
            <div class="section-card full-width">
                <h2>Most Recalled Products</h2>
                <canvas id="recalledProductsChart"></canvas>
            </div>
        </div>
    `,
    products: generateProductSection(productsData),
    recalls: '' // Blank for now
};


function generateProductSection(data) {
    return `
        <div class="section-card product-section">
            <h2>Product Information</h2>
            <table class="custom-table">
                <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <th>Order</th>
                        <th>Name</th>
                        <th>Occupation</th>
                        <th>Contact</th>
                        <th>Education</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map((product, index) => `
                        <tr>
                            <td><input type="checkbox" ${index === 1 ? 'checked' : ''}/></td>
                            <td>${product.id}</td>
                            <td><a href="#" class="name-link">${product.name}</a></td>
                            <td>${product.type}</td>
                            <td>${product.contact}</td>
                            <td>${product.education}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Function to Handle Sidebar Navigation
function loadSectionContent(section) {
    const mainContent = document.querySelector('.main-content');
    if (section === 'products') {
        // Generate table dynamically for products
        mainContent.innerHTML = renderProductTable(productsData);
    } else if (section === 'recalls') {
        mainContent.innerHTML = sectionContent[section];
        initializeCharts(); // Reinitialize charts
    } else if (section === 'default' || !section) { 
        // Load the default section
        mainContent.innerHTML = sectionContent['default'];
    }
    else {
        mainContent.innerHTML = '<h2>Content Not Found</h2>';
    }
}

// Attach Event Listeners to Sidebar Links
document.querySelectorAll('.nav-links li').forEach(item => {
    item.addEventListener('click', function() {
        const section = this.getAttribute('data-section');
        console.log(`Loading section: ${section}`);
        loadSectionContent(section);
    });
});

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


// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM is ready!");
    console.log("Page loaded. Initializing charts.");
    loadSectionContent('default'); // Load default section
    initializeCharts();
});
