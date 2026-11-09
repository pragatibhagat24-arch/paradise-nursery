
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  updateQuantity
} from "./CartSlice";

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart || []
  );

  const handleIncrease = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1
      })
    );
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1
        })
      );
    }
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const styles = {
    container: {
      padding: "30px",
      backgroundColor: "#f5faf4",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif"
    },
    heading: {
      textAlign: "center",
      color: "#1b5e20",
      marginBottom: "30px"
    },
    cartCard: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      flexWrap: "wrap",
      backgroundColor: "white",
      padding: "20px",
      marginBottom: "20px",
      borderRadius: "12px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
    },
    image: {
      width: "130px",
      height: "130px",
      objectFit: "cover",
      borderRadius: "10px"
    },
    details: {
      flex: 1,
      minWidth: "150px"
    },
    quantityControls: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginTop: "12px"
    },
    quantityButton: {
      padding: "7px 13px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#2e7d32",
      color: "white",
      cursor: "pointer"
    },
    removeButton: {
      padding: "10px 15px",
      backgroundColor: "#d32f2f",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer"
    },
    summary: {
      backgroundColor: "white",
      padding: "25px",
      borderRadius: "12px",
      textAlign: "right",
      marginTop: "25px"
    },
    continueButton: {
      padding: "12px 22px",
      backgroundColor: "#2e7d32",
      color: "white",
      border: "none",
      borderRadius: "7px",
      cursor: "pointer",
      marginTop: "15px"
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        Paradise Nursery - Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <h2>Your cart is empty!</h2>
          <p>Explore our beautiful plants and add them to your cart.</p>

          <button
            style={styles.continueButton}
            onClick={onContinueShopping || (() =>
              alert("Continue shopping at Paradise Nursery!")
            )}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <h2>
            Your Cart ({totalItems} items)
          </h2>

          {cartItems.map((item) => (
            <div key={item.id} style={styles.cartCard}>
              <img
                src={item.image}
                alt={item.name}
                style={styles.image}
              />

              <div style={styles.details}>
                <h3>{item.name}</h3>

                <p>Price: ₹{item.price}</p>

                <p>
                  Subtotal: ₹
                  {item.price * item.quantity}
                </p>

                <div style={styles.quantityControls}>
                  <button
                    style={styles.quantityButton}
                    onClick={() => handleDecrease(item)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    style={styles.quantityButton}
                    onClick={() => handleIncrease(item)}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                style={styles.removeButton}
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <div style={styles.summary}>
            <h2>Order Summary</h2>

            <p>Total Items: {totalItems}</p>

            <h2>
              Total Amount: ₹{totalAmount}
            </h2>

            <button
              style={styles.continueButton}
              onClick={onContinueShopping || (() =>
                alert("Continue shopping at Paradise Nursery!")
              )}
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItem;
