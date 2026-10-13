
interface Product {
    productName: string;
    price: number;
    inStock: boolean;
    tags: string[];
    productId: number | string;
}

// Sample product
const product: Product = {
    productName: "Wireless Keyboard",
    price: 1499,
    inStock: true,
    tags: ["Electronics", "Computer Accessories"],
    productId: "PROD101"
};

// Function to print product information
function printProductInfo(item: Product): void {
    console.log("Product Information");
    console.log("-------------------");
    console.log("Product Name:", item.productName);
    console.log("Price: ₹" + item.price);
    console.log("Available in Stock:", item.inStock);
    console.log("Tags:", item.tags.join(", "));
    console.log("Product ID:", item.productId);
}

// Example using any (less safe)
let flexibleValue: any = "Hello";
flexibleValue = 100;
flexibleValue = true;

// Safer alternative using a specific type
let safeValue: string | number | boolean = "Hello";
safeValue = 100;
safeValue = true;

// Display the values
printProductInfo(product);

console.log("Any example:", flexibleValue);
console.log("Typed alternative:", safeValue);

export {};