import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import postReducer from "./post/PostSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
});
