import { useAppSelector } from "app/hooks";
import {
  PostType,
  selectAllPosts,
  getPostsError,
  getPostsStatus,
} from "./postsSlice";

import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  const posts = useAppSelector(selectAllPosts);
  const postStatus = useAppSelector(getPostsStatus);
  const error = useAppSelector(getPostsError);

  let content;
  if (postStatus === "loading") {
    content = <span className="loading loading-ring loading-lg"></span>;
  }

  if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a: PostType, b: PostType) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post: PostType) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  }

  if (postStatus === "failed") {
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
        <span>{error}</span>
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
