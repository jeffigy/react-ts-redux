import { useAppSelector } from "app/hooks";
import { selectCurrentToken } from "./authSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const token = useAppSelector(selectCurrentToken);
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
