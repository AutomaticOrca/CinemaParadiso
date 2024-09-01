import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPurchase: {
    sessionId: "session1",
    userId: "user1",
    originUnitPrice: "20",
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
    setTicketPrices(state) {
      state.currentPurchase.tickets.NORMAL.unitPrice =
        state.currentPurchase.originUnitPrice;
      state.currentPurchase.tickets.DISCOUNTED.unitPrice =
        state.currentPurchase.originUnitPrice - 2;
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
  setTicketPrices,
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
export const initializeCurrentPurchase = (sessionId, userId) => (dispatch) => {
  dispatch(setSession(sessionId));
  dispatch(setUser(userId));
  dispatch(setTicketPrices());
};
