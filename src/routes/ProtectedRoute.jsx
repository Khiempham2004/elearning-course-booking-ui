import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }
  console.log(user);
  
  return children;
};

export default ProtectedRoute;
