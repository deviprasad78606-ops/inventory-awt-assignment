
interface DiscountItem {
    productName: string;
    price: number;
}

// Calculate discount (default is 10%)
function calculateDiscount(
    price: number,
    discountPercentage: number = 10
): number {
    return price - (price * discountPercentage / 100);
}

// Apply discount to multiple products using map()
function applyBulkDiscount(
    products: DiscountItem[],
    discountPercentage: number = 10
): DiscountItem[] {
    return products.map((product) => ({
        ...product,
        price: calculateDiscount(product.price, discountPercentage)
    }));
}

// Sample products
const products: DiscountItem[] = [
    { productName: "Keyboard", price: 1500 },
    { productName: "Mouse", price: 800 },
    { productName: "Monitor", price: 12000 }
];

console.log("Single product discount:");
console.log(calculateDiscount(1000)); // 900 after 10% discount

console.log("Bulk discount:");
console.log(applyBulkDiscount(products));

// Block scope demonstration using let
for (let i = 1; i <= 3; i++) {
    console.log("Loop number:", i);
}

// The variable i is block-scoped and cannot be used here.
