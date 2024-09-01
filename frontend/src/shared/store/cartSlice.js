import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPurchase: {
    sessionId: "",
    userId: "",
    tickets: {
      NORMAL: { quantity: 0, unitPrice: 0 },
      DISCOUNTED: { quantity: 0, unitPrice: 0 },
    },
    status: "PENDING",
  },
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setSession(state, action) {
      // payload = sessionId
      const sessionId = action.payload;
      state.currentPurchase.sessionId = sessionId;
    },
    setUser(state, action) {
      // payload = userId
      const userId = action.payload;
      state.currentPurchase.userId = userId;
    },
    addItem(state, action) {
      // payload = type
      const type = action.payload;
      if (type === "NORMAL" || type === "DISCOUNTED") {
        state.currentPurchase.tickets[type].quantity = 1;
      }
    },
    deleteItem(state, action) {
      // payload = type
      const type = action.payload;
      if (type === "NORMAL" || type === "DISCOUNTED") {
        state.currentPurchase.tickets[type].quantity = 0;
      }
    },
    increaseItemQuantity(state, action) {
      // payload = type
      const type = action.payload;
      if (type === "NORMAL" || type === "DISCOUNTED") {
        state.currentPurchase.tickets[type].quantity += 1;
      }
    },
    decreaseItemQuantity(state, action) {
      // payload = type
      const type = action.payload;
      if (type === "NORMAL" || type === "DISCOUNTED") {
        if (state.currentPurchase.tickets[type].quantity > 0) {
          state.currentPurchase.tickets[type].number -= 1;
        }
        if (state.currentPurchase.tickets[type].quantity === 0) {
          cartSlice.caseReducers.deleteItem(state, action);
        }
      }
    },

    clearCart(state) {
      state.currentPurchase.tickets.NORMAL.quantity = 0;
      state.currentPurchase.tickets.DISCOUNTED.quantity = 0;
    },

    setLoading(state, action) {
      // payload = boolean
      state.loading = action.payload;
    },
    setError(state, action) {
      // payload = error message or null
      state.error = action.payload;
    },
  },
});

export const {
  setSession,
  setUser,
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
  setLoading,
  setError,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const getCurrentPurchase = (state) => state.cart.currentPurchase;
