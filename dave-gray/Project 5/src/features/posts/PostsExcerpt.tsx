import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import Reactions from "./Reactions";
import { selectPostById } from "./postsSlice";
import { Link } from "react-router-dom";
import { useAppSelector } from "app/hooks";
type PostsExcerptProps = {
  postId: any;
};
//* Optimization Issue #2: When reactions are pressed on one of the post,
//* all post excerpts re-renders

//* Optimization Fix #2: normalization
// Normalization
// - Recommended in docs
// - No duplication of data
// - creates an ID lookup
const PostsExcerpt: React.FC<PostsExcerptProps> = ({ postId }) => {
  const post = useAppSelector((state) => selectPostById(state, postId));
  return (
    <div className="card card-bordered bg-slate-700" key={post.id}>
      <div className="card-body">
        <div className="space-x-4">
          <h3 className="text-xl font-bold">{post.title}</h3>
          <Link to={`post/${post.id}`} className="btn btn-secondary btn-sm">
            View
          </Link>
        </div>
        <p>{post.body.substring(0, 75)}</p>
        <p className="font-thin">
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>
        <Reactions post={post} />
      </div>
    </div>
  );
};
export default PostsExcerpt;
