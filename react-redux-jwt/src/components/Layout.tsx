import React from "react";
import { Outlet } from "react-router-dom";

type LayoutProps = {};

const Layout: React.FC<LayoutProps> = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
export default Layout;
