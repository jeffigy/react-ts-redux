import { useAppSelector } from "app/hooks";
import PostAuthor from "./PostAuthor";
import Reactions from "./Reactions";
import TimeAgo from "./TimeAgo";
import { selectPostById } from "./postsSlice";
import { Link, useParams } from "react-router-dom";
import PostNotFound from "./PostNotFound";

const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useAppSelector((state) => selectPostById(state, postId!));

  if (!post) {
    return <PostNotFound />;
  }
  return (
    <div className="card card-bordered bg-slate-700" key={post.id}>
      <div className="card-body">
        <div className="flex space-x-4">
          {" "}
          <h3 className="card-title">{post.title}</h3>
          <Link to={`/post/edit/${post.id}`} className="btn btn-primary btn-sm">
            Edit
          </Link>
        </div>
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

export default SinglePostPage;
