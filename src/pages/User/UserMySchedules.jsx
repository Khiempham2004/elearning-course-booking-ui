import { Card, Empty, Spin, Tag, Typography } from 'antd';
import React from 'react';
import { useState } from 'react';
import { getMySchedule } from '../../service/schedule.service';
import { useEffect } from 'react';
import { BookOutlined, CalendarOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

const UserMySchedules = () => {
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchMySchedule = async () => {
        try {
            setLoading(true);
            const res = await getMySchedule();
            setSchedule(res.data?.schedules || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMySchedule();
    }, []);

    if (loading) {
        return <div className='flex justify-center items-center h-75 py-10'>
            <Spin size='large' />
        </div>
    };


    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 p-6">
            <div className="flex justify-between items-center mb-8">
                <Title level={2} className="mb-0!">
                    📚 My Schedule
                </Title>
            </div>

            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-800">
                    Lịch học của tôi
                </h1>

                <p className="text-gray-500 mt-2">
                    Theo dõi các buổi học đã được phê duyệt
                </p>
            </div>

            {schedule.length === 0 ? (
                <div className="bg-linear-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-10 text-center shadow-sm">
                    <div className="text-5xl mb-4">⏳</div>

                    <h3 className="text-xl font-bold text-yellow-700">
                        Chưa có lịch học
                    </h3>

                    <p className="text-gray-600 mt-3">
                        Bạn đã đăng ký khóa học nhưng chưa được quản trị viên phê duyệt.
                    </p>

                    <p className="text-gray-500 mt-2">
                        Vui lòng chờ Admin xét duyệt Enrollment để xem lịch học.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {schedule.map((item) => (
                        <Card
                            key={item._id}
                            className="
                                rounded-3xl
                                border-0
                                shadow-md
                                hover:shadow-2xl
                                hover:-translate-y-1
                                transition-all
                                duration-300
                                "
                            bodyStyle={{
                                padding: "24px",
                            }}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-5">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">
                                        {item.courseId?.title}
                                    </h2>

                                    <div className="mt-2">
                                        <Tag color="blue">
                                            <BookOutlined /> Course
                                        </Tag>
                                    </div>
                                </div>

                                <Tag color="green">
                                    Approved
                                </Tag>
                            </div>

                            {/* Content */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <UserOutlined className="text-blue-600" />
                                    </div>

                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Giảng viên
                                        </p>

                                        <p className="font-semibold">
                                            {item.instructor || "N/A"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <CalendarOutlined className="text-green-600" />
                                    </div>

                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Ngày học
                                        </p>

                                        <p className="font-semibold">
                                            {item.date
                                                ? new Date(item.date).toLocaleDateString(
                                                    "vi-VN"
                                                )
                                                : "N/A"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                        <ClockCircleOutlined className="text-purple-600" />
                                    </div>

                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Giờ học
                                        </p>

                                        <p className="font-semibold">
                                            {item.time || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

export default UserMySchedules;
