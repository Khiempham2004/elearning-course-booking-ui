import { message } from "antd";
import React from "react";
import { getToken } from "../../utils/Auth";
import axios from "axios";

const Enrollment = () => {
  const handleEnroll = async (courseId) => {
    try {
      const tokenEnroll = getToken();
      await axios.post('http://localhost:3000/api/enrollments', { courseId }, {
        headers: {
          Authorization: `Bearer ${tokenEnroll}`
        }
      });
      message('Đăng ký thành công');
    } catch (error) {
      console.log(error);
      message.error(error);
    }
  }

  return (
    <div>
      <div className="max-w-lg mx-auto bg-white shadow-xl rounded-xl p-30">
        <h2 className="text-3xl font-bold mb-6 text-center">Enroll Course</h2>

        <form className="space-y-4">
          <input
            className="w-full border p-3 rounded-lg"
            placeholder="Your Name"
          />

          <input className="w-full border p-3 rounded-lg" placeholder="Email" />

          <select className="w-full border p-3 rounded-lg">
            <option>Select Course</option>
            <option>React Development</option>
            <option>Digital Marketing</option>
          </select>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700" onClick={() => handleEnroll()}>
            Enroll Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Enrollment;
