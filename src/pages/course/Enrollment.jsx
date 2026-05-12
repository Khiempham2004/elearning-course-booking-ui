import { message } from "antd";
import React from "react";
import { getToken } from "../../utils/Auth";
import { useParams } from "react-router-dom";
import { createEnrollment } from "../../service/enrollment.service";

const Enrollment = () => {
  const { courseId } = useParams();

  const handleEnroll = async (event) => {
    event.preventDefault();
    try {
      const token = getToken();

      const res = await createEnrollment(
        {
          courseId: courseId
        },
        token
      );
      console.log(res.data);

      message.success("Đăng ký thành công")
    } catch (error) {
      console.log(error);
      message.error("Đăng ký thất bại")
    }
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8">

          <h2 className="text-3xl font-bold mb-6 text-center">
            Enroll Course
          </h2>

          <form
            className="space-y-4"
            onSubmit={handleEnroll}
          >

            <input
              className="w-full border p-3 rounded-lg"
              placeholder="Your Name"
            />

            <input
              className="w-full border p-3 rounded-lg"
              placeholder="Email"
            />

            <input
              className="w-full border p-3 rounded-lg bg-gray-100"
              value={courseId}
              readOnly
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Enroll Now
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Enrollment;
