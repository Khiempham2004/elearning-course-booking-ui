import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import element1 from "../../assets/Images/element-01.png";
import element2 from "../../assets/Images/element-02.png";
import element3 from "../../assets/Images/element-03.png";
import element4 from "../../assets/Images/element-04.png";
import element5 from "../../assets/Images/element-05.png";
import element6 from "../../assets/Images/element-06.png";


import { Link } from "react-router-dom";
import { faHome } from "@fortawesome/free-regular-svg-icons";
import { getCourse } from "../../service/course.service";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const imageModules = import.meta.glob("../../assets/Images/*", { eager: true });

// const getLocalImage = (courseImage) => {
//   if (!courseImage) return "";
//   const filename = courseImage.split("/").pop();
//   const key = Object.keys(imageModules).find((k) => k.includes(filename));
//   return key ? imageModules[key].default : courseImage;
// };

const getLocalImage = (courseImage) => {
    if (!courseImage) return "";

    // ảnh upload từ server
    if (courseImage.startsWith("/uploads")) {
        return `http://localhost:3000${courseImage}`;
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

const Course = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const categories = ["All", ...new Set(courses.map((c) => c.catagory))];

  // const totalPages = Math.ceil(sortedCourses.length) / limit;
  const filteredCourses = activeCategory === "All"
    ? [...courses]
    : courses.filter((c) => c.catagory === activeCategory);

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "Newest":
        return new Date(b.createdAt) - new Date(a.createdAt);

      case "Oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);

      case "PriceLowHigh":
        return a.price - b.price;

      case "PriceHighLow":
        return b.price - a.price;

      default:
        return 0;
    }
  });


  const limit = 6;

  const paginatedCourses = sortedCourses.slice(
    (page - 1) * limit,
    page * limit
  );

  const totalPages = Math.ceil(
    sortedCourses.length / limit
  );


  const totalCourse = courses.length;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await getCourse();
        console.log("Course API response:", res.data);

        // Backend returns { data: [...] } so access res.data.data
        const coursesData = res.data.data || res.data || [];
        console.log("Courses loaded:", coursesData.length);

        setCourses(coursesData);
        localStorage.setItem("course", JSON.stringify(coursesData));
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
    setPage(1);
  }, [activeCategory, sortBy]);

  return (
    <div>
      {loading && (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Loading courses...</p>
        </div>
      )}
      {!loading && courses.length === 0 && (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>No courses available</p>
        </div>
      )}
      {!loading && courses.length > 0 && (
        <>
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
            // className="element1  shape1 absolute left-30 top-30 object-contain hidden md:block"
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

            <div className="flex flex-wrap gap-3 my-8 bg-white p-5 rounded-xl shadow-xl">
              {categories.map((catagory, index) => (
                <button
                  key={catagory, index}
                  onClick={() => setActiveCategory(catagory)}
                  className={`px-4 py-3 rounded-full text-sm font-medium transition cursor-pointer shadow-md ${activeCategory === catagory
                    ? "bg-blue-600 text-white"
                    : "bg-[#f3f9ff] text-[#404a60]"
                    }`}
                >
                  {catagory}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedCourses.length > 0 ? (
                paginatedCourses.map((course) => (
                  <div
                    key={course._id}
                    course={course}
                    className="bg-white p-3 rounded-xl group hover:shadow-lg transition relative"
                  >
                    <div className="h-57.5 rounded-xl overflow-hidden relative bg-gray-200">
                      <div className="absolute inset-0 animate-pulse bg-gray-200"></div>
                      <img
                        src={getImageUrl(course.courseImage)}
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
                            src={getImageUrl(course.instructorImage)}
                            alt={course.instructor}
                            className="w-12 h-12 rounded-full object-cover border"
                          />
                          <span>{course.instructor}</span>
                        </div>
                      </div>
                      <div className="border-t-2 border-dotted pt-5 flex justify-between items-center">
                        <h4 className="text-[#f37739] text-2xl font-semibold">
                          ${course.price}
                        </h4>
                        <Link
                          className="text-[#076dcd] hover:text-black font-medium cursor-pointer px-5 py-3 rounded-full w-fit text-sm transition-colors duration-300"
                          type="button"
                          to={`/course/${course._id}`}
                        >
                          Enrollment Now {" "}
                          <i className="bi bi-arrow-up-right ps-2"></i>
                        </Link>
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
        </>
      )}

      <div className="flex justify-center gap-2 mt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="
                px-4 py-2 
                rounded 
                bg-gray-200
                hover:bg-blue-500
                hover:text-white
                hover:-translate-y-1
                hover:shadow-md
                transition-all
                duration-300
                cursor-pointer
                disabled:opacity-50
                disabled:cursor-not-allowed
          "
          style={{ cursor: 'pointer', }}
        >
          <LeftOutlined />
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            className={`px-4 py-2 rounded cursor-pointer transition-all duration-300
              ${page === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-blue-500 hover:text-white hover:-translate-y-1 hover:shadow-md"
              }
              `}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="
                px-4 py-2 
                rounded 
                bg-gray-200
                hover:bg-blue-500
                hover:text-white
                hover:-translate-y-1
                hover:shadow-md
                transition-all
                duration-300
                cursor-pointer
                disabled:opacity-50
                disabled:cursor-not-allowed
          "
          style={{ cursor: 'pointer', }}
        >
          <RightOutlined />
        </button>
      </div>
    </div>
  );
};

export default Course;
