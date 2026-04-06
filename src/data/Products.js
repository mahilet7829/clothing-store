export const products = [
  {
    id: 1,
    name: "Classic White Tee",
    price: 29.99,
    category: "T-Shirts",
    description: "Premium cotton classic white t-shirt. Perfect for everyday wear.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray"],
    inStock: true
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 79.99,
    category: "Pants",
    description: "Comfortable slim fit jeans with stretch fabric.",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Blue", "Black"],
    inStock: true
  },
  {
    id: 3,
    name: "Hooded Sweatshirt",
    price: 59.99,
    category: "Hoodies",
    description: "Cozy hoodie with front pocket and adjustable hood.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gray", "Navy", "Black"],
    inStock: true
  },
  {
    id: 4,
    name: "Summer Floral Dress",
    price: 49.99,
    category: "Dresses",
    description: "Light and flowy floral print dress perfect for summer.",
    image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=500",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Floral Blue", "Floral Pink"],
    inStock: true
  },
  {
    id: 5,
    name: "Leather Jacket",
    price: 199.99,
    category: "Outerwear",
    description: "Classic genuine leather jacket with zip closure.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac1?w=500",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown"],
    inStock: false
  },
  {
    id: 6,
    name: "Running Shoes",
    price: 89.99,
    category: "Footwear",
    description: "Lightweight running shoes with cushioned sole.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["White/Red", "Black/Blue"],
    inStock: true
  },
  {
    id: 7,
    name: "Wool Beanie",
    price: 19.99,
    category: "Accessories",
    description: "Warm wool beanie for cold weather.",
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500",
    sizes: ["One Size"],
    colors: ["Gray", "Navy", "Burgundy"],
    inStock: true
  },
  {
    id: 8,
    name: "Cashmere Scarf",
    price: 39.99,
    category: "Accessories",
    description: "Soft cashmere blend scarf.",
    image: "https://images.unsplash.com/photo-1520903928023-4d7b0b5f9b3c?w=500",
    sizes: ["One Size"],
    colors: ["Camel", "Gray", "Black"],
    inStock: true
  }
]

// Helper function to get product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id))
}

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category)
}

// Get all unique categories
export const getCategories = () => {
  return [...new Set(products.map(product => product.category))]
}