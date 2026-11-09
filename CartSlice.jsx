
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // Add a plant to the cart
    addItem: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({
          ...newItem,
          quantity: 1
        });
      }
    },

    // Remove a plant from the cart
    removeItem: (state, action) => {
      return state.filter(
        (item) => item.id !== action.payload
      );
    },

    // Update the quantity of a plant
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const existingItem = state.find(
        (item) => item.id === id
      );

      if (existingItem && quantity > 0) {
        existingItem.quantity = quantity;
      }
    }
  }
});

// Export actions
export const {
  addItem,
  removeItem,
  updateQuantity
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
