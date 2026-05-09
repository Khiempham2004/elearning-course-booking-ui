import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../utils/Auth.js";

const ProtectedRoute = ({  roles }) => {
  const user = getUser();

  console.log('User:', user);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (roles && !roles.includes(user.role?.toLowerCase())) {
    return <Navigate to="/signin" replace />;
  }
  // console.log(user);

  return <Outlet />;
};

export default ProtectedRoute;
