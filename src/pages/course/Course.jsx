import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import element1 from "../../../public/Images/element-01.png";
import element2 from "../../../public/Images/element-02.png";
import element3 from "../../../public/Images/element-03.png";
import element4 from "../../../public/Images/element-04.png";
import element5 from "../../../public/Images/element-05.png";
import element6 from "../../../public/Images/element-06.png";


import { Link } from "react-router-dom";
import { faHome } from "@fortawesome/free-regular-svg-icons";
// import { getCourse } from "../../service/course.service.js";
import axios from "axios";

const Course = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [courses, setCourse] = useState([]);
  const categories = ["All", ...new Set(courses.map((c) => c.category))];

  const filterCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  const totalCourse = courses.length;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/courses');
        console.log(res.data);
        setCourse(res.data.data);
        localStorage.setItem("course", JSON.stringify(res.data.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourse();
  }, []);
  return (
    <div>
      <div className="section-banner bg-[#f3f9ff] h-100 py-12.5 lg:py-22.5 flex flex-col justify-center items-center relative">
        <h1 className="chakrapetch-font font-bold text-5xl lg:text-6xl mb-5 text-[#222e48]">
          Courses
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
            <Link to="/Courses">
              <span className="text-sm xl:text-md text-[#f37739]">Courses</span>
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
          className="element5  shape5 absolute right-30 top-70 w-5 h-5 hidden sm:flex"
        />
        <img
          src={element5}
          alt="shape-image"
          className="element5  shape5 absolute left-10 bottom-50 w-6.25 h-6.25 hidden sm:flex"
        />
      </div>

      <div className=" px-[2%] lg:px-[12%] sm:px-[8%] py-22.5 lg:py-37.5 bg-[#f3f9ff] relative">
        <div className="flex justify-between items-center flex-wrap gap-3 mb-6 cursor-pointer">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-[#066dca]">
              {courses.length}
            </span>
            of {""}{" "}
            <span className="font-semibold text-[#f37739]">{totalCourse}</span>{" "}
            Results
          </p>
          <div className="cursor-pointer">
            <label htmlFor="" className="mr-2 text-gray-600">
              Sort By:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 appearance-none outline-none bg-[#f3f9ff] rounded-full text-sm cursor-pointer border border-[#ebecef] shadow-lg"
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="PriceLowHigh">Price : Low to High</option>
              <option value="PriceHighLow">Price : High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 my-8 bg-white p-5 rounded-xl shadow-xl">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-3 rounded-full text-sm font-medium transition cursor-pointer shadow-md ${
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-[#f3f9ff] text-[#404a60]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterCourses.length > 0 ? (
            filterCourses.map((course) => (
              <div
                key={course.title}
                className="bg-white p-3 rounded-xl group hover:shadow-lg transition relative"
              >
                <div className="h-57.5 rounded-xl overflow-hidden relative bg-gray-200">
                  <div className="absolute inset-0 animate-pulse bg-gray-200"></div>
                  <img
                    src= {course.courseImage}
                    alt={course.title}
                    loading="lazy"
                    className="relative z-10 group-hover:scale-110 transition duration-500 h-full w-full object-cover"
                    onLoad={(e) => {
                      e.target.previousSibling.style.display = "none";
                    }}
                  />
                </div>

                <div className="p-3">
                  <h4 className="text-[#222e48] font-bold sm:text-xl hover:text-[#006dca] transition-colors duration-500">
                    {course.title}
                  </h4>
                  <div className="flex justify-between items-center my-2">
                    <span>
                      <i className="bi bi-camera-video pe-2"></i>
                      {course.lessons} Lessons
                    </span>
                    <span>
                      <i className="bi bi-bar-chart pe-2"></i>
                      {course.level}
                    </span>
                  </div>
                  <div className="flex justify-between items-center my-2">
                    <span>
                      <i className="bi bi-star-fill text-yellow-400 pe-2"></i>
                      {course.rating} ({course.reviews})
                    </span>
                    <div className="flex items-center">
                      <img
                        src={course.instructorImage}
                        alt={course.Instructor}
                        className="rounded-full h-10 w-10 object-cover me-2"
                      />
                      <span>{course.instructor}</span>
                    </div>
                  </div>
                  <div className="border-t-2 border-dotted pt-5 flex justify-between items-center">
                    <h4 className="text-[#f37739] text-2xl font-semibold">
                      ${course.price}
                    </h4>
                    <button
                      className="text-[#076dcd] hover:text-black font-medium cursor-pointer px-5 py-3 rounded-full w-fit text-sm transition-colors duration-300"
                      type="button"
                    >
                      {course.enrollLink}{" "}
                      <i className="bi bi-arrow-up-right ps-2"></i>
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
          className="element5 hero-shape5 absolute right-30 top-70 w-6.25 h-6.25 object-contain hidden sm:flex"
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
    </div>
  );
};

export default Course;
