import React from "react";
import { useSelector } from "react-redux";
import { Post, selectAllPosts } from "./postSlice";
import { Flex, Text } from "@chakra-ui/react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

type PostListProps = {};

const PostList: React.FC<PostListProps> = () => {
  const posts = useSelector(selectAllPosts);

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  return (
    <Flex direction="column">
      <Text fontSize={"24px"} mx={"auto"} mb={"10px"} fontWeight={"black"}>
        Posts
      </Text>
      {orderedPosts.map((post: Post) => (
        <Flex
          minW={"200px"}
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
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
          <ReactionButtons post={post} />
        </Flex>
      ))}
    </Flex>
  );
};

export default PostList;
