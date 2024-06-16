import {
  selectPostIds,
  useGetPostsQuery,
} from "./postsSlice";

import PostsExcerpt from "./PostsExcerpt";
import { useAppSelector } from "app/hooks";
export type ErrorType = {
  data: string;
  error: string;
  originalStatus: number;
  status: string;
};
const PostsList = () => {
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery();

  const orderedPostsIds = useAppSelector(selectPostIds);

  let content;
  if (isLoading) {
    content = <span className="loading loading-ring loading-lg"></span>;
  }

  if (isSuccess) {
    content = orderedPostsIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  }

  if (isError) {
    content = (
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{(error as ErrorType).status}</span>
      </div>
    );
  }
  return (
    <section className="flex flex-col space-y-7">
      <h2 className="text-2xl font-black">Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
