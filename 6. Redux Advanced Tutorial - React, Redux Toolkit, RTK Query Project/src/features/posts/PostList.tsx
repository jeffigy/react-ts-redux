import { useAppSelector } from "../../app/hooks";
import { selectPostIds, useGetPostsQuery } from "./postSlice";
import { Flex } from "@chakra-ui/react";
import PostsExcerpt from "./PostsExcerpt";

const PostList = () => {
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery({});
  const orderedPostIds = useAppSelector(selectPostIds);
  console.log("orderedPostIds", orderedPostIds);
  return (
    <Flex direction="column" p={5}>
      {isLoading && <div>Loading...</div>}
      {isSuccess && (
        <div>
          {orderedPostIds.map((postId) => (
            <PostsExcerpt key={postId} postId={Number(postId)} />
          ))}
        </div>
      )}
      {isError && <div>{error.toString()}</div>}
    </Flex>
  );
};

export default PostList;
