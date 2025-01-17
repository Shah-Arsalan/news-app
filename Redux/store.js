import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./newsSlice";
import authReducer from "./authenticationSlice";

export default configureStore({
  reducer: {
    news: newsReducer,
    auth: authReducer,
  },
});
