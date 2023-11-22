import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { pokemonApi } from "../services/pokemon";
import postReducer from "../features/posts/postSlice";
import userReducer from "../features/users/usersSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    posts: postReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
