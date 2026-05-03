import { createSlice } from "@reduxjs/toolkit";
import { createPost, getAllPosts, getPostById } from "./PostOperations.js";

const initialState = {
  posts: [],
  isLoading: false,
  popularPosts: [],
  currentPost: null,
};

export const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts.push(action.payload);
    });
    builder.addCase(createPost.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getAllPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.posts;
      state.popularPosts = action.payload.popularPosts;
    });
    builder.addCase(getAllPosts.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getPostById.pending, (state) => {
      state.isLoading = true;
      state.currentPost = null;
    });
    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentPost = action.payload;
    });
    builder.addCase(getPostById.rejected, (state) => {
      state.isLoading = false;
      state.currentPost = null;
    });
  },
});

export default PostSlice.reducer;
