import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  Post,
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPosts,
} from "./postSlice";
import { Flex, Text } from "@chakra-ui/react";
import PostsExcerpt from "./PostsExcerpt";

type PostListProps = {};

const PostList: React.FC<PostListProps> = () => {
  const posts = useAppSelector(selectAllPosts);
  const postsStatus = useAppSelector(getPostsStatus);
  const error = useAppSelector(getPostsError);
  const dispatch = useAppDispatch();

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, []);

  return (
    <Flex direction="column">
      <Text fontSize={"24px"} mx={"auto"} mb={"10px"} fontWeight={"black"}>
        Posts
      </Text>

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
