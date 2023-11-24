import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Flex, Text } from "@chakra-ui/react";
import { Post } from "./postSlice";
type PostsExcerptProps = {
  post: Post;
};

const PostsExcerpt: React.FC<PostsExcerptProps> = ({ post }) => {
  return (
    <Flex
      direction="column"
      border={"1px solid black"}
      borderRadius={"10px"}
      p={"10px"}
      mb={"10px"}
    >
      <Text fontSize={"18px"} fontWeight={"bold"}>
        {post.title}
      </Text>
      <Text fontSize={"14px"} fontWeight={"bold"}>
        <PostAuthor userId={post.userId} />
      </Text>
      <Text fontSize={"14px"} fontWeight={"bold"}>
        <TimeAgo timestamp={post.date} />
      </Text>
      <Text fontSize={"14px"} fontWeight={"bold"}>
        {post.body.substring(0, 100)}
      </Text>
      <ReactionButtons post={post} />
    </Flex>
  );
};
export default PostsExcerpt;
