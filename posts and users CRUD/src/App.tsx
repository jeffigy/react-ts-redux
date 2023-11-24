import React from "react";

import { Flex } from "@chakra-ui/react";
import PostList from "./features/posts/PostList";
import AddPostForm from "./features/posts/AddPostForm";

type AppProps = {};

const App: React.FC<AppProps> = () => {
  return (
    <Flex
      direction={"column"}
      minH={"100vh"}
      bg={"teal"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <AddPostForm />
      <PostList />
    </Flex>
  );
};
export default App;
