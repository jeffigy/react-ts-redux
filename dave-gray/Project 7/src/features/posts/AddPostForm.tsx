import { useAppSelector } from "app/hooks";
import { useState } from "react";
import { useAddNewPostMutation } from "./postsSlice";
import { UsersType, selectAllUsers } from "features/users/usersSlice";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
  const [addNewPost, { isLoading }] = useAddNewPostMutation();
  const users = useAppSelector(selectAllUsers);
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const canSave = [title, body, userId].every(Boolean) && !isLoading;

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (canSave) {
      try {
        await addNewPost({ title, body, userId: Number(userId) }).unwrap();

        setTitle("");
        setBody("");
        setUserId("");
        navigate("/");
      } catch (error) {
        console.error("Failed to save the post", error);
      }
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
              onChange={(e) => setUserId(e.target.value)}
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
              Add Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPostForm;
