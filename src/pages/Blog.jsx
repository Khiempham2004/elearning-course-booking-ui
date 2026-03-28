import React from "react";

import element1 from "../../public/Images/element-01.png";
import element2 from "../../public/Images/element-02.png";
import element3 from "../../public/Images/element-03.png";
import element4 from "../../public/Images/element-04.png";
import element5 from "../../public/Images/element-05.png";
import element6 from "../../public/Images/element-06.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faEye,
  faHome,
  faMessage,
  faUserCircle,
} from "@fortawesome/free-regular-svg-icons";

import blog1 from "../../public/Images/blog-image-01.jpg";
import blog2 from "../../public/Images/blog-image-02.jpg";
import blog3 from "../../public/Images/blog-image-03.jpg";
import blog4 from "../../public/Images/blog-image-04.jpg";
import blog5 from "../../public/Images/blog-image-05.jpg";
import blog6 from "../../public/Images/blog-image-06.jpg";
import blog7 from "../../public/Images/blog-image-07.jpg";
import blog8 from "../../public/Images/blog-image-08.jpg";
import blog9 from "../../public/Images/blog-image-09.jpg";

const blogs = [
  {
    img: blog1,
    title: "Navigating the Job Market: Advice for Graduates",
    views: "1.6K",
    comments: "26",
  },
  {
    img: blog2,
    title: "The Future of AI in Everyday Life",
    views: "2.1K",
    comments: "35",
  },
  {
    img: blog3,
    title: "How to Improve Your Design Skills Quickly",
    views: "980",
    comments: "12",
  },
  {
    img: blog4,
    title: "Mastering JavaScript: Tips and Tricks",
    views: "3.5K",
    comments: "40",
  },
  {
    img: blog5,
    title: "The Rise of Remote Work: Pros and Cons",
    views: "1.8K",
    comments: "28",
  },
  {
    img: blog6,
    title: "Building a Career in Data Science",
    views: "2.7K",
    comments: "19",
  },
  {
    img: blog7,
    title: "UI/UX Design Trends in 2025",
    views: "1.2K",
    comments: "14",
  },
  {
    img: blog8,
    title: "Why Cybersecurity is More Important Than Ever",
    views: "2.3K",
    comments: "22",
  },
  {
    img: blog9,
    title: "Top 10 Tools for Web Developers",
    views: "4.4K",
    comments: "50",
  },
];
const Blog = () => {
  return (
    <div>
      <div className="section-banner bg-[#f3f9ff] h-[400px] py-[50px] lg:py-[90px] flex flex-col justify-center items-center relative">
        <h1 className="chakrapetch-font font-bold text-5xl lg:text-6xl mb-5 text-[#222e48]">
          Blog
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
            <Link to="/blog">
              <span className="text-sm xl:text-md text-[#f37739]">Blog</span>
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

      <div className="px-[2%] lg:px-[12%] sm:px-[8%] py-[50px] lg:py-[90px] relative gap-10 flex flex-col">
        <div className="blog-wrapper grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-8 z-2">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="blog-item bg-white p-5 pb-3 rounded-xl group shadow-lg"
            >
              <div className="blog-image w-full rounded-xl overflow-hidden">
                <img
                  src={blog.img}
                  alt="blog"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
              </div>
              <div className="articles-content py-5">
                <h4 className="my-3 sora-font font-semibold text-md sm:text-xl text-[#222e48] hover:text-[#006dca] transition-colors duration-500">
                  {blog.title}
                </h4>
                <div className="flex flex-wrap gap-3">
                  <div className="text-[#404a60] text-md font-medium">
                    <FontAwesomeIcon icon={faUserCircle} className="pe-1" />
                    <span>By Admin</span>
                  </div>
                  <div className="text-[#404a60] text-md font-medium">
                    <FontAwesomeIcon icon={faEye} className="pe-1" />
                    <span>{blog.views}</span>
                  </div>
                  <div className="text-[#404a60] text-md font-medium">
                    <FontAwesomeIcon icon={faMessage} className="pe-1" />
                    <span>{blog.comments}</span>
                  </div>
                </div>
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
          ))}
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
          className="element5 hero-shape5 absolute right-50 top-20 z-2 hidden lg:flex"
        />
      </div>
    </div>
  );
};

export default Blog;
