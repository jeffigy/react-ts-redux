import { useAppSelector } from "app/hooks";
import { selectCurrentToken, selectCurrentUser } from "features/auth/authSlice";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);

  const welcome = user ? `Welcome ${user}!` : "Welcome!";
  const tokenAbbr = `${token?.slice(0, 9)}...`;

  return (
    <section className="flex">
      <h1>{welcome}</h1>
      <p>Token: {tokenAbbr}</p>
      <Link to={"/users"}>Users</Link>
    </section>
  );
};

export default Dashboard;
