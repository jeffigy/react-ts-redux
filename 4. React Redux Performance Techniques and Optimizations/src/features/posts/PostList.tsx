import React from "react";
import { useAppSelector } from "../../app/hooks";
import {
  Post,
  selectAllPosts,
  getPostsError,
  getPostsStatus,
} from "./postSlice";
import { Flex, Text } from "@chakra-ui/react";
import PostsExcerpt from "./PostsExcerpt";

type PostListProps = {};

const PostList: React.FC<PostListProps> = () => {
  const posts = useAppSelector(selectAllPosts);
  const postsStatus = useAppSelector(getPostsStatus);
  const error = useAppSelector(getPostsError);

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Flex direction="column" p={5}>
      {postsStatus === "loading" && <div>Loading...</div>}
      {postsStatus === "succeeded" && (
        <div>
          {orderedPosts.map((post: Post) => (
            <PostsExcerpt key={post.id} post={post} />
          ))}
        </div>
      )}
      {postsStatus === "failed" && <div>{error}</div>}
    </Flex>
  );
};

export default PostList;
