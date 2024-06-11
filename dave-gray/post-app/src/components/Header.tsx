import { Link } from "react-router-dom";

const Header = () => {
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
      </div>
    </div>
  );
};

export default Header;
