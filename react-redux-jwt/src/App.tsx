import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Welcome from "./features/auth/Welcome";
import RequireAuth from "./features/auth/RequireAuth";
import Login from "./features/auth/Login";

type AppProps = {};

const App: React.FC<AppProps> = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public route */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* private route */}
        <Route element={<RequireAuth />}>
          <Route path="welocme" element={<Welcome />} />
        </Route>
      </Route>
    </Routes>
  );
};
export default App;
