import React from "react";
import { useSelector } from "react-redux";
import { postState, selectAllPosts } from "./postSlice";

type PostListProps = {};

const PostList: React.FC<PostListProps> = () => {
  const posts = useSelector(selectAllPosts);
  return (
    <section>
      <h2>Posts</h2>
      {posts.map((post: postState) => (
        <article className="post-excerpt" key={post.id}>
          <h3>{post.title}</h3>
          <p className="post-content">{post.content.substring(0, 100)}</p>
        </article>
      ))}
    </section>
  );
};

export default PostList;
