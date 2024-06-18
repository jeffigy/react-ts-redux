import Layout from "components/Layout";
import RequireAuth from "features/auth/RequireAuth";
import RootPage from "pages";
import Dashboard from "pages/Dashboard";
import LoginPage from "pages/Login";
import Users from "pages/Users";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RootPage />} />
        <Route path="login" element={<LoginPage />} />

        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
