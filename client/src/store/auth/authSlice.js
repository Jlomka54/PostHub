import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./authOperations";
const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};

export const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user || action.payload.newUser;
      state.token = action.payload.token;
      state.status = action.payload.message;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload?.message || "Registration failed";
    });
  },
});

export default authslice.reducer;
