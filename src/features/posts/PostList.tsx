import React from "react";
import { useSelector } from "react-redux";
import { Post, selectAllPosts } from "./postSlice";
import { Flex, Text } from "@chakra-ui/react";

type PostListProps = {};

const PostList: React.FC<PostListProps> = () => {
  const posts = useSelector(selectAllPosts);
  return (
    <Flex direction="column">
      <Text fontSize={"24px"} mx={"auto"} mb={"10px"} fontWeight={"black"}>
        Posts
      </Text>
      {posts.map((post: Post) => (
        <Flex
          direction={"column"}
          p={"5px"}
          mb={"10px"}
          key={post.id}
          border={"1px solid black"}
          borderRadius={"10px"}
        >
          <Text fontSize={"20px"} mb={"5px"} fontWeight={"bold"}>
            {post.title}
          </Text>
          <p className="post-content">{post.content.substring(0, 100)}</p>
        </Flex>
      ))}
    </Flex>
  );
};

export default PostList;
