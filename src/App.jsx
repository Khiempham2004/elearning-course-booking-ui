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
import EnrollmentStatus from "./pages/User/EnrollmentStatus.jsx";
import TeacherLayout from "./layouts/TeacherLayout.jsx";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard.jsx";
import TeacherReports from "./pages/Teacher/TeacherReports.jsx";
import TeacherGrading from "./pages/Teacher/TeacherGrading.jsx";
import TeacherStudents from "./pages/Teacher/TeacherStudents.jsx";
import TeacherProfile from "./pages/Teacher/TeacherProfile.jsx";
import TeacherSettings from "./pages/Teacher/TeacherSettings.jsx";
import TeacherRoute from "./routes/TeacherRoute.jsx";
import UserMySchedules from "./pages/User/UserMySchedules.jsx";
import AdminProfile from "./pages/Admin/AdminProfile.jsx";
import AdminSetting from "./pages/Admin/AdminSetting.jsx";


const App = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isAdminPage = location.pathname.startsWith("/admin");
  const isTeacherPage = location.pathname.startsWith("/teacher")
  const isUserPage = location.pathname.startsWith('/users');

  return (
    <>
      <div className={isHome ? "home-page" : ""}>
        {!isAdminPage && !isTeacherPage && !isUserPage && <Navbar />}
        <Routes>
          <Route path="/" element={<Index />} />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <AdminRoute roles={["admin"]}>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path='course' element={<CourseManager />} />
            <Route path='enrollment' element={<EnrollmentManager />} />
            <Route path='schedule' element={<ScheduleManager />} />
            <Route path='user' element={<UserManager />} />
            <Route path='profile' element={<AdminProfile />} />
            <Route path='settings' element={<AdminSetting />} />
          </Route>

          {/* TEACHER */}
          <Route
            path="/teacher"
            element={
              <TeacherRoute roles={["teacher"]}>
                <TeacherLayout />
              </TeacherRoute>
            }
          >
            <Route index element={<TeacherDashboard />} />
            <Route path='reports' element={<TeacherReports />} />
            <Route path='grading' element={<TeacherGrading />} />
            <Route path='students' element={<TeacherStudents />} />
            <Route path='profile' element={<TeacherProfile />} />
            <Route path='settings' element={<TeacherSettings />} />
          </Route>

          {/* User */}
          <Route element={<ProtectedRoute roles={["user"]} />}>
            <Route path="/users" element={<UserLayout />}>
              <Route index element={<UserDashboard />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="my-course" element={<UserCourse />} />
              <Route path="enrollment-status" element={<EnrollmentStatus />} />
              <Route path="my-schedule" element={<UserMySchedules />} />
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
          <Route path="/enrollment" element={<Enrollment />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {!isAdminPage && !isTeacherPage && !isUserPage && <Footer />}
      </div >
    </>
  );
};

export default App;
