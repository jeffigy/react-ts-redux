import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Card, CardBody, CardHeader, Flex, Text } from "@chakra-ui/react";
import { Post } from "./postSlice";
import { Link } from "react-router-dom";
type PostsExcerptProps = {
  post: Post;
};

const PostsExcerpt: React.FC<PostsExcerptProps> = ({ post }) => {
  return (
    <Card as={Link} to={`post/${post.id}`} direction="column" mb={"10px"}>
      <CardHeader as={Flex} justify={"center"}>
        <Text fontSize={"24px"} fontWeight={"bold"}>
          {post.title}
        </Text>
      </CardHeader>
      <CardBody>
        <Text fontSize={"14px"} fontWeight={"bold"}>
          {post.body.substring(0, 100)}
        </Text>
        <Text fontSize={"14px"} fontWeight={"bold"}>
          <PostAuthor userId={post.userId} />
        </Text>
        <Text fontSize={"14px"}>
          <TimeAgo timestamp={post.date} />
        </Text>

        <ReactionButtons post={post} />
      </CardBody>
    </Card>
  );
};
export default PostsExcerpt;
