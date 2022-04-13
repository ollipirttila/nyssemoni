import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import stopSearchReducer from "../features/stopSearch/stopSearchSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    stopSearch: stopSearchReducer,
  },
});
