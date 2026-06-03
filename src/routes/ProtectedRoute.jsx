import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../utils/Auth.js";

const ProtectedRoute = ({  roles }) => {
  const user = getUser();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (roles && !roles.includes(user.role?.toLowerCase())) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
