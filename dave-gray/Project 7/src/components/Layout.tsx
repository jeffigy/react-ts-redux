import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      {" "}
      <Header />
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
