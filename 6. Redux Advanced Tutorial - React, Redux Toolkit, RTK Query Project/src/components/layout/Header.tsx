import { Button, Flex, HStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { increaseCount, getCount } from "../../features/posts/postSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(getCount);
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
        <Button as={Link} to={"user"}>
          User
        </Button>
        <Button onClick={() => dispatch(increaseCount())}>
          Count: {count}
        </Button>
      </HStack>
    </Flex>
  );
};
export default Header;
