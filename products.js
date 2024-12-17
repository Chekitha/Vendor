// Sample product data - In a real application, this would come from an API
let products = [
    {
        id: 1,
        name: 'Premium Coffee Beans',
        sku: 'COF-001',
        category: 'Beverages',
        stock: 250,
        price: 24.99,
        status: 'Active'
    },
    {
        id: 2,
        name: 'Organic Green Tea',
        sku: 'TEA-002',
        category: 'Beverages',
        stock: 180,
        price: 18.99,
        status: 'Active'
    },
    {
        id: 3,
        name: 'Herbal Infusion Pack',
        sku: 'TEA-003',
        category: 'Beverages',
        stock: 0,
        price: 15.99,
        status: 'Out of Stock'
    }
];

// Pagination state
let currentPage = 1;
const itemsPerPage = 10;

// Search and filter state
let searchQuery = '';
let sortColumn = 'name';
let sortDirection = 'asc';

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize search
    const searchInput = document.querySelector('input[type="text"]');
    const searchButton = searchInput.nextElementSibling;
    
    // Initialize table
    const table = document.querySelector('.custom-table');
    const tableHeaders = table.querySelectorAll('th');
    const selectAllCheckbox = tableHeaders[0].querySelector('input[type="checkbox"]');
    
    // Initialize pagination
    const prevButton = document.querySelector('button:contains("Previous")');
    const nextButton = document.querySelector('button:contains("Next")');
    
    // Add event listeners
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        currentPage = 1;
        renderProducts();
    });
    
    searchButton.addEventListener('click', () => {
        currentPage = 1;
        renderProducts();
    });
    
    // Sort functionality
    tableHeaders.forEach(header => {
        if (header.textContent !== '' && !header.querySelector('input')) {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => handleSort(header.textContent.toLowerCase()));
        }
    });
    
    // Select all functionality
    selectAllCheckbox.addEventListener('change', handleSelectAll);
    
    // Pagination controls
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
        }
    });
    
    nextButton.addEventListener('click', () => {
        const maxPage = Math.ceil(getFilteredProducts().length / itemsPerPage);
        if (currentPage < maxPage) {
            currentPage++;
            renderProducts();
        }
    });
    
    // Initial render
    renderProducts();
});

// Filtering and sorting functions
function getFilteredProducts() {
    return products
        .filter(product => {
            const searchLower = searchQuery.toLowerCase();
            return (
                product.name.toLowerCase().includes(searchLower) ||
                product.sku.toLowerCase().includes(searchLower) ||
                product.category.toLowerCase().includes(searchLower)
            );
        })
        .sort((a, b) => {
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];
            
            if (typeof aValue === 'number') {
                return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
            }
            
            return sortDirection === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        });
}

function handleSort(column) {
    if (sortColumn === column) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn = column;
        sortDirection = 'asc';
    }
    renderProducts();
}

function handleSelectAll(e) {
    const checkboxes = document.querySelectorAll('.custom-table tbody input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = e.target.checked);
}

// CRUD Operations
function addProduct(product) {
    products.push({
        id: Math.max(...products.map(p => p.id)) + 1,
        ...product
    });
    renderProducts();
}

function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    renderProducts();
}

function editProduct(id, updatedProduct) {
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        renderProducts();
    }
}

// Render functions
function renderProducts() {
    const tbody = document.querySelector('.custom-table tbody');
    const filteredProducts = getFilteredProducts();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    tbody.innerHTML = paginatedProducts.map(product => `
        <tr data-id="${product.id}">
            <td><input type="checkbox"></td>
            <td><a href="#" class="name-link">${product.name}</a></td>
            <td>${product.sku}</td>
            <td>${product.category}</td>
            <td>${product.stock}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>
                <span style="background-color: ${product.status === 'Active' ? '#def7ec' : '#fde8e8'}; 
                           color: ${product.status === 'Active' ? '#03543f' : '#9b1c1c'}; 
                           padding: 4px 8px; 
                           border-radius: 4px;">
                    ${product.status}
                </span>
            </td>
            <td>
                <div style="display: flex; gap: 8px;">
                    <button onclick="handleEdit(${product.id})" style="padding: 4px 8px; background: none; border: none; cursor: pointer; color: #666;">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="handleDelete(${product.id})" style="padding: 4px 8px; background: none; border: none; cursor: pointer; color: #666;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    // Update pagination info
    const paginationInfo = document.querySelector('.main-content > div:last-child > div:first-child');
    paginationInfo.textContent = `Showing ${startIndex + 1}-${Math.min(endIndex, filteredProducts.length)} of ${filteredProducts.length} products`;
    
    // Update button states
    const prevButton = document.querySelector('button:contains("Previous")');
    const nextButton = document.querySelector('button:contains("Next")');
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = endIndex >= filteredProducts.length;
}

// Event handlers for edit and delete
function handleEdit(id) {
    const product = products.find(p => p.id === id);
    // Implement your edit modal/form logic here
    console.log('Edit product:', product);
}

function handleDelete(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        deleteProduct(id);
    }
}

// Add product button handler
document.querySelector('button:contains("Add Product")').addEventListener('click', () => {
    // Implement your add product modal/form logic here
    console.log('Add new product');
});