import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selecCurrenToken, selecCurrenttUser } from "./authSlice";
import { Link } from "react-router-dom";

const Welcome = () => {
  const user = useAppSelector(selecCurrenttUser);
  const token = useAppSelector(selecCurrenToken);
  console.log(user);
  console.log(token);
  const welcome = user ? `Welcome ${user}` : "Welcome";
  const tokenAbbr = `Token: ${token?.slice(0, 9)}...`;
  return (
    <section>
      <h1>{welcome}</h1>
      <p>Token: {tokenAbbr}</p>
      <p>
        <Link to="userslist">Go to users list</Link>
      </p>
    </section>
  );
};
export default Welcome;
