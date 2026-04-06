import React, { useState } from "react";

import element1 from "../../public/Images/element-01.png";
import element2 from "../../public/Images/element-02.png";
import element3 from "../../public/Images/element-03.png";
import element4 from "../../public/Images/element-04.png";
import element5 from "../../public/Images/element-05.png";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import student1 from "../../public/Images/student-img-01.png";
import student2 from "../../public/Images/student-img-02.png";
import student3 from "../../public/Images/student-img-03.png";
import student4 from "../../public/Images/student-img-04.png";
import student5 from "../../public/Images/student-img-05.png";
import student6 from "../../public/Images/student-img-06.png";

import { faHome } from "@fortawesome/free-regular-svg-icons";
const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    e.target.reset();

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };
  return (
    <div>
      <div className="section-banner bg-[#f3f9ff] h-100 py-12.5 lg:py-22.5 flex flex-col justify-center items-center relative">
        <h1 className="chakrapetch-font font-bold text-5xl lg:text-6xl mb-5 text-[#222e48]">
          Contact
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
              <span className="text-sm xl:text-md text-[#f37739]">Contact</span>
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

      {/* Contact */}
      <div className="flex justify-center items-center flex-col gap-10 px-[2%] lg:px-[12%] sm:px-[8%] py-[70px] lg:py-[120px] relative">
        <div className="contact-content flex flex-col text-center w-full lg:w-[60%] xl:w-[50%]">
          <span className="text-[#076dcb] font-semibold sora-font pb-1">
            <i className="bi bi-book pe-2"></i>
            Get In Touch
          </span>
          <h2 className="text-[#222e48] text-3xl md:text-4xl md:leading-13 sora-font font-semibold">
            Let us help you
          </h2>
          <p className="text-[#576070] pt-3 pb-8 text-sm">
            our Platform is built on the principles of innovation, quality , and
            inclusivity, aiming to provide a semleess learning
          </p>
        </div>

        <div className="contact-wrapper grid grid-cols-1 lg:grid-cols-3 gap-5 w-full">
          <div className="contact-item w-full flex items-start gap-5 px-5 py-10 group bg-[#f3f9ff]  border border-[#EBECEF] rounded-xl hover:bg-[#066dca] transition-colors duration-300">
            <div className="contact-icon min-w-12.5 min-h-12.5  bg-white rounded-full flex justify-center items-center text-xl shadow">
              <i className="bi bi-geo-alt"></i>
            </div>
            <div className="contact-info">
              <h4 className="sora-font group-hover:text-white transition-colors duration-300 font-semibold text-xl pb-2 text-[#222e48]">
                Main Office
              </h4>
              <p className="text-sm group-hover:text-white transition-colors duration-300 text-[#404a60] pb-3">
                2972 westheimer rd. Santa Anna, Abc 85486 Intter 4535
              </p>
              <button
                className="btn custom-btn text-[#076dcd] group-hover:text-white font-medium rounded-full w-fit text-sm cursor-pointer"
                type="button"
              >
                Find Location
                <i className="bi bi-arrow-up-right ps-2"></i>
              </button>
            </div>
          </div>
          <div className="contact-item w-full flex items-start gap-5 px-5 py-10 group bg-[#f3f9ff]  border border-[#EBECEF] rounded-xl hover:bg-[#066dca] transition-colors duration-300">
            <div className="contact-icon min-w-12.5 min-h-12.5  bg-white rounded-full flex justify-center items-center text-xl shadow">
              <i className="bi bi-envelope"></i>
            </div>
            <div className="contact-info">
              <h4 className="sora-font group-hover:text-white transition-colors duration-300 font-semibold text-xl pb-2 text-[#222e48]">
                Email Address
              </h4>
              <p className="text-sm group-hover:text-white transition-colors duration-300  pb-3">
                infoexample@gmail.com
              </p>
              <p className="text-sm group-hover:text-white transition-colors duration-300 pb-3">
                infoexample@gmail.com
              </p>
              <button
                className="btn custom-btn text-[#076dcd] group-hover:text-white font-medium rounded-full w-fit text-sm cursor-pointer underline"
                type="button"
              >
                Get In Touch
                <i className="bi bi-arrow-up-right ps-2"></i>
              </button>
            </div>
          </div>
          <div className="contact-item w-full flex items-start gap-5 px-5 py-10 group bg-[#f3f9ff]  border border-[#EBECEF] rounded-xl hover:bg-[#066dca] transition-colors duration-300">
            <div className="contact-icon min-w-12.5 min-h-12.5  bg-white rounded-full flex justify-center items-center text-xl shadow">
              <i className="bi bi-telephone"></i>
            </div>
            <div className="contact-info">
              <h4 className="sora-font group-hover:text-white transition-colors duration-300 font-semibold text-xl pb-2 text-[#222e48]">
                Phone Number
              </h4>
              <p className="text-sm group-hover:text-white transition-colors duration-300  pb-3">
                (555) 555-01254
              </p>
              <p className="text-sm group-hover:text-white transition-colors duration-300 pb-3">
                (405) 555-01254
              </p>
              <button
                className="btn custom-btn text-[#076dcd] group-hover:text-white font-medium rounded-full w-fit text-sm cursor-pointer underline"
                type="button"
              >
                Get In Touch
                <i className="bi bi-arrow-up-right ps-2"></i>
              </button>
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
          src={element5}
          alt="shape-image"
          className="element5 hero-shape5 absolute right-30 top-70 w-5 h-5 hidden sm:flex"
        />
        <img
          src={element5}
          alt="shape-image"
          className="element5 hero-shape5 absolute left-10 bottom-50 w-6.25 h-6.25 hidden sm:flex"
        />
      </div>

      <div className="contact flex lg:flex-row flex-col justify-between items-center gap-10 px-[2%] lg:px-[12%] sm:px-[8%] py-12.5 lg:py-22.5 relative">
        <div className="contact-content flex flex-col lg:w-1/2 w-full">
          <span className="text-[#076dcb] font-semibold sora-font pb-1">
            <i className="bi bi-book pe-2"></i>
            Contact Us
          </span>
          <h2 className="text-[#222e48] text-3xl md:text-5xl md:leading-13 sora-font font-semibold">
            Have questions? don't hesitate to contact us
          </h2>
          <p className="text-[#576070] pt-3 pb-8 text-sm sm:text-shadow-md">
            We are passionate about transforming lives through education.
            Founded with a vision to make learning accessible to all, we belive
            in the power of knowledge to unlock opportunities and shape the
            future...
          </p>

          <div className="border-t-2 border-dotted border-[#c1c4cc] pt-5 flex items-center gap-8">
            <button
              className="btn custom-btn bg-[#076dcd] hover:bg-black text-white px-5 py-3 rounded-full w-fit text-sm cursor-pointer transition-colors duration-300"
              type="submit"
            >
              Read More
              <i className="bi bi-arrow-up-right ps-2"></i>
            </button>
          </div>
          <div className="user-info flex gap-8 mt-4">
            <div className="flex user-image">
              <img
                src={student1}
                alt="student-image"
                className="rounded-full w-10 h-10 hover:scale-100 transition-all duration-300"
              />
              <img
                src={student2}
                alt="student-image"
                className="rounded-full w-10 h-10 hover:scale-100 transition-all duration-300"
              />
              <img
                src={student3}
                alt="student-image"
                className="rounded-full w-10 h-10 hover:scale-100 transition-all duration-300"
              />
              <img
                src={student4}
                alt="student-image"
                className="rounded-full w-10 h-10 hover:scale-100 transition-all duration-300"
              />
              <img
                src={student5}
                alt="student-image"
                className="rounded-full w-10 h-10 hover:scale-100 transition-all duration-300"
              />
              <img
                src={student6}
                alt="student-image"
                className="rounded-full w-10 h-10 hover:scale-100 transition-all duration-300"
              />
            </div>
            <div className="star">
              <i className="bi bi-star-fill text-yellow-500 px-0.5 text-lg"></i>
              <i className="bi bi-star-fill text-yellow-500 px-0.5 text-lg"></i>
              <i className="bi bi-star-fill text-yellow-500 px-0.5 text-lg"></i>
              <i className="bi bi-star-fill text-yellow-500 px-0.5 text-lg"></i>
              <i className="bi bi-star-half text-yellow-500 px-0.5 text-lg"></i>
            </div>
            <p className="font-medium">2.5K+ reviews (4.95 of 5)</p>
          </div>
        </div>
        <div className="contact-form z-10 lg:w-1/2 w-full bg-white p-3 rounded-2xl">
          <form
            onSubmit={handleSubmit}
            className="w-full bg-[#f3f9ff] border border-[#f3f9ff] p-5 sm:p-10 rounded-2xl space-y-4"
          >
            <h3 className="sora-font text-2xl font-semibold text-[#222e48] border-b-2 border-[#ebecef] border-dashed pb-5">
              Get In Touch
            </h3>

            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl border bg-white border-gray-300 focus:ring-2 focus:ring-[#066dca] outline-none transition"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-xl border bg-white border-gray-300 focus:ring-2 focus:ring-[#066dca] outline-none transition"
              />
            </div>

            <div>
              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-xl border bg-white border-gray-300 focus:ring-2 focus:ring-[#066dca] outline-none transition"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-[#066dca] hover:bg-black text-white font-medium py-3 rounded-xl transition-all duration-300 cursor-pointer"
              >
                Send Message
              </button>
            </div>

            {/* Thank You Message */}
            {submitted && (
              <p className="text-green-600 font-medium mt-3 text-center animate-fadeIn">
                Thank you! Your message has been sent successfully.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
