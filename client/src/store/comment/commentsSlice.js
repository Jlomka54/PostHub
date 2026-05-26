import { createSlice } from "@reduxjs/toolkit";
import { createComment } from "./commentOperations";

const initialState = {
  comments: [],
  isLoading: false,
  status: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
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
  },
});

export const { setComments, setLoading, setStatus } = commentsSlice.actions;
export default commentsSlice.reducer;
