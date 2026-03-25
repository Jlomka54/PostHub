import { createSlice } from "@reduxjs/toolkit";
import { createPost } from "./PostOperations";

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
  },
});

export default PostSlice.reducer;
