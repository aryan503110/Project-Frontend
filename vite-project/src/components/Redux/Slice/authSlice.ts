import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Role = "admin" | "salesperson" | "customer";

interface AuthState {
  role: Role | null;
  userId: string | null;
}

const initialState: AuthState = {
  role: null,
  userId: null,
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

    clearRole: (state) => {
      state.role = null;
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
} = authSlice.actions;

export default authSlice.reducer;