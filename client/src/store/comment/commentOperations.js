import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";

export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ postId, comment }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/comments/${postId}`, {
        postId,
        comment,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create comment" },
      );
    }
  },
);
