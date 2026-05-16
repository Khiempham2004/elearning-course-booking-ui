import React, { useEffect, useState } from 'react';

import {
    Table,
    Tag,
    Image,
    Empty,
    Spin,
    message,
    Card,
    Typography,
    Form,
    Popconfirm,
    Button,
    Modal,
    Input,
    InputNumber,
    Upload,
} from 'antd';
import { getMyCourses } from '../../service/enrollment.service';
import {
    createCourse,
    updateCourse,
    deleteCourse
} from '../../service/course.service';
import { getToken } from '../../utils/Auth';
import { UploadOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;



// const getLocalImage = (courseImage) => {
//     if (!courseImage) return "";
//     const filename = courseImage.split("/").pop();
//     const key = Object.keys().find((k) => k.includes(filename));
//     return key ? [key].default : "";

// };

const UserCourse = () => {
    const [open, setOpening] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [form] = Form.useForm();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [courseFile, setCourseFile] = useState(null);
    const [instructorFile, setInstructorFile] = useState(null);


    const fetchCourse = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const res = await getMyCourses(token);
            console.log("API :", res.data);

            setCourses(res.data.courses || []);

        } catch (error) {
            console.log(error);
            message.error('Không thể lấy danh sách khóa học!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourse();
    }, []);

    const handleAdd = async () => {
        setEditingCourse(null);
        form.resetFields();
        setOpening(true);
    };

    const handleEditing = (record) => {
        setEditingCourse(record);
        form.setFieldsValue({
            title: record.title,
            // ...item.courseId,
            lessons: record.lessons,
            price: record.price,
            level: record.level,
            rating: record.rating,
            reviews: record.reviews,
            instructor: record.instructor,
            instructorImage: record.instructorImage,
            catagory: record.catagory,
            courseImage: record.courseImage,
        });
        setOpening(true);
    };

    const handleDelete = async (id) => {
        try {
            const token = getToken();

            await deleteCourse(id, token);

            fetchCourse();
            message.success("Xóa khóa học thành công");
        } catch (error) {
            console.log(error);
            message.error("Xóa thất bại")
        }
    }

    const handleSubmit = async (id) => {
        try {
            const values = await form.validateFields();
            const token = getToken();
            const formData = new FormData();

            formData.append(
                "title",
                values.title
            );

            formData.append(
                "lessons",
                values.lessons
            );

            formData.append(
                "price",
                values.price
            );

            formData.append(
                "level",
                values.level
            );

            formData.append(
                "rating",
                values.rating
            );

            formData.append(
                "reviews",
                values.reviews
            );

            formData.append(
                "instructor",
                values.instructor
            );
            if (instructorFile) {
                formData.append("instructorImage", instructorFile);
                // await axios.post("/api/upload", formData,
                //     {
                //         headers: {
                //             "Content-Type": "multipart/form-data",
                //         },
                //     }
                // );
            };

            formData.append(
                "catagory",
                values.catagory
            );

            if (courseFile) {
                formData.append("courseImage", courseFile);
            };


            if (editingCourse) {
                const resEdit = await updateCourse(
                    editingCourse._id,
                    formData,
                    token
                );
                setCourses(prev => prev.map(course => course.id === id ? resEdit.data : course));

                message.success("Cập nhật khóa học thành công");
            } else {
                await createCourse(formData, token);

                message.success("Thêm khóa học thành công");
                fetchCourse();
            }

            setOpening(false);

            form.resetFields();
            setCourseFile(null);

            setInstructorFile(null);
        } catch (error) {
            console.log(error);
            message.error("Có lỗi xảy ra")
        }
    };

    const columns = [
        {
            title: 'Course Image',
            dataIndex: 'courseImage',
            key: 'courseImage',

            render: (_, record) => (
                <Image
                    src={record.courseImage}
                    width={100}
                    height={60}
                    style={{
                        objectFit: 'cover',
                        borderRadius: 8,
                    }}
                />
            ),
        },

        {
            title: 'Course Name',
            dataIndex: 'title',
            key: 'title',
            width: 400,
            render: (title) => (
                <Text strong>{title}</Text>
            ),
        },

        {
            title: 'lessons',
            dataIndex: 'lessons',
            key: 'lessons',

            render: (lessons) => (
                <Text type="secondary">
                    {lessons || 'Không có mô tả'}
                </Text>
            ),
        },

        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',

            render: (price) => (
                <Text strong style={{ color: '#1677ff' }}>
                    ${price}
                </Text>
            ),
        },

        {
            title: 'level',
            dataIndex: 'level',
            key: 'level',

            render: (level) => (
                <Tag color="blue">
                    {level}
                </Tag>
            ),
        },
        {
            title: 'rating',
            dataIndex: 'rating',
            key: 'rating',

            render: (rating) => (
                <Tag color="gold">
                    ⭐ {rating}
                </Tag>
            ),
        },
        {
            title: 'reviews',
            dataIndex: 'reviews',
            key: 'reviews',
        },

        {
            title: 'Instructor Image',
            dataIndex: 'instructor Image',
            key: 'instructor',
            // width: 220,

            render: (_, record) => (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        whiteSpace: 'nowrap',
                    }}
                >
                    <Image
                        src={record.instructorImage}
                        width={42}
                        height={42}
                        preview={false}
                        style={{
                            borderRadius: '50%',
                            objectFit: 'cover',
                            flexShrink: 0,
                        }}
                    />

                    <Text
                        strong
                        style={{
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {record.instructor}
                    </Text>
                </div>
            )
        },

        {
            title: "Catagory",
            dataIndex: 'catagory',
            key: 'catagory',
            render: (catagory) => (
                <Tag color='purple'>
                    {catagory}
                </Tag>
            )
        },

        {
            title: "Action",
            dataIndex: "action",
            key: "action",

            render: (_, record) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button type="primary" onClick={() => handleEditing(record)}>
                        Edit
                    </Button>
                    <Popconfirm title='Bạn có chắc muốn xóa không?' onConfirm={() => handleDelete(record._id)}>
                        <Button danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </div>
            )
        }

    ];

    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: 100 }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!courses || courses.length === 0) {
        return (
            <div style={{ marginTop: 100 }}>
                <Empty description="Bạn chưa có khóa học nào!" />
            </div>
        );
    }

    return (
        <div
            style={{
                padding: 24,
                background: '#f5f7fa',
                minHeight: '100vh',
            }}
        >
            <Card
                style={{
                    borderRadius: 16,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                }}
            >
                <Title level={3}>
                    📚 My Courses
                </Title>
                <Button type="primary" onClick={handleAdd}>
                    + Add Course
                </Button>

                <Table
                    columns={columns}
                    dataSource={courses}
                    rowKey="_id"
                    pagination={{ pageSize: 5 }}
                />

                <Modal
                    open={open}
                    onCancel={() => setOpening(false)}
                    onOk={handleSubmit}
                    maskClosable={false}
                    destroyOnClose
                    title={
                        editingCourse
                            ? "Edit Course"
                            : "Add Course"
                    }
                >
                    <Form
                        layout="vertical"
                        form={form}

                    >
                        <Form.Item
                            label="Course Image"
                        >
                            <Upload
                                name="courseImage"
                                beforeUpload={(file) => {
                                    console.log("Course file selected:", file);
                                    setCourseFile(file);
                                    return false; // Prevent auto upload
                                }}
                                onRemove={() => {
                                    setCourseFile(null);
                                }}
                                maxCount={1}
                                listType='picture'
                                fileList={courseFile ? [{
                                    uid: '1',
                                    name: courseFile.name,
                                    status: 'done'
                                }] : []}
                            >
                                <Button icon={<UploadOutlined />}>
                                    Upload Course Image
                                </Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Nhập tên khóa học",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="lessons"
                            name="lessons"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Price"
                            name="price"
                        >
                            <InputNumber
                                style={{ width: "100%" }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Level"
                            name="level"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="rating"
                            name="rating">
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="reviews"
                            name="reviews"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label='Instructor'
                            name='instructor'
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập trên instructor'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Instructor Image"
                        >
                            <Upload
                                name="instructorImage"
                                beforeUpload={(file) => {
                                    console.log("Instructor file selected:", file);
                                    setInstructorFile(file);
                                    return false; // Prevent auto upload
                                }}
                                onRemove={() => {
                                    setInstructorFile(null);
                                }}
                                maxCount={1}
                                listType='picture'
                                fileList={instructorFile ? [{
                                    uid: '2',
                                    name: instructorFile.name,
                                    status: 'done'
                                }] : []}
                            >
                                <Button icon={<UploadOutlined />}>
                                    Upload Instructor Image
                                </Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            label="Category"
                            name="catagory"
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </div>
    );
};

export default UserCourse;