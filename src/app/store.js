import { configureStore } from "@reduxjs/toolkit";
import stopSearchReducer from "../features/stopSearch/stopSearchSlice";

export const store = configureStore({
  reducer: {
    stopSearch: stopSearchReducer,
  },
});
