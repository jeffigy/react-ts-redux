import { Link } from "react-router-dom";

const RootPage = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-5xl font-bold">welcome to the site</h1>
      <Link to={"/login"} className="btn btn-primary">
        Go to auth
      </Link>
    </div>
  );
};

export default RootPage;
