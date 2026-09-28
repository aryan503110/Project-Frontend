import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./Slice/authSlice.ts";
import cartreducer from "./Slice/cartSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authreducer,
    cart: cartreducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
