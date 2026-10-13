"use strict";
const products = [
    { id: 101, name: "Wireless Keyboard", category: "Electronics", price: 1499, quantity: 12 },
    { id: 102, name: "Wireless Mouse", category: "Electronics", price: 799, quantity: 18 },
    { id: 103, name: "Ceramic Coffee Mug", category: "Homeware", price: 349, quantity: 0 },
    { id: 104, name: "Canvas Notebook", category: "Stationery", price: 199, quantity: 25 }
];
let nextId = 105;
const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const stockFilter = document.getElementById("stockFilter");
const productForm = document.getElementById("productForm");
const formMessage = document.getElementById("formMessage");
const totalProducts = document.getElementById("totalProducts");
const totalUnits = document.getElementById("totalUnits");
const inventoryValue = document.getElementById("inventoryValue");
const listFooter = document.getElementById("listFooter");
function formatCurrency(amount) {
    return amount.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2
    });
}
function updateSummary() {
    totalProducts.textContent = String(products.length);
    const units = products.reduce((total, product) => total + product.quantity, 0);
    const value = products.reduce((total, product) => total + product.price * product.quantity, 0);
    totalUnits.textContent = String(units);
    inventoryValue.textContent = formatCurrency(value);
}
function renderProducts() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filter = stockFilter.value;
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm);
        const matchesStock = filter === "all" ||
            (filter === "available" && product.quantity > 0) ||
            (filter === "out" && product.quantity === 0);
        return matchesSearch && matchesStock;
    });
    productList.replaceChildren();
    if (filteredProducts.length === 0) {
        const emptyMessage = document.createElement("div");
        emptyMessage.className = "empty-state";
        emptyMessage.textContent = "No products found. Try another search or add a product.";
        productList.appendChild(emptyMessage);
    }
    filteredProducts.forEach((product) => {
        const row = document.createElement("article");
        row.className = "product-row";
        const nameCell = document.createElement("div");
        const name = document.createElement("div");
        name.className = "product-name";
        name.textContent = product.name;
        const category = document.createElement("div");
        category.className = "product-category";
        category.textContent = product.category;
        nameCell.append(name, category);
        const priceCell = document.createElement("div");
        priceCell.className = "price-cell";
        const priceLabel = document.createElement("span");
        priceLabel.className = "cell-label";
        priceLabel.textContent = "PRICE";
        const priceValue = document.createElement("span");
        priceValue.className = "cell-value";
        priceValue.textContent = formatCurrency(product.price);
        priceCell.append(priceLabel, priceValue);
        const quantityCell = document.createElement("div");
        quantityCell.className = "quantity-cell";
        const quantityLabel = document.createElement("span");
        quantityLabel.className = "cell-label";
        quantityLabel.textContent = "QUANTITY";
        const quantityValue = document.createElement("span");
        quantityValue.className = "cell-value";
        quantityValue.textContent = String(product.quantity);
        quantityCell.append(quantityLabel, quantityValue);
        const stockCell = document.createElement("div");
        stockCell.className = "stock-cell";
        const stockLabel = document.createElement("span");
        stockLabel.className = "cell-label";
        stockLabel.textContent = "STATUS";
        const stockBadge = document.createElement("span");
        stockBadge.className = product.quantity > 0
            ? "stock-badge available"
            : "stock-badge out";
        stockBadge.textContent = product.quantity > 0
            ? "In stock"
            : "Out of stock";
        stockCell.append(stockLabel, stockBadge);
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.type = "button";
        deleteButton.textContent = "×";
        deleteButton.setAttribute("aria-label", `Remove ${product.name}`);
        deleteButton.addEventListener("click", () => {
            const index = products.findIndex((item) => item.id === product.id);
            if (index !== -1) {
                products.splice(index, 1);
                updateSummary();
                renderProducts();
                formMessage.textContent = `${product.name} was removed.`;
            }
        });
        row.append(nameCell, priceCell, quantityCell, stockCell, deleteButton);
        productList.appendChild(row);
    });
    listFooter.textContent =
        `Showing ${filteredProducts.length} of ${products.length} products`;
}
searchInput.addEventListener("input", renderProducts);
stockFilter.addEventListener("change", renderProducts);
productForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameInput = document.getElementById("productName");
    const categoryInput = document.getElementById("productCategory");
    const priceInput = document.getElementById("productPrice");
    const quantityInput = document.getElementById("productQuantity");
    const name = nameInput.value.trim();
    const category = categoryInput.value.trim();
    const price = Number(priceInput.value);
    const quantity = Number(quantityInput.value);
    if (!name ||
        !category ||
        price <= 0 ||
        !Number.isFinite(price) ||
        !Number.isInteger(quantity) ||
        quantity < 0) {
        formMessage.textContent =
            "Please enter a valid name, category, price, and quantity.";
        return;
    }
    products.push({
        id: nextId++,
        name,
        category,
        price,
        quantity
    });
    updateSummary();
    renderProducts();
    productForm.reset();
    formMessage.textContent = `${name} was added successfully.`;
});
updateSummary();
renderProducts();
