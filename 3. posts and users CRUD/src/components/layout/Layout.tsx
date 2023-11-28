import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Flex } from "@chakra-ui/react";

type LayoutProps = {};

const Layout: React.FC<LayoutProps> = () => {
  return (
    <Flex direction={"column"} minH={"100vh"}>
      <Header />
      <main>
        {" "}
        <Outlet />
      </main>
    </Flex>
  );
};
export default Layout;
