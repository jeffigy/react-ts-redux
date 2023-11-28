import { Button, Flex, HStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  return (
    <Flex
      px={10}
      alignItems={"center"}
      justify={"space-between"}
      h={"56px"}
      bgColor={"teal"}
    >
      <h1>Redux blog</h1>
      <HStack>
        <Button as={Link} to={"/"}>
          Home
        </Button>
        <Button as={Link} to={"post"}>
          Post
        </Button>
      </HStack>
    </Flex>
  );
};
export default Header;
