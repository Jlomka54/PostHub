import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";

export const createPost = createAsyncThunk(
  "post/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create post" },
      );
    }
  },
);

export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/posts");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch posts" },
      );
    }
  },
);

export const getPostById = createAsyncThunk(
  "post/getPostById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/posts/${id}`);
      return data.post;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch post" },
      );
    }
  },
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/posts/${id}`, id);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to delete post" },
      );
    }
  },
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (updated, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `/posts/${updated.get("id")}`,
        updated,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update post" },
      );
    }
  },
);
