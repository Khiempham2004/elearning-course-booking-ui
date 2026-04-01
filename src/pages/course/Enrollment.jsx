import React from "react";

const Enrollment = () => {
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

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
            Enroll Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Enrollment;
