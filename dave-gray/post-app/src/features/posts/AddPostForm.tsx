import { useAppDispatch, useAppSelector } from "app/hooks";

import { useState } from "react";
import { postAdded } from "./postsSlice";
import { UsersType, selectAllUsers } from "features/users/usersSlice";

const AddPostForm = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [userId, setUserId] = useState("");

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const onSubmit = (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (title && content) {
      dispatch(postAdded(title, content, userId));
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="card bg-neutral text-neutral-content">
      <div className="card-body items-center text-center">
        <form className="w-full max-w-md space-y-5">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Post Title</span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered bg-neutral w-full"
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
              <option disabled>Pick one</option>
              {users &&
                users.map((user: UsersType) => (
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
              className="textarea bg-neutral textarea-bordered"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
          <div className="card-actions justify-end">
            <button
              onClick={onSubmit}
              className="btn btn-primary btn-wide flex"
              type="submit"
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
