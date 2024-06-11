import { useAppDispatch, useAppSelector } from "app/hooks";
import { getCount, increaseCount } from "features/posts/postsSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useAppDispatch();

  const count = useAppSelector(getCount);
  return (
    <div className="flex h-14 w-full items-center justify-between bg-neutral px-3">
      <h1>Redux Blog</h1>{" "}
      <div className="space-x-3">
        <Link to={"/"}>
          {" "}
          <button className="btn btn-sm">Home</button>
        </Link>
        <Link to={"post"}>
          <button className="btn btn-sm">Post</button>
        </Link>
        <Link to={"user"}>
          <button className="btn btn-sm">Users</button>
        </Link>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => dispatch(increaseCount())}
        >
          {count}
        </button>
      </div>
    </div>
  );
};

export default Header;
