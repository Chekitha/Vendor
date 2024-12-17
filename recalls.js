// Sample recalls data - In a real application, this would come from an API
let recalls = [
    {
        id: 'RC-2024-001',
        product: {
            name: 'Premium Coffee Beans',
            sku: 'COF-001'
        },
        vendor: 'Global Coffee Corp',
        notificationStatus: 'Complete',
        storesNotified: 42,
        totalStores: 42,
        dateInitiated: '2024-03-15',
        priority: 'High',
        communications: []
    },
    {
        id: 'RC-2024-002',
        product: {
            name: 'Organic Green Tea',
            sku: 'TEA-002'
        },
        vendor: 'TeaLeaf Industries',
        notificationStatus: 'In Progress',
        storesNotified: 28,
        totalStores: 35,
        dateInitiated: '2024-03-18',
        priority: 'Medium',
        communications: []
    }
];

// Initialize when document loads
document.addEventListener('DOMContentLoaded', () => {
    initializeSearchAndFilters();
    attachEventListeners();
    renderRecalls();
});

function initializeSearchAndFilters() {
    const searchInput = document.querySelector('input[type="text"]');
    searchInput.addEventListener('input', (e) => {
        filterRecalls(e.target.value);
    });
}

function attachEventListeners() {
    // View Details button click handler
    document.addEventListener('click', (e) => {
        if (e.target.closest('.fa-eye')) {
            const recallId = e.target.closest('tr').dataset.recallId;
            showRecallDetails(recallId);
        }
    });

    // Communication Log button click handler
    document.addEventListener('click', (e) => {
        if (e.target.closest('.fa-comments')) {
            const recallId = e.target.closest('tr').dataset.recallId;
            showCommunicationLog(recallId);
        }
    });

    // New Recall button handler
    document.querySelector('button:contains("New Recall")').addEventListener('click', () => {
        showNewRecallForm();
    });
}

function showRecallDetails(recallId) {
    const recall = recalls.find(r => r.id === recallId);
    // Implement modal or new page showing full recall details
    console.log('Showing details for recall:', recall);
}

function showCommunicationLog(recallId) {
    const recall = recalls.find(r => r.id === recallId);
    // Implement communication log view/modal
    console.log('Showing communication log for recall:', recall);
}

function showNewRecallForm() {
    // Implement new recall form modal
    console.log('Opening new recall form');
}

function filterRecalls(searchTerm) {
    const filtered = recalls.filter(recall => 
        recall.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recall.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recall.product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recall.vendor.toLowerCase().includes(searchTerm.toLowerCase())
    );
    renderRecalls(filtered);
}

function renderRecalls(recallsToRender = recalls) {
    const tbody = document.querySelector('.custom-table tbody');
    tbody.innerHTML = recallsToRender.map(recall => `
        <tr data-recall-id="${recall.id}">
            <td>${recall.id}</td>
            <td>
                <div style="display: flex; flex-direction: column;">
                    <span class="name-link">${recall.product.name}</span>
                    <span style="font-size: 12px; color: #666;">SKU: ${recall.product.sku}</span>
                </div>
            </td>
            <td>${recall.vendor}</td>
            <td>
                <div style="display: flex; gap: 5px; align-items: center;">
                    <span style="background-color: ${getStatusColor(recall.notificationStatus)}; padding: 4px 8px; border-radius: 4px;">
                        ${recall.notificationStatus}
                    </span>
                </div>
            </td>
            <td>
                <div style="display: flex; flex-direction: column;">
                    <span>${recall.storesNotified}/${recall.totalStores} Stores</span>
                    <span style="font-size: 12px; color: #666;">${Math.round((recall.storesNotified/recall.totalStores) * 100)}% Complete</span>
                </div>
            </td>
            <td>${recall.dateInitiated}</td>
            <td>
                <span style="background-color: ${getPriorityColor(recall.priority)}; padding: 4px 8px; border-radius: 4px;">
                    ${recall.priority}
                </span>
            </td>
            <td>
                <div style="display: flex; gap: 8px;">
                    <button style="padding: 4px 8px; background: none; border: none; cursor: pointer; color: #666;" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button style="padding: 4px 8px; background: none; border: none; cursor: pointer; color: #666;" title="Communication Log">
                        <i class="fas fa-comments"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function getStatusColor(status) {
    const colors = {
        'Complete': '#def7ec',
        'In Progress': '#fef3c7',
        'Not Started': '#fde8e8'
    };
    return colors[status] || '#f3f4f6';
}

function getPriorityColor(priority) {
    const colors = {
        'High': '#fde8e8',
        'Medium': '#fef3c7',
        'Low': '#def7ec'
    };
    return colors[priority] || '#f3f4f6';
}