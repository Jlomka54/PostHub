import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, password }, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/auth/register", {
        username,
        password,
      });

      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message:
          error.response?.data?.message || error.message || "Registration failed",
      });
    }
  },
);
