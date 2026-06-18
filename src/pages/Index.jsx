import React, { useEffect, useState } from "react";
import { BsCheckAll } from "react-icons/bs";
import element1 from "../../src/assets/Images/element-01.png";
import element2 from "../../src/assets/Images/element-02.png";
import element3 from "../../src/assets/Images/element-03.png";
import element4 from "../../src/assets/Images/element-04.png";
import element5 from "../../src/assets/Images/element-05.png";
import element6 from "../../src/assets/Images/element-06.png";

import about1 from "../../src/assets/Images/about-img1.png";
import about2 from "../../src/assets/Images/about-img2.png";
import user from "../../src/assets/Images/user.png";
import aboutimage from "../../src/assets/Images/about-image.jpg";

import whychoose from "../../src/assets/Images/why-choose-us-image.jpg";

import featureicon1 from "../../src/assets/Images/feature-icon1.png";
import featureicon2 from "../../src/assets/Images/feature-icon2.png";
import featureicon3 from "../../src/assets/Images/feature-icon3.png";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faMessage,
  faUserCircle,
} from "@fortawesome/free-regular-svg-icons";

import { Link } from "react-router-dom";

import article1 from "../../src/assets/Images/articles-01.jpg";
import article2 from "../../src/assets/Images/articles-02.jpg";
import article3 from "../../src/assets/Images/articles-03.jpg";
import { getAllCourse } from "../service/course.service";

const imageModules = import.meta.glob("../assets/Images/*", { eager: true });

const getLocalImage = (courseImage) => {
  if (!courseImage) return "";

  // ảnh upload từ server
  if (courseImage.startsWith("/uploads")) {
    return `http://localhost:5000${courseImage}`;
  }

  // ảnh local trong assets
  const filename = courseImage.split("/").pop();
  const key = Object.keys(imageModules).find(
    (k) => k.includes(filename)
  );
  return key ? imageModules[key].default : courseImage;
};
const getImageUrl = (imagePath) => {
  if (!imagePath) return "";

  // image upload tu server
  if (imagePath.startsWith("/uploads")) {
    return `http://localhost:3000${imagePath}`;
  };
  return getLocalImage(imagePath);
}

const Index = () => {
  const [courses, setCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(courses.map((c) => c.category))];

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await getAllCourse();
        setCourses(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourse();
  }, []);

  return (
    <div>
      <div className="hero flex justify-between items-center gap-10 w-full px-[2%] sm:px-[8%] lg:px-[12%] py-12.5 lg:py-22.5 min-h-screen pt-30 relative">
        <div className="hero-content text-center mx-auto w-full flex flex-col items-center relative z-10">
          <span className="text-[#076dcb] font-semibold chakrapetch-font">
            <i className="bi bi-book pe-2"></i>
            Your Future, Achieve Success
          </span>
          <h2 className="text-[#222e48] text-3xl sm:text-5xl lg:text-7xl leading-tight lg:leading-20 font-bold sora-font py-2 w-full xl:w-[75%]">
            Find Your <span className="text-[#18a54a]">Ideal</span>Course, Build{" "}
            <span className="text-[#e58209]">Skills</span>
          </h2>

          <p className="text-[#576070] w-full lg:w-[60%] pb-4 text-sm sm:text-md">
            We are dedicated to nurturing young minds, empowering them with
            knowledge, skills, and confidance to excel.
          </p>
          <div className="flex gap-3 flex-wrap">
            <button
              className="btn custom-btn bg-[#076dcb] hover:bg-black text-white px-5 py-3 rounded-full w-auto text-sm cursor-pointer transition-colors duration-300"
              type="submit"
            >
              Get Start Today
              <i className="bi bi-arrow-up-right ps-2"></i>
            </button>

            <button
              className="btn custom-btn text-[#076dcb] border border-[#076dcb] hover:bg-[#076dcb] hover:text-white px-5 py-3 rounded-full w-auto text-sm cursor-pointer transition-colors duration-300"
              type="submit"
            >
              Find Courses
              <i className="bi bi-arrow-up-right ps-2"></i>
            </button>
          </div>
        </div>

        <img
          src={element1}
          alt="shape-image"
          className="element1 hero-shape1 absolute left-30 top-30 object-contain hidden md:block"
        />
        <img
          src={element2}
          alt="shape-image"
          className="element2 hero-shape2 absolute left-20 top-60 object-contain hidden md:block"
        />
        <img
          src={element3}
          alt="shape-image"
          className="element3 hero-shape3 absolute right-96 bottom-10 z-2 object-contain hidden lg:block"
        />
        <img
          src={element4}
          alt="shape-image"
          className="element4 hero-shape4 absolute right-40 bottom-50 z-2 object-contain hidden lg:block"
        />
        <img
          src={element5}
          alt="shape-image"
          className="element5 hero-shape5 absolute right-30 top-70 w-[20px] h-[20px] hidden sm:flex"
        />
        <img
          src={element5}
          alt="shape-image"
          className="element5 hero-shape5 absolute left-10 bottom-50 w-[25px] h-[25px] hidden sm:flex"
        />
        <img
          src={element6}
          alt="shape-image"
          className="element6 hero-shape6 absolute right-50 top-20 w-[25px] hidden lg:flex"
        />
      </div>
      {/* About */}
      <div className="about flex lg:flex-row flex-col justify-between items-center gap-10 px-[2%] lg:px-[12%] sm:px-[8%] py-[50px] lg:py-[90px] relative">
        <div className="about-content flex flex-col lg:w-1/2 w-full">
          <span className="text-[#076dcb] font-semibold sora-font pb-1">
            <i className="bi bi-book pe-2"></i>
            About StudIQ
          </span>
          <h2 className="text-[#222e48] text-3xl md:text-5xl md:leading-13 sora-font font-semibold">
            The Place Where You Can Achieve
          </h2>
          <p className="text-[#576070] pt-3 pb-8 text-sm sm:text-shadow-md">
            Welcome to StudIQ, where learning knows no bounds. Whether you're a
            student, professional, or lifelong learner...
          </p>

          <ul className="flex flex-col gap-6 pb-10">
            <li className="flex gap-3 sm:flex-nowrap flex-wrap">
              <div className="bg-[#f3f9ff] rounded-[50%] min-w-[70px] min-h-[60px] flex justify-center p-4">
                <img
                  src={about1}
                  alt="about-image"
                  className="object-contain"
                />
              </div>
              <div>
                <h4 className="text-[#222e48] font-semibold text-xl sora-font">
                  Our Mission
                </h4>
                <p className="text-neutral-500 text-sm lg:text-md">
                  Driven by a team of dedicated educator, technologists, and
                  visionaries, we strive to create a supportive
                </p>
              </div>
            </li>
            <li className="flex gap-3 sm:flex-nowrap flex-wrap">
              <div className="bg-[#f3f9ff] rounded-[50%] min-w-[70px] min-h-[60px] flex justify-center p-4">
                <img
                  src={about2}
                  alt="about-image"
                  className="object-contain"
                />
              </div>
              <div>
                <h4 className="text-[#222e48] font-semibold text-xl sora-font">
                  Our Vision
                </h4>
                <p className="text-neutral-500 text-sm lg:text-md">
                  A Professional seeking to upskill, or a lifelong learner
                  exploring new horizons, we're here to accompany you every step
                  of the way.
                </p>
              </div>
            </li>
          </ul>

          <div className="border-t-2 border-dotted border-[#c1c4cc] pt-5 flex items-center gap-8">
            <button
              className="btn custom-btn bg-[#076dcd] hover:bg-black text-white px-5 py-3 rounded-full w-fit text-sm cursor-pointer transition-colors duration-300"
              type="submit"
            >
              Read More
              <i className="bi bi-arrow-up-right ps-2"></i>
            </button>

            <div className="about-user flex">
              <img src={user} className="w-10 h-10" alt="user-image" />
              <div className="ps-2">
                <span className="sora-font text-sm">MD Amdad Islam</span>
                <p className="text-[#576070] text-xs">CEO Of Company</p>
              </div>
            </div>
          </div>
        </div>
        <div className="about-image w-full lg:w-1/2 h-[550px] overflow-hidden group rounded-lg z-2">
          <img
            src={aboutimage}
            alt="about-user"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <img
          src={element1}
          alt="shape-image"
          className="element1 about-shape1 absolute left-10 top-30 object-contain sm:block hidden"
        />
        <img
          src={element6}
          alt="shape-image"
          className="element5 about-shape7 absolute right-10 bottom-10 object-contain lg:block hidden"
        />
        <img
          src={element5}
          alt="shape-image"
          className="element5 about-shape6 absolute left-10 bottom-50 w-[25px] h-[25px] sm:block hidden"
        />
        <img
          src={element5}
          alt="shape-image"
          className="element5 about-shape5 absolute right-30 top-70 w-[20px] h-[20px] sm:block hidden"
        />
      </div>
      {/* Features */}
      <div className="feature flex justify-center items-center flex-col gap-10 px-[2%] lg:px-[12%] sm:px-[8%] py-[90px] lg:py-[120px] relative">
        <div className="feature-content z-2 flex flex-col text-center w-full lg:w-[60%] xl:w-[50%]">
          <h2 className="text-[#222e48] text-2xl sm:text-3xl md:text-4xl md:leading-10 sora-font font-semibold">
            Explore 5,000+ Free Online Courses For Students
          </h2>
          <p className="text-[#576070] pt-3 pb-8 text-sm sm:text-md">
            Welcome to our diverse and dynamic course catalog. We're dedicated
            to providing you with access to high-quality education.
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          loop={true}
          breakpoints={{
            1399: {
              slidesPerView: 3,
            },
            1199: {
              slidesPerView: 2.5,
            },
            767: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            },
          }}
          className="feature-wrapper w-full"
        >
          <SwiperSlide>
            <div className="feature-item hover:bg-[#006dca] group flex justify-center items-start flex-col bg-white shadow-xl rounded-xl py-10 px-5 transition-all duration-300">
              <div className="feature-icon w-fit bg-white rounded-[50%] p-5">
                <img src={featureicon1} alt="feature-icon" />
              </div>
              <div className="feature-info pt-8">
                <h4 className="text-[#222e48] sora-font pb-2 text-xl font-semibold group-hover:text-white">
                  Language Learning
                </h4>
                <p className="text-[#576070] text-sm group-hover:text-white">
                  Courses teaching languages such as English, Spanish, Bangla
                  etc.
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="feature-item hover:bg-[#006dca] group flex justify-center items-start flex-col bg-white shadow-xl rounded-xl py-10 px-5 transition-all duration-300">
              <div className="feature-icon w-fit bg-white rounded-[50%] p-5">
                <img src={featureicon2} alt="feature-icon" />
              </div>
              <div className="feature-info pt-8">
                <h4 className="text-[#222e48] sora-font pb-2 text-xl font-semibold group-hover:text-white">
                  Creative Arts & Design
                </h4>
                <p className="text-[#576070] text-sm group-hover:text-white">
                  Courses on graphic design, digital art, photography, video ,
                  audio etc...
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="feature-item hover:bg-[#006dca] group flex justify-center items-start flex-col bg-white shadow-xl rounded-xl py-10 px-5 transition-all duration-300">
              <div className="feature-icon w-fit bg-white rounded-[50%] p-5">
                <img src={featureicon3} alt="feature-icon" />
              </div>
              <div className="feature-info pt-8">
                <h4 className="text-[#222e48] sora-font pb-2 text-xl font-semibold group-hover:text-white">
                  Health & Fitness
                </h4>
                <p className="text-[#576070] text-sm group-hover:text-white">
                  Courses On nutrition, fitness, traning, yoga, meditation,
                  youga to sent...
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="feature-item hover:bg-[#006dca] group flex justify-center items-start flex-col bg-white shadow-xl rounded-xl py-10 px-5 transition-all duration-300">
              <div className="feature-icon w-fit bg-white rounded-[50%] p-5">
                <img src={featureicon3} alt="feature-icon" />
              </div>
              <div className="feature-info pt-8">
                <h4 className="text-[#222e48] sora-font pb-2 text-xl font-semibold group-hover:text-white">
                  Health & Fitness
                </h4>
                <p className="text-[#576070] text-sm group-hover:text-white">
                  Courses On nutrition, fitness, traning, yoga,
                  meditation...youga to sent...
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <img
          src={element3}
          alt="shape"
          className="element3 hero-shape3 absolute right-96 bottom-10 z-2 object-contain hidden lg:block"
        />
        <img
          src={element5}
          alt="shape"
          className="element5 hero-shape3 absolute right-30 top-70 w-[20px] h-[20px] object-contain hidden sm:flex"
        />
        <img
          src={element5}
          alt="shape"
          className="element5 hero-shape3 absolute left-10 bottom-50 w-[25px] h-[25px] object-contain hidden sm:flex"
        />
        <img
          src={element6}
          alt="shape"
          className="element5 hero-shape3 absolute right-70 top-20  object-contain hidden lg:flex"
        />
      </div>
      {/* Our Achivements */}
      <div className="our-achievements grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8 px-[2%] lg:px-[12%] sm:px-[90px] lg:py-[120px] relative">
        <div className="achievements-item z-2 h-[250px] flex justify-center items-center flex-col p-5 text-center w-full bg-[#fdf6f3] border border-[#ebecef] rounded-2xl">
          <div className="achievements-icon text-[#f37739] bg-white w-[70px] min-h-[70px] flex justify-center items-center rounded-[50%] mx-auto text-3xl p-1 mb-8 shadow-lg">
            <i className="bi bi-people"></i>
          </div>
          <div className="achievements-info">
            <h2 className="text-[#222e48] text-3xl font-bold sora-font uppercase">
              1.4K
            </h2>
            <span className="text-[#404a60] text-sm lg:text-md">
              Successfully Trained
            </span>
          </div>
        </div>

        <div className="achievements-item z-2 h-[250px] flex justify-center items-center flex-col p-5 text-center w-full bg-[#f1f6fd] border border-[#ebecef] rounded-2xl">
          <div className="achievements-icon text-[#006dca] bg-white w-[70px] min-h-[70px] flex justify-center items-center rounded-[50%] mx-auto text-3xl p-1 mb-8 shadow-lg">
            <i className="bi bi-camera-video"></i>
          </div>
          <div className="achievements-info">
            <h2 className="text-[#222e48] text-3xl font-bold sora-font uppercase">
              2K
            </h2>
            <span className="text-[#404a60] text-sm lg:text-md">
              Courses Completed
            </span>
          </div>
        </div>

        <div className="achievements-item z-2 h-[250px] flex justify-center items-center flex-col p-5 text-center w-full bg-[#fdf6f3] border border-[#ebecef] rounded-2xl">
          <div className="achievements-icon text-[#f37739] bg-white w-[70px] min-h-[70px] flex justify-center items-center rounded-[50%] mx-auto text-3xl p-1 mb-8 shadow-lg">
            <i className="bi bi-hand-thumbs-up"></i>
          </div>
          <div className="achievements-info">
            <h2 className="text-[#222e48] text-3xl font-bold sora-font uppercase">
              2.5K
            </h2>
            <span className="text-[#404a60] text-sm lg:text-md">
              Satisfaction Completed
            </span>
          </div>
        </div>

        <div className="achievements-item z-2 h-[250px] flex justify-center items-center flex-col p-5 text-center w-full bg-[#f1f6fd] border border-[#ebecef] rounded-2xl">
          <div className="achievements-icon text-[#006dca] bg-white w-[70px] min-h-[70px] flex justify-center items-center rounded-[50%] mx-auto text-3xl p-1 mb-8 shadow-lg">
            <i className="bi bi-person"></i>
          </div>
          <div className="achievements-info">
            <h2 className="text-[#222e48] text-3xl font-bold sora-font uppercase">
              5K
            </h2>
            <span className="text-[#404a60] text-sm lg:text-md">
              Students Community
            </span>
          </div>
        </div>

        <img
          src={element5}
          alt="shape-image"
          className="element-5 hero-shape5 absolute right-30 top-70 w-5 h-5 hidden sm:flex"
        />
      </div>
      {/* Courses  */}
      <div className="courses px-[2%] lg:px-[12%] sm:px-[8%] py-22.5 lg:py-37.5 bg-[#f3f9ff] relative">
        <div className="flex justify-between items-center flex-col lg:flex-row w-full gap-3">
          <h2 className="text-[#222e48] text-2xl sm:text-3xl md:text-4xl font-medium lg:w-1/2">
            Explore 4,000+ Free Online Courses For Students
          </h2>
          <div className="lg:w-1/2 w-full">
            <p className="text-[#576070] text-sm pb-2">
              Welcome to our diverse and dynamic course catalog...
            </p>
            <Link to="/Courses">
              <button className="bg-[#076dcd] hover:bg-black text-white px-5 py-3 rounded-full text-sm transition-colors duration-300">
                See All Courses <i className="bi bi-arrow-up-right ps-2"></i>
              </button>
            </Link>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 my-8 bg-white p-5 rounded-xl shadow-xl">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-3 rounded-full text-sm font-medium transition cursor-pointer shadow-md ${activeCategory === category
                ? "bg-blue-600 text-white"
                : "bg-[#f3f9ff] text-[#404a60]"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.length > 0 ? (
            courses
              .filter(
                (course) =>
                  activeCategory === "All" ||
                  course.category === activeCategory
              )
              .map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group flex flex-col"
                >
                  <div className="relative overflow-hidden h-60">
                    <img
                      src={getImageUrl(course.courseImage)}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                      {course.category}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold text-[#222e48] mb-3 hover:text-[#076dcb] transition-colors line-clamp-2">
                      {course.title}
                    </h3>

                    <div className="flex justify-between items-center text-gray-600 text-sm mb-4">
                      <span className="flex items-center gap-2">
                        <i className="bi bi-camera-video"></i>
                        {course.lessons} Lessonsd
                      </span>

                      <span className="flex items-center gap-2">
                        <i className="bi bi-bar-chart"></i>
                        {course.level}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <i className="bi bi-star-fill text-yellow-400"></i>

                        <span className="font-medium">
                          {course.rating}
                        </span>

                        <span className="text-gray-500 text-sm">
                          ({course.reviews} Reviews)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 border-t border-dashed pt-4 mb-5">
                      <img
                        src={getImageUrl(course.instructorImage)}
                        alt={course.instructor}
                        className="w-12 h-12 rounded-full object-cover border"
                      />

                      <div>
                        <p className="text-sm text-gray-500">
                          Instructor
                        </p>

                        <h4 className="font-semibold text-[#222e48]">
                          {course.instructor}
                        </h4>
                      </div>
                    </div>

                    <div className="mt-auto flex justify-between items-center">
                      <h2 className="text-3xl font-bold text-[#f37739]">
                        ${course.price}
                      </h2>

                      <button className="bg-[#076dcb] hover:bg-black text-white px-5 py-2 rounded-full text-sm transition-all duration-300">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              No course available
            </p>
          )}
        </div>

        <img
          src={element1}
          alt="shape-image"
          className="element1 hero-shape1 absolute left-30 top-30 object-contain hidden lg:block"
        />
        <img
          src={element2}
          alt="shape-image"
          className="element2 hero-shape2 absolute left-20 top-60 object-contain hidden lg:block"
        />
        <img
          src={element3}
          alt="shape-image"
          className="element3 hero-shape3 absolute right-96 bottom-10 z-2 object-contain hidden lg:block"
        />
        <img
          src={element4}
          alt="shape-image"
          className="element3 hero-shape4 absolute right-40 bottom-50 z-2 object-contain hidden lg:block"
        />
        <img
          src={element5}
          alt="shape-image"
          className="element5 hero-shape5 absolute right-30 top-70   object-contain hidden sm:flex"
        />
        <img
          src={element5}
          alt="shape-image"
          className="element5 hero-shape6 absolute left-10 bottom-50 w-6.25 h-6.25 object-contain hidden sm:flex"
        />
        <img
          src={element6}
          alt="shape-image"
          className="element5 hero-shape7 absolute right-50 top-20 hidden lg:flex"
        />
      </div>
      {/* Why Choose Us */}
      <div className="why-choose-us flex lg:flex-row flex-col justify-between items-center gap-10 px-[2%] lg:px-[12%] sm:px-[8%] py-[50px] lg:py-[90px] relative">
        {/* Image (Left Side) */}
        <div className="why-choose-us-image w-full lg:w-1/2 h-125 overflow-hidden group rounded-lg">
          <img
            src={whychoose}
            alt="why-choose-us"
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content (Right Side) */}
        <div className="flex flex-col lg:w-1/2 w-full">
          <span className="text-[#076dcb] font-semibold sora-font pb-1">
            <i className="bi bi-book pe-2"></i>
            Why Choose Us
          </span>
          <h2 className="text-[#222e48] text-3xl md:text-4xl md:leading-13 sora-font font-semibold">
            Our Commitment to Excellence, Learn, Grow & Success.
          </h2>
          <p className="text-[#576070] pt-3 pb-8 text-sm">
            We are passionate about transforming lives through education.
            Founded with a vision to make learning accessible to all, we believe
            in the power of knowledge to...
          </p>

          <ul className="flex flex-col gap-6 pb-6">
            <li className="flex items-center gap-2 text-sm text-[#222e48]">
              <BsCheckAll className="size-7 text-[#076dcd]" />
              9/10 Average Satisfaction Rate
            </li>
            <li className="flex items-center gap-2 text-sm text-[#222e48]">
              <BsCheckAll className="size-7 text-[#076dcd]" />
              96% Completion Rate
            </li>
            <li className="flex items-center gap-2 text-sm text-[#222e48]">
              <BsCheckAll className="size-7 text-[#076dcd]" />
              Friendly Environment & Expert Teacher
            </li>
          </ul>

          <div className="border-t-2 border-dotted border-[#c1c4cc] pt-5 flex items-center gap-8">
            <button
              className="btn custom-btn bg-[#076dcd] hover:bg-black text-white px-5 py-3 rounded-full w-fit text-sm cursor-pointer transition-colors duration-300"
              type="submit"
            >
              Read More
              <i className="bi bi-arrow-up-right ps-2"></i>
            </button>
          </div>
        </div>

        {/* Shapes */}
        <img
          src={element2}
          alt="shape-image"
          className="element2 hero-shape-2 absolute left-20 top-60 object-contain md:block hidden "
        />
        <img
          src={element5}
          alt="shape-image"
          className="element5 hero-shape-5 absolute right-30 top-70 w-5 h-5 sm:flex hidden"
        />
        <img
          src={element5}
          alt="shape-image"
          className="element5 hero-shape-6 absolute left-10 bottom-50 w-6.25 h-6.25 sm:flex hidden"
        />
        <img
          src={element6}
          alt="shape-image"
          className="element5 hero-shape-7 absolute right-50 top-20 lg:flex hidden"
        />
      </div>
      {/* Articles */}
      <div className="articles bg-[#f3f9ff] px-[#2%] lg:px-[12%] sm:px-[8%] py-12.5 lg:py-22.5 relative gap-10 flex flex-col">
        <div className="articles-content flex flex-col lg:w-1/2 w-full mx-auto text-center z-2">
          <span className="text-[#076dcb] font-semibold sora-font pb-1">
            <i className="bi bi-book pe-2"></i>
            Articles
          </span>
          <h2 className="text-[#222e48] text-3xl md:text-3xl md:leading-10 sora-font font-semibold">
            Recent Articles
          </h2>
          <p className="text-[#576070] pt-3 pb-5 text-sm sm:text-md">
            Consectetur adipisicing elit, sed do eiusmod tempor inc idid unt ut
            labore et dolore magna aliqua enim ad...
          </p>
        </div>

        <div className="articles-wrapper grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-8 z-2">
          {/* cart-1 */}
          <div className="articles-item bg-white p-5 pb-3 rounded-xl group shadow-lg">
            <div className="articles-image w-full rounded-xl overflow-hidden">
              <img
                src={article1}
                alt="articles-image"
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              />
            </div>
            <div className="articles-content py-5">
              <span className="bg-[#f37638] text-white rounded-sm px-2 chakrapetch-font font-semibold py-1">
                Student life
              </span>
              <h4 className="my-3 sora-font font-semibold text-md sm:text-xl text-[#222e48] hover:text-[#006dca] transition-colors duration-500">
                The Importance of Diversity in Higher Education
              </h4>
              <div className="flex flex-wrap gap-3">
                <div className="text-[#404a60] text-md font-medium">
                  <FontAwesomeIcon icon={faUserCircle} className="pe-1" />
                  <span>Pradip</span>
                </div>
                <div className="text-[#404a60] text-md font-medium">
                  <FontAwesomeIcon icon={faCalendar} className="pe-1" />
                  <span>10 July, 25</span>
                </div>
                <div className="text-[#404a60] text-md font-medium">
                  <FontAwesomeIcon icon={faMessage} className="pe-1" />
                  <span>25</span>
                </div>
              </div>
              <p className="text-sm py-2 text-[#404a60] pb-5">
                Unlock the secrets to effective time management in the digital
                learning space...
              </p>
              <div className="border-t-2 border-dotted border-[#c1c4cc] pt-5">
                <Link to="/blog">
                  <button
                    className="btn custom-btn text-[#076dcd] font-medium rounded-full w-fit text-sm cursor-pointer"
                    type="button"
                  >
                    Read More
                    <i className="bi bi-arrow-up-right ps-2"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/* Cart-2 */}
          <div className="articles-item bg-white p-5 pb-3 rounded-xl group shadow-lg">
            <div className="articles-image w-full rounded-xl overflow-hidden">
              <img
                src={article2}
                alt="articles-image"
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              />
            </div>
            <div className="articles-content py-5">
              <span className="bg-[#16a34a] text-white rounded-sm px-2 chakrapetch-font font-semibold py-1">
                Freedom
              </span>
              <h4 className="my-3 sora-font font-semibold text-md sm:text-xl text-[#222e48] hover:text-[#006dca] transition-colors duration-500">
                The Importance of Diversity in Higher Education
              </h4>
              <div className="flex flex-wrap gap-3">
                <div className="text-[#404a60] text-md font-medium">
                  <FontAwesomeIcon icon={faUserCircle} className="pe-1" />
                  <span>Megha</span>
                </div>
                <div className="text-[#404a60] text-md font-medium">
                  <FontAwesomeIcon icon={faCalendar} className="pe-1" />
                  <span>12 July, 25</span>
                </div>
                <div className="text-[#404a60] text-md font-medium">
                  <FontAwesomeIcon icon={faMessage} className="pe-1" />
                  <span>25</span>
                </div>
              </div>
              <p className="text-sm py-2 text-[#404a60] pb-5">
                Unlock the secrets to effective time management in the digital
                learning space...
              </p>
              <div className="border-t-2 border-dotted border-[#c1c4cc] pt-5">
                <Link to="/blog">
                  <button
                    className="btn custom-btn text-[#076dcd] font-medium rounded-full w-fit text-sm cursor-pointer"
                    type="button"
                  >
                    Read More
                    <i className="bi bi-arrow-up-right ps-2"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/* cart-3 */}
          <div className="articles-item bg-white p-5 pb-3 rounded-xl group shadow-lg">
            <div className="articles-image w-full rounded-xl overflow-hidden">
              <img
                src={article3}
                alt="articles-image"
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              />
            </div>
            <div className="articles-content py-5">
              <span className="bg-[#17bbe4] text-white rounded-sm px-2 chakrapetch-font font-semibold py-1">
                Online
              </span>
              <h4 className="my-3 sora-font font-semibold text-md sm:text-xl text-[#222e48] hover:text-[#006dca] transition-colors duration-500">
                The Importance of Diversity in Higher Education
              </h4>
              <div className="flex flex-wrap gap-3">
                <div className="text-[#404a60] text-md font-medium">
                  <FontAwesomeIcon icon={faUserCircle} className="pe-1" />
                  <span>Mihir</span>
                </div>
                <div className="text-[#404a60] text-md font-medium">
                  <FontAwesomeIcon icon={faCalendar} className="pe-1" />
                  <span>18 July, 25</span>
                </div>
                <div className="text-[#404a60] text-md font-medium">
                  <FontAwesomeIcon icon={faMessage} className="pe-1" />
                  <span>26</span>
                </div>
              </div>
              <p className="text-sm py-2 text-[#404a60] pb-5">
                Unlock the secrets to effective time management in the digital
                learning space...
              </p>
              <div className="border-t-2 border-dotted border-[#c1c4cc] pt-5">
                <Link to="/blog">
                  <button
                    className="btn custom-btn text-[#076dcd] font-medium rounded-full w-fit text-sm cursor-pointer"
                    type="button"
                  >
                    Read More
                    <i className="bi bi-arrow-up-right ps-2"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <img
          src={element1}
          alt="shape-image"
          className="element1 hero-shape1 absolute left-30 top-30 object-contain hidden md:block"
        />
        <img
          src={element2}
          alt="shape-image"
          className="element2 hero-shape2 absolute left-20 top-60 object-contain hidden md:block"
        />
        <img
          src={element3}
          alt="shape-image"
          className="element3 hero-shape3 absolute right-96 bottom-10 z-1 object-contain hidden lg:block"
        />
        <img
          src={element4}
          alt="shape-image"
          className="element3 hero-shape4 absolute right-40 bottom-50 z-0 object-contain hidden lg:block"
        />
        <img
          src={element5}
          alt="shape-image"
          className="element5 hero-shape5 absolute right-30 top-70 w-5 h-5 hidden sm:flex"
        />
        <img
          src={element5}
          alt="shape-image"
          className="element5 hero-shape5 absolute left-10 bottom-50 w-6.25 h-6.25 hidden sm:flex"
        />
        <img
          src={element6}
          alt="shape-image"
          className="element5 hero-shape5 absolute right-50 top-20 z-2 hidden lg:flex"
        />
      </div>
    </div>
  );
};

export default Index;