import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { store } from "./app/store.ts";
import { fetchUsers } from "./features/users/usersSlice.ts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { fetchPosts } from "./features/posts/postSlice.ts";

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
