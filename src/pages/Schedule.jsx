import React from "react";

const scheduleData = [
  {
    course: "ReactJS",
    instructor: "John Doe",
    date: "Monday",
    time: "9:00 AM",
    room: "Online",
  },
  {
    course: "NodeJS",
    instructor: "David",
    date: "WebnesDay",
    time: "12:00 AM",
    room: "Room A1",
  },
  {
    course: "UI UX Design",
    instructor: "Anna",
    date: "Friday",
    time: "3:00 PM",
    room: "Online",
  },
];
const Schedule = () => {
  return (
    <div>
      <div className="px-[8%] py-30 bg-[#f3f9ff] min-h-screen">
        <h1 className="text-3xl font-bold text-[#222e48] mb-10">
          Class Schedule
        </h1>

        {/* Today Class */}

        <div className="bg-white p-6 rounded-2xl shadow-md mb-10 border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-5">Today's Class</h2>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-[#222e48]">React JS</h3>

              <p className="text-gray-500">Instructor: John Doe</p>
            </div>

            <div className="text-center">
              <p className="text-gray-500 text-sm">Time</p>
              <p className="font-semibold text-lg">09:00 AM</p>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
              Join Class
            </button>
          </div>
        </div>

        {/* Weekly Schedule */}

        <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
          <h2 className="text-xl font-semibold mb-6">Weekly Schedule</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b text-gray-600">
                  <th className="pb-3">Course</th>
                  <th>Instructor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Room</th>
                </tr>
              </thead>

              <tbody>
                {scheduleData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-4 font-medium">{item.course}</td>

                    <td>{item.instructor}</td>

                    <td>
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                        {item.date}
                      </span>
                    </td>

                    <td>{item.time}</td>

                    <td>{item.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Classes */}

        <div>
          <h2 className="text-xl font-semibold mb-6">Upcoming Classes</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {scheduleData.map((item, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg text-[#222e48]">
                  {item.course}
                </h3>

                <p className="text-gray-500">{item.instructor}</p>

                <div className="flex justify-between mt-4 text-sm text-gray-600">
                  <span>{item.date}</span>
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
