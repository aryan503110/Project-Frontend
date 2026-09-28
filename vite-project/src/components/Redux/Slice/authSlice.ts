import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Role = "admin" | "salesperson" | "customer";

interface AuthState {
  role: Role | null;
  userId: string | null;
  name: string | null;
  image: string | null;
  isPremium: boolean;
}

const initialState: AuthState = {
  role: null,
  userId: null,
  name: null,
  image: null,
  isPremium: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<Role>) => {
      state.role = action.payload;
    },

    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },

    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    setImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },

    setIsPremium: (state, action: PayloadAction<boolean>) => {
      state.isPremium = action.payload;
    },

    clearRole: (state) => {
      state.role = null;
    },

    clearImage: (state) => {
      state.image = null;
    },

    clearIsPremium: (state) => {
      state.isPremium = false;
    },

    clearName: (state) => {
      state.name = null;
    },

    clearUserId: (state) => {
      state.userId = null;
    },
  },
});

export const {
  setRole,
  clearRole,
  setUserId,
  clearUserId,
  setName,
  setImage,
  clearImage,
  setIsPremium,
} = authSlice.actions;

export default authSlice.reducer;
