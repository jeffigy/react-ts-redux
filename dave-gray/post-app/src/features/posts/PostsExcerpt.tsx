import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import Reactions from "./Reactions";
import { PostType } from "./postsSlice";
import { Link } from "react-router-dom";
type PostsExcerptProps = {
  post: PostType;
};

const PostsExcerpt: React.FC<PostsExcerptProps> = ({ post }) => {
  return (
    <Link to={`post/${post.id}`}>
      <div className="card card-bordered bg-slate-700" key={post.id}>
        <div className="card-body">
          <h3 className="text-xl font-bold">{post.title}</h3>
          <p>{post.body.substring(0, 75)}</p>
          <p className="font-thin">
            <PostAuthor userId={post.userId} />
            <TimeAgo timestamp={post.date} />
          </p>
          <Reactions post={post} />
        </div>
      </div>
    </Link>
  );
};
export default PostsExcerpt;
