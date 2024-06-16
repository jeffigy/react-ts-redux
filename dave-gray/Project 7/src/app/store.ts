import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "features/api/apiSlice";

import usersReducer from "features/users/usersSlice";

export const store = configureStore({
  reducer: {
    // Mount the API slice reducer at the path specified by apiSlice.reducerPath (e.g., 'api')
    [apiSlice.reducerPath]: apiSlice.reducer,
    users: usersReducer,
  },
  // Add the apiSlice middleware to the default middleware
  middleware: (getDefualtMiddleware) =>
    getDefualtMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
