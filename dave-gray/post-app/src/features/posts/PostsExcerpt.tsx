import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import Reactions from "./Reactions";
import { PostType } from "./postsSlice";
type PostsExcerptProps = {
  post: PostType;
};

const PostsExcerpt: React.FC<PostsExcerptProps> = ({ post }) => {
  return (
    <div className="card card-bordered bg-slate-700" key={post.id}>
      <div className="card-body">
        <h3 className="text-xl font-bold">{post.title}</h3>
        <p>{post.body.substring(0, 100)}</p>
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
