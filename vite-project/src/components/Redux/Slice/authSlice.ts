import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Role = "admin" | "salesperson" | "customer";

interface AuthState {
  role: Role | null;
}

const initialState: AuthState = {
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<Role>) => {
      state.role = action.payload;
    },

    clearRole: (state) => {
      state.role = null;
    },
  },
});

export const { setRole, clearRole } = authSlice.actions;

export default authSlice.reducer;