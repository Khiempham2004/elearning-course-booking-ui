import { Button, Card, DatePicker, Empty, Form, Input, message, Modal, Popconfirm, Select, Space, Spin, Table, TimePicker } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { createSchedule, getAllSchedule, updateSchedule } from '../../service/schedule.service';
import { deleteSchedule } from '../../service/schedule.service';
import { getToken } from '../../utils/Auth';
import dayjs from 'dayjs';
import { getCourse } from '../../service/course.service';
// const imageModules = import.meta.glob("../../assets/Images/*", { eager: true });


// const getLocalImage = (courseImage) => {
//     if (!courseImage) return "";

//     // ảnh upload từ server
//     if (courseImage.startsWith("/uploads")) {
//         return `http://localhost:5000${courseImage}`;
//     }

//     // ảnh local trong assets
//     const filename = courseImage.split("/").pop();
//     const key = Object.keys(imageModules).find(
//         (k) => k.includes(filename)
//     );
//     return key ? imageModules[key].default : courseImage;
// };
// const getImageUrl = (imagePath) => {
//     if (!imagePath) return "";

//     // image upload tu server
//     if (imagePath.startsWith("/uploads")) {
//         return `http://localhost:3000${imagePath}`;
//     };
//     return getLocalImage(imagePath);
// }

const ScheduleManager = () => {
    const [schedules, setSchedules] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();
    const [editting, setEditting] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const fetchSchedules = async () => {
        try {
            setLoading(true);
            const res = await getAllSchedule();
            console.log("✅ Lịch học đã được tải:", res.data.schedules);

            setSchedules(res.data.schedules);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const fectCourses = async () => {
        try {
            const res = await getCourse();
            setCourses(res?.data?.data || []);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchSchedules();
        fectCourses();
    }, []);

    const handleCreateSchedule = async (values) => {
        try {
            await createSchedule(values);
            fetchSchedules();
            setIsModalOpen(false);
            message.success("Tạo lịch học thành công")
        } catch (error) {
            console.log(error);
            message.error("Tạo lịch học thất bại")
        }
    }

    const handleEditSchedule = (record) => {
        try {
            setEditting(record);
            form.setFieldsValue({
                courseId: record.courseId._id,
                instructor: record.instructor,
                date: dayjs(record.date),
                time: dayjs(record.time, "HH:mm")
            });
            setIsModalOpen(true);
        } catch (error) {
            console.log(error);
        }
    };

    // const handleUpdateSchedule = async (id, values) => {
    //     try {
    //         await updateSchedule(id, values);
    //         fetchSchedules();
    //         message.success("Cập nhật thành công");
    //         setIsModalOpen(false);
    //     } catch (error) {
    //         console.log(error);
    //         message.error(error);
    //     }
    // }

    const handleDeleteSchedule = async (id) => {
        try {
            const token = await getToken()
            await deleteSchedule(id, token);
            fetchSchedules();
            message.success("Xóa lịch học thành công");
        } catch (error) {
            console.log(error);
            message.error(error)
        }
    };

    const handleSubmitSchedule = async () => {
        try {
            const values = await form.validateFields();
            values.date = values.date.format("YYYY-MM-DD");
            values.time = values.time.format("HH:mm");
            if (editting) {
                await updateSchedule(
                    editting._id,
                    values
                );
            } else {
                await handleCreateSchedule(values);
            }
        } catch (error) {
            console.log(error);
            message.error("Submit thất bại")
        }
    }

    if (loading) {
        return <div className='flex justify-center items-center h-75 py-10'>
            <Spin size="large" />
        </div>
    }

    const colums = [
        {
            title: "Tên khóa học",
            dataIndex: "courseId",
            key: "courseId",
            render: (courseId) => courseId?.title || "N/A"
        },
        {
            title: "Giảng viên",
            dataIndex: "instructor",
            key: "instructor",
            render: (instructor) => instructor || "N/A"
        },
        {
            title: "Ngày học",
            dataIndex: "date",
            key: "date",
            render: (date) => new Date(date).toLocaleDateString("vi-VN"),
        },
        {
            title: "Giờ học",
            dataIndex: "time",
            key: "time",
        },
        {
            title: "Hành động",
            key: "action",
            dataIndex: "action",
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleEditSchedule(record)}>
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa lịch học này?"
                        onConfirm={() => handleDeleteSchedule(record._id)}
                        okText="Yes"
                        cancelText="No">

                        <Button danger>
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ]


    return (
        <div className='flex justify-between items-center mb-5'>
            <h1 className='text-2xl font-bold'> Schedule manager</h1>

            <button type='primary'
                size='large'
                onClick={() => {
                    setEditting(null);
                    form.resetFields();
                    setIsModalOpen(true);
                }}
            >
                Thêm lịch học
            </button>
            <div>
                <Table
                    rowKey="_id"
                    columns={colums}
                    dataSource={schedules}
                />
            </div>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-5">
                    Lịch học của tôi
                </h1>

                {schedules.length === 0 ? (
                    <Empty description="Chưa có lịch học" />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {schedules.map((item) => (
                            <Card
                                key={item._id}
                                title={item.courseId?.title}
                            >
                                <p>
                                    <strong>Giảng viên:</strong>{" "}
                                    {item.instructor}
                                </p>

                                <p>
                                    <strong>Ngày học:</strong>{" "}
                                    {new Date(item.date).toLocaleDateString(
                                        "vi-VN"
                                    )}
                                </p>

                                <p>
                                    <strong>Giờ học:</strong>{" "}
                                    {item.time}
                                </p>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            <Modal
                title={editting
                    ? "Cập nhật lịch học"
                    : "Thêm lịch học"
                }
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSubmitSchedule}
            >
                <Form form={form} layout='vertical'>
                    <Form.Item
                        label="Khóa học"
                        name="courseId"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn khóa học"
                            }
                        ]}
                    >
                        <Select
                            options={
                                courses.map(course => ({
                                    label: course.title,
                                    value: course._id
                                }))
                            } />
                    </Form.Item>
                    <Form.Item
                        label="Giảng viên"
                        name="instructor"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên giảng viên'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Ngày học"
                        name="date"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn ngày học"
                            }
                        ]}
                    >
                        <DatePicker
                            className="w-full"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Giờ học"
                        name="time"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn giờ học'
                            }
                        ]}
                    >
                        <TimePicker
                            className="w-full"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default ScheduleManager;
