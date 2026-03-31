import { createSlice } from "@reduxjs/toolkit";
import { createPost, getAllPosts } from "./PostOperations.js";

const initialState = {
  posts: [],
  isLoading: false,
  popularPosts: [],
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
    builder.addCase(getAllPosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.popularPosts = action.payload.popularPosts;
    });
    builder.addCase(getAllPosts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default PostSlice.reducer;
