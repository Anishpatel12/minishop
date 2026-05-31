// src/data/products.js

const defaultProducts = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 2999,
    category: "Electronics",
    brand: "MiniStore",
    description:
      "Premium wireless headphones.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    ],
  },

  {
    id: 2,
    title: "iPhone 15 Pro Max",
    price: 149999,
    category: "Smartphones",
    brand: "Apple",
    description:
      "Premium Apple flagship smartphone.",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    id: 3,
    title: "Samsung Galaxy S24 Ultra",
    price: 129999,
    category: "Smartphones",
    brand: "Samsung",
    description:
      "Samsung flagship with AI camera.",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    id: 4,
    title: "Sony WH-1000XM5",
    price: 29999,
    category: "Audio",
    brand: "Sony",
    description:
      "Industry-leading noise cancellation headphones.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    ],
  },

  {
    id: 5,
    title: "MacBook Pro M3",
    price: 219999,
    category: "Laptops",
    brand: "Apple",
    description:
      "Powerful laptop for creators and developers.",
    images: [
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
    ],
  },

  {
    id: 6,
    title: "Dell XPS 15",
    price: 179999,
    category: "Laptops",
    brand: "Dell",
    description:
      "Premium Windows ultrabook.",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    ],
  },

  {
    id: 7,
    title: "Gaming Keyboard RGB",
    price: 5999,
    category: "Gaming",
    brand: "Logitech",
    description:
      "Mechanical RGB gaming keyboard.",
    images: [
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
    ],
  },

  {
    id: 8,
    title: "Gaming Mouse Pro",
    price: 3999,
    category: "Gaming",
    brand: "Razer",
    description:
      "Ultra-fast gaming mouse.",
    images: [
      "https://images.unsplash.com/photo-1527814050087-3793815479db",
    ],
  },

  {
    id: 9,
    title: "Apple Watch Ultra",
    price: 89999,
    category: "Wearables",
    brand: "Apple",
    description:
      "Premium rugged smartwatch.",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    ],
  },

  {
    id: 10,
    title: "Boat Rockerz 550",
    price: 2499,
    category: "Audio",
    brand: "Boat",
    description:
      "Affordable wireless headphones.",
    images: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944",
    ],
  },

  {
    id: 11,
    title: "JBL Flip 6",
    price: 8999,
    category: "Audio",
    brand: "JBL",
    description:
      "Portable bluetooth speaker.",
    images: [
      "https://images.unsplash.com/photo-1585386959984-a41552231658",
    ],
  },

  {
    id: 12,
    title: "Nike Air Max",
    price: 7999,
    category: "Shoes",
    brand: "Nike",
    description:
      "Comfortable running shoes.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    ],
  },

  {
    id: 13,
    title: "Adidas Hoodie",
    price: 3499,
    category: "Fashion",
    brand: "Adidas",
    description:
      "Premium cotton hoodie.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    ],
  },

  {
    id: 14,
    title: "Canon DSLR Camera",
    price: 65999,
    category: "Cameras",
    brand: "Canon",
    description:
      "Professional DSLR camera.",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    ],
  },

  {
    id: 15,
    title: "PlayStation 5",
    price: 54999,
    category: "Gaming",
    brand: "Sony",
    description:
      "Next-gen gaming console.",
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
    ],
  },

  {
    id: 16,
    title: "Xbox Series X",
    price: 52999,
    category: "Gaming",
    brand: "Microsoft",
    description:
      "Powerful Xbox gaming console.",
    images: [
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d",
    ],
  },
];

// AUTO GENERATE MORE PRODUCTS
for (let i = 17; i <= 100; i++) {
  defaultProducts.push({
    id: i,

    title: `Premium Product ${i}`,

    price:
      Math.floor(
        Math.random() * 90000
      ) + 1000,

    category: [
      "Electronics",
      "Fashion",
      "Gaming",
      "Audio",
      "Laptops",
    ][
      Math.floor(
        Math.random() * 5
      )
    ],

    brand: [
      "Apple",
      "Samsung",
      "Sony",
      "Nike",
      "Adidas",
    ][
      Math.floor(
        Math.random() * 5
      )
    ],

    description:
      "High quality premium product with modern design.",

    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    ],
  });
}

// ADMIN PRODUCTS
const adminProducts =
  JSON.parse(
    localStorage.getItem(
      "products"
    )
  ) || [];

// MERGE
const products = [
  ...defaultProducts,
  ...adminProducts,
];

export default products;