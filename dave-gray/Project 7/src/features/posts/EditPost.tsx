import { useAppSelector } from "app/hooks";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdatePostMutation,
  useDeletePostMutation,
  selectPostById,
} from "./postsSlice";
import { useSelector } from "react-redux";
import { UsersType, selectAllUsers } from "features/users/usersSlice";
import PostNotFound from "./PostNotFound";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const post = useAppSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  if (!post) {
    return <PostNotFound />;
  }
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [userId, setUserId] = useState<string>(post.userId.toString());

  const canSave = [title, body, userId].every(Boolean) && !isLoading;
  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (canSave) {
      try {
        updatePost({
          id: post.id,
          title,
          body,
          userId: Number(userId),
          date: post.date,
          reactions: post.reactions,
        }).unwrap();

        setTitle("");
        setBody("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (error) {
        console.error("failed to save post", error);
      }
    }
  };

  const onDelete = async () => {
    try {
      await deletePost({ id: post.id }).unwrap();

      setTitle("");
      setBody("");
      setUserId("");
      navigate("/");
    } catch (error) {
      console.log("faile to delete post", error);
    }
  };

  return (
    <div className="card bg-neutral text-neutral-content">
      <div className="card-body items-center text-center">
        <form className="w-full max-w-md space-y-5" onSubmit={onSubmit}>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Post Title</span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full bg-neutral"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Author</span>
            </div>
            <select
              value={userId}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setUserId(e.target.value)
              }
              className="select select-bordered bg-neutral"
            >
              <option value="" disabled>
                Pick one
              </option>
              {users.map((user: UsersType) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Content</span>
            </div>
            <textarea
              className="textarea textarea-bordered bg-neutral"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
          <div className="card-actions justify-end">
            <button
              type="submit"
              className="btn btn-primary btn-wide flex"
              disabled={!canSave}
            >
              Save Post
            </button>
            <button className="btn btn-error" onClick={onDelete}>
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
