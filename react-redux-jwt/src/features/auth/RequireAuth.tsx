import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selecCurrenToken } from "./authSlice";

type RequireAuthProps = {};

const RequireAuth: React.FC<RequireAuthProps> = () => {
  const token = useAppSelector(selecCurrenToken);
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
