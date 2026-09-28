import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Role = "admin" | "salesperson" | "customer";

interface AuthState {
  role: Role | null;
  userId: string | null;
  name: string | null;
  image: string | null;
}

const initialState: AuthState = {
  role: null,
  userId: null,
  name: null,
  image: null,
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

    setName: (state, action: PayloadAction<Role>) => {
      state.name = action.payload;
    },

    setImage: (state, action: PayloadAction<Role>) => {
      state.image = action.payload;
    },

    clearRole: (state) => {
      state.role = null;
    },

    clearImage: (state) => {
      state.image = null;
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
} = authSlice.actions;

export default authSlice.reducer;
