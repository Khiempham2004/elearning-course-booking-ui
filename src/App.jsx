import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Index from "./pages/Index.jsx";
import About from "./pages/About.jsx";
import Blog from "./pages/Blog.jsx";
import Course from "./pages/course/Course.jsx";
import SignIn from "./pages/auth/SignIn.jsx";
import SignUp from "./pages/auth/SignUp.jsx";
import Schedule from "./pages/Schedule.jsx";
import Enrollment from "./pages/course/Enrollment.jsx";
import Contact from "./pages/Contact.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
const App = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <div className={isHome ? "home-page" : ""}>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student"
            element={
              <ProtectedRoute role="/student">
                {/* <StudentDashboard /> */}
              </ProtectedRoute>
            }
          />

          <Route path="/Courses" element={<Course />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/About" element={<About />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/enrollment" element={<Enrollment />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
