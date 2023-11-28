import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectPostIds, getPostsError, getPostsStatus } from "./postSlice";
import { Flex } from "@chakra-ui/react";
import PostsExcerpt from "./PostsExcerpt";

type PostListProps = {};

const PostList: React.FC<PostListProps> = () => {
  const orderedPostIds = useAppSelector(selectPostIds);
  const postsStatus = useAppSelector(getPostsStatus);
  const error = useAppSelector(getPostsError);

  return (
    <Flex direction="column" p={5}>
      {postsStatus === "loading" && <div>Loading...</div>}
      {postsStatus === "succeeded" && (
        <div>
          {orderedPostIds.map((postId) => (
            <PostsExcerpt key={postId} postId={Number(postId)} />
          ))}
        </div>
      )}
      {postsStatus === "failed" && <div>{error}</div>}
    </Flex>
  );
};

export default PostList;
