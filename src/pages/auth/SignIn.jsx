import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import element1 from "../../assets/Images/element-01.png";
import element2 from "../../assets/Images/element-02.png";
import element3 from "../../assets/Images/element-03.png";
import element4 from "../../assets/Images/element-04.png";
import element5 from "../../assets/Images/element-05.png";

import { Navigate, useNavigate } from "react-router-dom";
import learningImage from "../../assets/Images/learning_image.png";
import { Link } from "react-router-dom";
import { faHome } from "@fortawesome/free-regular-svg-icons";
import { login } from "../../service/auth.service.js";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login({
        email: formData.email,
        password: formData.password,
      });
      console.log("Data login : ", res);

      const user = res.newUser; // axiosclient trả về trực tiếp

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      alert("SingIn thành công!");
    } catch (error) {
      console.log(error);
      alert("Email hoặc Password sai");
    }
  };

  return (
    <div>
      <div className="section-banner bg-[#f3f9ff] h-100 py-12.5 lg:py-22.5 flex flex-col justify-center items-center relative">
        <h1 className="chakrapetch-font font-bold text-5xl lg:text-6xl mb-5 text-[#222e48]">
          Sign In
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
            <Link to="SignIn">
              <span className="text-sm xl:text-md text-[#f37739]">Sign In</span>
            </Link>
          </li>
        </ul>

        <img
          src={element1}
          alt="shape-image"
          className="element1  shape1 absolute left-30 top-30 object-contain hidden md:block"
        />
        <img
          src={element2}
          alt="shape-image"
          className="element2  shape2 absolute left-20 top-60 object-contain hidden md:block"
        />
        <img
          src={element3}
          alt="shape-image"
          className="element3  shape3 absolute right-96 bottom-10 z-2 object-contain hidden lg:block"
        />
        <img
          src={element4}
          alt="shape-image"
          className="element4  shape4 absolute right-30 bottom-30 z-2 object-contain hidden lg:block"
        />
        <img
          src={element5}
          alt="shape-image"
          className="element5  shape5 absolute right-30 top-70 w-[20px] h-[20px] hidden sm:flex"
        />
        <img
          src={element5}
          alt="shape-image"
          className="element5  shape5 absolute left-10 bottom-50 w-[25px] h-[25px] hidden sm:flex"
        />
      </div>

      <div className="px-[2%] lg:px-[12%] sm:px-[8%] py-[50px] lg:py-[80px] w-full flex flex-col lg:flex-row gap-10 justify-between items-center xl:gap-20 relative">
        <div className="lg:w-1/2 w-full">
          <form
            onSubmit={handleSubmitLogin}
            action=""
            method="post"
            className="w-full bg-[#f3f9ff] border border-[#ebecef] p-10 rounded-2xl shadow-sm"
          >
            <h2 className="text-[#222e48] text-2xl lg:text-4xl font-semibold pb-2">
              Welcome Back
            </h2>
            <p className="text-[#404a60] text-sm lg:text-md">
              Sign in to your account and join us
            </p>

            <div className="mt-6 flex flex-col">
              <label className="text-[#404a60] font-medium pb-2 text-sm lg:text-md">
                Enter Email ID
              </label>
              <input
                name="email"
                onChange={handleChange}
                type="email"
                placeholder="Enter your email..."
                required
                className="h-[45px] border border-[#ebecef] bg-white ps-4 rounded-lg outline-none focus:ring-2 focus:ring-[#076dcd]"
              />
            </div>

            <div className="mt-5 flex flex-col">
              <label className="text-[#404a60] font-medium pb-2 text-sm lg:text-md">
                Enter Your Password
              </label>
              <input
                name="password"
                onChange={handleChange}
                type="password"
                placeholder="Enter your password..."
                required
                className="h-[45px] border border-[#ebecef] bg-white ps-4 rounded-lg outline-none focus:ring-2 focus:ring-[#076dcd]"
              />
            </div>

            {/* Forget + Signup */}
            <div className="flex justify-between items-center mt-3">
              <Link
                to=""
                className="text-[#ff9f29] text-sm hover:underline cursor-pointer"
              >
                Forget Password?
              </Link>
              <p className="text-[#404a60] text-sm">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-[#076dcd] font-medium hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>

            {/* Button */}
            <div className="mt-8">
              <button
                className="btn custom-btn bg-[#076dcd] hover:bg-black text-white px-6 py-3 rounded-full text-sm cursor-pointer transition-colors duration-300"
                type="submit"
              >
                Sign In
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
              alt="learning-image"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
