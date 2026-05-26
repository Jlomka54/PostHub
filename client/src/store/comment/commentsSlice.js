import { createSlice } from "@reduxjs/toolkit";
import { createComment } from "./commentOperations";
import { getPostById } from "../post/PostOperations";

const initialState = {
  comments: [],
  isLoading: false,
  status: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments.push(action.payload);
    });
    builder.addCase(createComment.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getPostById.pending, (state) => {
      state.comments = [];
    });
    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.comments = (action.payload?.comments || []).filter(
        (comment) => typeof comment === "object",
      );
    });
    builder.addCase(getPostById.rejected, (state) => {
      state.comments = [];
    });
  },
});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
