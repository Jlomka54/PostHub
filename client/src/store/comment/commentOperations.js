import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (postId, comment, { rejectWithValue }) => {
    try {
      const data = await axiosInstance.post(`/comment/${postId}`, {
        postId,
        comment,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
