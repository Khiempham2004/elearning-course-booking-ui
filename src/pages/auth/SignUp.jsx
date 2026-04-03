import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faHome } from "@fortawesome/free-regular-svg-icons";

import element1 from "../../assets/Images/element-01.png";
import element2 from "../../assets/Images/element-02.png";
import element3 from "../../assets/Images/element-03.png";
import element4 from "../../assets/Images/element-04.png";
import element5 from "../../assets/Images/element-05.png";
import learningImage from "../../assets/Images/learning_image.png";
import { register } from "../../service/auth.service.js";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  // console.log("formData", formData);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitApi = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password khong khop!");
      return;
    }

    try {
      const res = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: formData.role || "student",
      });
      // console.log(res.data);

      alert("SingUp tạo tài khoản thành công!");
      navigate("/signin");
      console.log(res.data.newUser);
    } catch (error) {
      console.log(error);
      alert("SingUp tạo tài khoản thất bại!");
    }
  };
  return (
    <>
      <div className="section-banner bg-[#f3f9ff] h-[400px] py-[50px] lg:py-[90px] flex flex-col justify-center items-center relative">
        <h1 className="chakrapetch-font font-bold text-5xl lg:text-6xl mb-5 text-[#222e48]">
          Sign Up
        </h1>
        <ul className="flex items-center gap-2">
          <li className="cursor-pointer">
            <Link to="/">
              <FontAwesomeIcon icon={faHome} className="pr-1" />
              <span className="text-sm xl:text-md text-[#404a60]">Home</span>
            </Link>
          </li>
          /
          <li className="cursor-pointer">
            <Link to="/signup">
              <span className="text-sm xl:text-md text-[#f37739]">Sign Up</span>
            </Link>
          </li>
        </ul>

        {/* Decorative Shapes */}
        <img
          src={element1}
          alt="shape"
          className="absolute left-30 top-30 hidden md:block"
        />
        <img
          src={element2}
          alt="shape"
          className="absolute left-20 top-60 hidden md:block"
        />
        <img
          src={element3}
          alt="shape"
          className="absolute right-96 bottom-10 hidden lg:block"
        />
        <img
          src={element4}
          alt="shape"
          className="absolute right-30 bottom-30 hidden lg:block"
        />
        <img
          src={element5}
          alt="shape"
          className="absolute right-30 top-70 w-[20px] h-[20px] hidden sm:flex"
        />
        <img
          src={element5}
          alt="shape"
          className="absolute left-10 bottom-50 w-[25px] h-[25px] hidden sm:flex"
        />
      </div>

      {/* Sign Up Section */}
      <div className="px-[2%] lg:px-[12%] sm:px-[8%] py-[50px] lg:py-[80px] w-full flex flex-col lg:flex-row gap-10 justify-between items-center xl:gap-20 relative">
        {/* Form Section */}
        <div className="lg:w-1/2 w-full">
          <form
            onSubmit={handleSubmitApi}
            action=""
            method="post"
            className="w-full bg-[#f3f9ff] border border-[#ebecef] p-10 rounded-2xl shadow-sm"
          >
            <h2 className="text-[#222e48] text-2xl lg:text-4xl font-semibold pb-2">
              Create an Account
            </h2>
            <p className="text-[#404a60] text-sm lg:text-md">
              Fill in your details to join us
            </p>

            {/* Full Name */}
            <div className="mt-6 flex flex-col">
              <label className="text-[#404a60] font-medium pb-2 text-sm lg:text-md">
                Full Name
              </label>
              <input
                onChange={handleChange}
                // value={formData.name}
                type="text"
                name="name"
                placeholder="Enter your name..."
                required
                className="h-[45px] border border-[#ebecef] bg-white ps-4 rounded-lg outline-none focus:ring-2 focus:ring-[#076dcd]"
              />
            </div>

            {/* Email */}
            <div className="mt-5 flex flex-col">
              <label className="text-[#404a60] font-medium pb-2 text-sm lg:text-md">
                Email Address
              </label>
              <input
                onChange={handleChange}
                // value={formData.email}
                type="email"
                name="email"
                placeholder="Enter your email..."
                required
                className="h-[45px] border border-[#ebecef] bg-white ps-4 rounded-lg outline-none focus:ring-2 focus:ring-[#076dcd]"
              />
            </div>

            {/* Password */}
            <div className="mt-5 flex flex-col">
              <label className="text-[#404a60] font-medium pb-2 text-sm lg:text-md">
                Password
              </label>
              <input
                onChange={handleChange}
                // value={formData.password}
                type="password"
                name="password"
                placeholder="Enter your password..."
                required
                className="h-[45px] border border-[#ebecef] bg-white ps-4 rounded-lg outline-none focus:ring-2 focus:ring-[#076dcd]"
              />
            </div>

            {/* Confirm Password */}
            <div className="mt-5 flex flex-col">
              <label className="text-[#404a60] font-medium pb-2 text-sm lg:text-md">
                Confirm Password
              </label>
              <input
                onChange={handleChange}
                // value={formData.confirmPassword}
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password..."
                required
                className="h-[45px] border border-[#ebecef] bg-white ps-4 rounded-lg outline-none focus:ring-2 focus:ring-[#076dcd]"
              />
            </div>

            <div className="mt-5 flex flex-col">
              <label>Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="h-[45px] border border-[#ebecef] bg-white ps-4 rounded-lg"
              >
                <option value="">Chọn role</option>
                <option value="student">Student</option>
                <option value="admin">ADMIN</option>
              </select>
            </div>

            {/* Already have account */}
            <div className="flex justify-between items-center mt-3">
              <p className="text-[#404a60] text-sm">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-[#076dcd] font-medium hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>

            {/* Button */}
            <div className="mt-8">
              <button
                className="btn custom-btn bg-[#076dcd] hover:bg-black text-white px-6 py-3 rounded-full text-sm cursor-pointer transition-colors duration-300"
                type="submit"
              >
                Sign Up
                <i className="bi bi-arrow-up-right ps-2"></i>
              </button>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 w-full flex justify-center">
          <div className="learning-image bg-[#f3f9ff] rounded-full w-[300px] sm:w-[450px] lg:w-[550px] aspect-square p-6 flex items-center justify-center shadow-inner">
            <img
              src={learningImage}
              alt="learning"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
