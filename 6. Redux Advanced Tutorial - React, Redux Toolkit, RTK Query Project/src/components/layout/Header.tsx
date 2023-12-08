import { Button, Flex, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header = () => {
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
      </HStack>
    </Flex>
  );
};
export default Header;
