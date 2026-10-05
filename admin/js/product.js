let products = [
    { id: 1, name: 'Snake Plant', description: 'Air purifying plant for bedrooms.', category: 'Indoor Plants', price: 449, stock: 15, image: '../images/snake-plant.jpg' },
    { id: 2, name: 'Monstera Deliciosa', description: 'Tropical Swiss cheese plant.', category: 'Indoor Plants', price: 799, stock: 4, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=200&q=80' },
    { id: 3, name: 'Areca Palm', description: 'Feathery palm for living rooms & gardens.', category: 'Outdoor Plants', price: 650, stock: 8, image: '../images/areca-palm.jpg' },
    { id: 4, name: 'Peace Lily', description: 'Elegant white blooms & dark green foliage.', category: 'Flowering Plants', price: 499, stock: 2, image: '../images/peace-lily.jpg' },
    { id: 5, name: 'Aloe Vera', description: 'Medicinal succulent plant.', category: 'Succulents', price: 299, stock: 25, image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=200&q=80' },
    { id: 6, name: 'Fiddle Leaf Fig', description: 'Large glossy leaves.', category: 'Indoor Plants', price: 1299, stock: 5, image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=200&q=80' },
];

document.addEventListener('DOMContentLoaded', () => {
    const productModal = document.getElementById('productModal');
    if (!productModal) return;

    const form = document.getElementById('productForm');
    const title = document.getElementById('productModalTitle');
    const idField = document.getElementById('productId');
    const searchInput = document.getElementById('productSearchInput');

    renderProducts(products);
    if (searchInput) searchInput.addEventListener('input', filterProducts);

    window.openAddProductModal = function () {
        form.reset();
        idField.value = '';
        title.textContent = 'Add New Plant Product';
        productModal.classList.add('active');
    };

    window.openEditProductModal = function (id) {
        const product = products.find((p) => p.id === id);
        if (!product) return;

        title.textContent = 'Edit Plant Product';
        idField.value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productImage').value = product.image;
        document.getElementById('productDescription').value = product.description;

        productModal.classList.add('active');
    };

    window.closeProductModal = function () {
        productModal.classList.remove('active');
    };

    window.saveProduct = function (event) {
         event.preventDefault(); // Normally form submit karne par page reload ho sakta hai.

        const id = idField.value ? Number(idField.value) : null;
        const data = {
            name: document.getElementById('productName').value.trim(),
            price: Number(document.getElementById('productPrice').value),
            stock: Number(document.getElementById('productStock').value),
            category: document.getElementById('productCategory').value,
            image: document.getElementById('productImage').value.trim(),
            description: document.getElementById('productDescription').value.trim(),
        };

        if (id) {
            Object.assign(products.find((p) => p.id === id), data);
        } else {
            const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
            products.push({ id: newId, ...data });
        }

        renderProducts(products);
        window.closeProductModal();
        alert(id ? 'Product updated successfully.' : 'Product added successfully.');
    };

    window.deleteProduct = function (id) {
        if (!confirm('Are you sure you want to delete this product?')) return;
        products = products.filter((p) => p.id !== id);
        renderProducts(products);
        alert('Product deleted successfully.');
    };
});

function renderProducts(list) {
    const body = document.getElementById('productsTableBody');
    if (!body) return;

    if (list.length === 0) {
        body.innerHTML = `<tr class="empty-state"><td colspan="6">No products found.</td></tr>`;
        return;
    }

    body.innerHTML = list.map((p) => `
        <tr>
            <td><img src="${p.image}" alt="${p.name}" class="tbl-thumb" loading="lazy"></td>
            <td><strong>${p.name}</strong><br><small class="cell-caption">${p.description}</small></td>
            <td><span class="badge badge-confirmed">${p.category}</span></td>
            <td><strong>₹${p.price}</strong></td>
            <td><span class="badge ${p.stock <= 5 ? 'badge-low-stock' : 'badge-in-stock'}">${p.stock} units</span></td>
            <td>
                <button class="btn btn-sm btn-outline" onclick="openEditProductModal(${p.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct(${p.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function filterProducts() {
    const query = document.getElementById('productSearchInput').value.toLowerCase().trim();
    renderProducts(products.filter((p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    ));
}