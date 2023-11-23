import { configureStore } from "@reduxjs/toolkit";

// Creating a Redux store using `configureStore`
export const store = configureStore({
  // The `reducer` field is where you provide the root reducer for your application
  reducer: {},
});

// Defining the type for the RootState
export type RootState = ReturnType<typeof store.getState>;

// Defining the type for the AppDispatch
export type AppDispatch = typeof store.dispatch;
