
interface Product {
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    category: string;
    inStock: boolean;
}

// Array containing four products
const productList: Product[] = [
    {
        productId: 101,
        productName: "Wireless Keyboard",
        price: 1500,
        quantity: 10,
        category: "Electronics",
        inStock: true
    },
    {
        productId: 102,
        productName: "Wireless Mouse",
        price: 800,
        quantity: 15,
        category: "Electronics",
        inStock: true
    },
    {
        productId: 103,
        productName: "Notebook",
        price: 120,
        quantity: 0,
        category: "Stationery",
        inStock: false
    },
    {
        productId: 104,
        productName: "Water Bottle",
        price: 350,
        quantity: 8,
        category: "Accessories",
        inStock: true
    }
];

// Return products that are available in stock
function getAvailableProducts(products: Product[]): Product[] {
    return products.filter(
        (product) => product.inStock && product.quantity > 0
    );
}

// Extended interface
interface DiscountedProduct extends Product {
    discountPercentage: number;
}

// Apply discounts to products
function applyDiscountToProducts(
    products: DiscountedProduct[]
): DiscountedProduct[] {
    return products.map((product) => ({
        ...product,
        price: Number(
            (
                product.price -
                (product.price * product.discountPercentage / 100)
            ).toFixed(2)
        )
    }));
}

// Display available products
console.log("All products:");
console.log(productList);

console.log("Available products:");
console.log(getAvailableProducts(productList));

// Products with discounts
const discountedProducts: DiscountedProduct[] = [
    {
        ...productList[0],
        discountPercentage: 10
    },
    {
        ...productList[1],
        discountPercentage: 5
    }
];

console.log("Products after discount:");
console.log(applyDiscountToProducts(discountedProducts));

export {};