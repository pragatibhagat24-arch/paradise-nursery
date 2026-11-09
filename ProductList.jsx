
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

const products = [
  {
    id: 1,
    name: "Snake Plant",
    category: "Indoor",
    price: 299,
    description: "A beautiful, low-maintenance indoor plant.",
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=500"
  },
  {
    id: 2,
    name: "Peace Lily",
    category: "Indoor",
    price: 399,
    description: "An elegant plant with beautiful white flowers.",
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=500"
  },
  {
    id: 3,
    name: "Aloe Vera",
    category: "Succulents",
    price: 249,
    description: "A popular succulent that is easy to care for.",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=500"
  },
  {
    id: 4,
    name: "Jade Plant",
    category: "Succulents",
    price: 199,
    description: "A lovely succulent for your home or office.",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=500"
  },
  {
    id: 5,
    name: "Areca Palm",
    category: "Outdoor",
    price: 499,
    description: "A tropical palm that adds greenery to any space.",
    image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=500"
  },
  {
    id: 6,
    name: "Money Plant",
    category: "Indoor",
    price: 179,
    description: "A popular climbing plant for home decoration.",
    image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=500"
  },
  {
    id: 7,
    name: "Rose Plant",
    category: "Flowering",
    price: 349,
    description: "A colourful flowering plant for your garden.",
    image: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=500"
  },
  {
    id: 8,
    name: "Orchid",
    category: "Flowering",
    price: 599,
    description: "A graceful flowering plant with stunning blooms.",
    image: "https://images.unsplash.com/photo-1566907225472-514a2f7b5a3e?w=500"
  }
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart || []);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "All",
    "Indoor",
    "Outdoor",
    "Succulents",
    "Flowering"
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Paradise Nursery</h1>
        <p>Bring Nature Home!</p>
        <div style={styles.cartCount}>
          🛒 Cart Items: {cartCount}
        </div>
      </header>

      <h2 style={styles.heading}>Our Beautiful Plants</h2>

      <input
        type="text"
        placeholder="Search for plants..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.search}
      />

      <div style={styles.categories}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              ...styles.categoryButton,
              backgroundColor:
                selectedCategory === category ? "#2e7d32" : "#e8f5e9",
              color:
                selectedCategory === category ? "white" : "#245b28"
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div style={styles.productGrid}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={styles.card}>
            <img
              src={product.image}
              alt={product.name}
              style={styles.image}
            />

            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <h3>₹{product.price}</h3>

            <button
              onClick={() => handleAddToCart(product)}
              disabled={isInCart(product.id)}
              style={{
                ...styles.addButton,
                backgroundColor: isInCart(product.id)
                  ? "#999"
                  : "#2e7d32",
                cursor: isInCart(product.id)
                  ? "not-allowed"
                  : "pointer"
              }}
            >
              {isInCart(product.id) ? "Added to Cart" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p style={styles.emptyMessage}>No plants found.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "25px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5faf4",
    minHeight: "100vh"
  },
  header: {
    backgroundColor: "#1b5e20",
    color: "white",
    padding: "25px",
    textAlign: "center",
    borderRadius: "10px"
  },
  cartCount: {
    marginTop: "12px",
    fontWeight: "bold"
  },
  heading: {
    textAlign: "center",
    color: "#245b28",
    marginTop: "30px"
  },
  search: {
    display: "block",
    width: "80%",
    maxWidth: "450px",
    padding: "12px",
    margin: "20px auto",
    borderRadius: "8px",
    border: "1px solid #aaa"
  },
  categories: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "25px"
  },
  categoryButton: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer"
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "22px"
  },
  card: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px"
  },
  addButton: {
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "6px",
    marginTop: "10px"
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: "30px"
  }
};

export default ProductList;
