import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  salespersonstockid: string;
  salespersonid: string;
  productid: string;
  name: string;
  image: string;
  quantity: number;
  sellingprice: number;
  availableStock: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.salespersonstockid === action.payload.salespersonstockid,
      );

      if (existingItem) {
        if (
          existingItem.quantity + action.payload.quantity <=
          existingItem.availableStock
        ) {
          existingItem.quantity += action.payload.quantity;
        }

        return;
      }

      state.items.push(action.payload);
    },

    increaseQuantity: (
      state,
      action: PayloadAction<{ salespersonstockid: string }>,
    ) => {
      const selectedProduct = state.items.find(
        (item) => item.salespersonstockid === action.payload.salespersonstockid,
      );

      if (selectedProduct) {
        if (selectedProduct.quantity < selectedProduct.availableStock) {
          selectedProduct.quantity += 1;
        }
      }
    },

    decreaseQuantity: (
      state,
      action: PayloadAction<{ salespersonstockid: string }>,
    ) => {
      const selectedProduct = state.items.find(
        (item) => item.salespersonstockid === action.payload.salespersonstockid,
      );

      if (selectedProduct) {
        selectedProduct.quantity -= 1;

        if (selectedProduct.quantity <= 0) {
          state.items = state.items.filter(
            (item) =>
              item.salespersonstockid !== action.payload.salespersonstockid,
          );
        }
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ salespersonstockid: string }>,
    ) => {
      state.items = state.items.filter(
        (item) => item.salespersonstockid !== action.payload.salespersonstockid,
      );
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
