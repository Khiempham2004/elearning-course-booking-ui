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
import AdminLayout from "./layouts/AdminLayout.jsx";
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import CourseManager from "./pages/Admin/CourseManager.jsx";
import EnrollmentManager from "./pages/Admin/EnrollmentManager.jsx";
import UserManager from "./pages/Admin/UserManager.jsx";
import ScheduleManager from "./pages/Admin/ScheduleManager.jsx";
import UserLayout from "./layouts/UserLayout.jsx";
import UserProfile from "./pages/User/UserProfile.jsx";
import UserCourse from "./pages/User/UserCourse.jsx";
import UserSettings from "./pages/User/UserSettings.jsx";
import UserDashboard from "./pages/User/UserDashboard.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import CourseDetail from "./pages/course/CourseDetail.jsx";

const App = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isAdminPage = location.pathname.startsWith("/admin");
  const isUserPage = location.pathname.startsWith('/user');


  return (
    <>
      <div className={isHome ? "home-page" : ""}>
        {!isAdminPage && !isUserPage && <Navbar />}
        <Routes>
          <Route path="/" element={<Index />} />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <AdminRoute roles={["admin", "teacher"]}>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path='course' element={<CourseManager />} />
            <Route path='enrollment' element={<EnrollmentManager />} />
            <Route path='schedule' element={<ScheduleManager />} />
            <Route path='user' element={<UserManager />} />
          </Route>

          {/* User */}
          <Route element={<ProtectedRoute roles={["user"]} />}>
            <Route path="/users" element={<UserLayout />}>
              <Route index element={<UserDashboard />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="my-courses" element={<UserCourse />} />
              <Route path="settings" element={<UserSettings />} />
            </Route>
          </Route>

          {/* Pages */}
          <Route path="/Courses" element={<Course />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/About" element={<About />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/enrollment/:  " element={<Enrollment />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {!isAdminPage && !isUserPage && <Footer />}
      </div>
    </>
  );
};

export default App;
