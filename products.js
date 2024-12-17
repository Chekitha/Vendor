console.log("Products.js file loaded!");

// Sample Data for Products
const productsData = [
    { id: 1001, name: 'Product A', type: 'Electronics' },
    { id: 1002, name: 'Product B', type: 'Clothing' },
    { id: 1003, name: 'Product C', type: 'Appliances' },
    { id: 1004, name: 'Product D', type: 'Furniture' }
];

// Render Product Table
function renderProductTable(data) {
    const table = `
        <div class="section-card full-width">
            <h2>Product Table</h2>
            <table class="custom-table">
                <thead>
                    <tr>
                        <th><input type="checkbox"></th>
                        <th>Order</th>
                        <th>Name</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(product => `
                        <tr>
                            <td><input type="checkbox"></td>
                            <td>${product.id}</td>
                            <td><a href="#" class="name-link">${product.name}</a></td>
                            <td>${product.type}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    document.querySelector('.main-content').innerHTML = table;
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Rendering product table...");
    renderProductTable(productsData);
});
