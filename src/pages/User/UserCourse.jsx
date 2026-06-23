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
    Row,
    Col,
    Select,
} from 'antd';
import {
    createCourse,
    updateCourse,
    deleteCourse
} from '../../service/course.service';
import { getToken } from '../../utils/Auth';
import { UploadOutlined } from '@ant-design/icons';
import { getMyCourses } from '../../service/enrollment.service';
import './User.css'
const { Title, Text } = Typography;

const imageModules = import.meta.glob("../../assets/Images/*", { eager: true });


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

const UserCourse = () => {
    const [detailopen, setDetailOpening] = useState(false);
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
        setCourseFile(null);
        setInstructorFile(null);
        setDetailOpening(true);
    };

    const handleEditing = (record) => {
        setEditingCourse(record);
        setCourseFile(null);
        setInstructorFile(null);
        form.setFieldsValue({
            title: record.title,
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
        setDetailOpening(true);
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
            const token = getToken(id);
            const formData = new FormData();

            formData.append("title", values.title);
            formData.append("lessons", values.lessons);
            formData.append("price", values.price);
            formData.append("level", values.level);
            formData.append("rating", values.rating);
            formData.append("reviews", values.reviews);
            formData.append("instructor", values.instructor);
            formData.append("catagory", values.catagory);

            // Append files only if they exist
            if (courseFile instanceof File) {
                formData.append("courseImage", courseFile);
            }

            if (instructorFile instanceof File) {
                formData.append("instructorImage", instructorFile);
            }

            if (editingCourse) {
                const resEdit = await updateCourse(
                    editingCourse._id,
                    formData,
                    token
                );
                setCourses(prev => prev.map(course => course._id === editingCourse._id ? resEdit.data.data : course));
                message.success("Cập nhật khóa học thành công");
            } else {
                await createCourse(formData, token);
                message.success("Thêm khóa học thành công");
                // Reload data
            }

            form.resetFields();
            setDetailOpening(false);
            setCourseFile(null);
            setInstructorFile(null);
            await fetchCourse();
        } catch (error) {
            console.log(error);
            message.error("Có lỗi xảy ra: " + (error.response?.data?.message || error.message))
        }
    };

    const columns = [
        {
            title: 'Course Image',
            dataIndex: 'courseImage',
            key: 'courseImage',

            render: (_, record) => (
                <Image
                    src={getImageUrl(record.courseImage)}
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
            title: 'Lessons',
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
            title: 'Level',
            dataIndex: 'level',
            key: 'level',

            render: (level) => (
                <Tag color="blue">
                    {level}
                </Tag>
            ),
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',

            render: (rating) => (
                <Tag color="gold">
                    ⭐ {rating}
                </Tag>
            ),
        },
        {
            title: 'Reviews',
            dataIndex: 'reviews',
            key: 'reviews',
        },

        {
            title: 'Instructor Image',
            dataIndex: 'instructor Image',
            key: 'instructor',

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
                        src={getImageUrl(record.instructorImage)}
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
                    <Popconfirm
                        title='Bạn có chắc muốn xóa không?'
                        onConfirm={() => handleDelete(record._id)}
                        okText='Yes'
                        cancelText='No'
                    >
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
                    open={detailopen}
                    onCancel={() => {
                        setDetailOpening(false);
                        form.resetFields();
                    }}
                    onOk={handleSubmit}
                    width={800}
                    centered
                    destroyOnHidden
                    title={
                        <div
                            style={{
                                fontSize: 28,
                                fontWeight: 700,
                                color: "#1677ff",
                            }}
                        >
                            {editingCourse ? "✏️ Edit Course" : "📚 Add New Course"}
                        </div>
                    }
                    okText={editingCourse ? "Update Course" : "Create Course"}
                    cancelText="Cancel"
                    styles={{
                        body: {
                            paddingTop: 12,
                        },
                    }}
                >
                    <Card
                        bordered={false}
                        style={{
                            borderRadius: 20,
                            boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                        }}
                    >
                        <Form
                            form={form}
                            layout="vertical"
                        >
                            <Row gutter={[24, 24]}>
                                <Col xs={24} md={12}>
                                    <Card
                                        size="small"
                                        title="Course Image"
                                        style={{
                                            borderRadius: 12,
                                        }}
                                    >
                                        <Upload
                                            beforeUpload={(file) => {
                                                setCourseFile(file);
                                                return false;
                                            }}
                                            onRemove={() => setCourseFile(null)}
                                            listType="picture-card"
                                            maxCount={1}
                                        >
                                            <div>
                                                <UploadOutlined />
                                                <div style={{ marginTop: 8 }}>
                                                    Upload
                                                </div>
                                            </div>
                                        </Upload>
                                    </Card>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Form.Item
                                        label="Course Title"
                                        name="title"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter course title",
                                            },
                                        ]}
                                    >
                                        <Input
                                            size="large"
                                            placeholder="Course title..."
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Form.Item
                                        label="Lessons"
                                        name="lessons"
                                    >
                                        <InputNumber
                                            style={{ width: "100%" }}
                                            size="large"
                                            min={1}
                                            placeholder="Number of lessons"
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Form.Item
                                        label="Price ($)"
                                        name="price"
                                    >
                                        <InputNumber
                                            style={{ width: "100%" }}
                                            size="large"
                                            min={0}
                                            placeholder="Course price"
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Form.Item
                                        label="Level"
                                        name="level"
                                    >
                                        <Select
                                            size="large"
                                            placeholder="Select level"
                                            options={[
                                                {
                                                    label: "Beginner",
                                                    value: "Beginner",
                                                },
                                                {
                                                    label: "Intermediate",
                                                    value: "Intermediate",
                                                },
                                                {
                                                    label: "Advanced",
                                                    value: "Advanced",
                                                },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Form.Item
                                        label="Rating"
                                        name="rating"
                                    >
                                        <InputNumber
                                            min={0}
                                            min={5}
                                            min={0.1}
                                            styles={{
                                                width: '100%'
                                            }}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Form.Item
                                        label="Reviews"
                                        name="reviews"
                                    >
                                        <Input
                                            size="large"
                                            placeholder="Reviews..."
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Form.Item
                                        label="Instructor"
                                        name="instructor"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter instructor",
                                            },
                                        ]}
                                    >
                                        <Input
                                            size="large"
                                            placeholder="Instructor..."
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Card
                                        size="small"
                                        title="Instructor Image"
                                        style={{
                                            borderRadius: 12,
                                        }}
                                    >
                                        <Upload
                                            beforeUpload={(file) => {
                                                setInstructorFile(file);
                                                return false;
                                            }}
                                            onRemove={() => setInstructorFile(null)}
                                            listType="picture-card"
                                            maxCount={1}
                                        >
                                            <div>
                                                <UploadOutlined />
                                                <div style={{ marginTop: 8 }}>
                                                    Upload
                                                </div>
                                            </div>
                                        </Upload>
                                    </Card>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Form.Item
                                        label="Category"
                                        name="catagory"
                                    >
                                        <Select
                                            size="large"
                                            showSearch
                                            placeholder="Select category"
                                            options={[
                                                {
                                                    label: "Marketing",
                                                    value: "Marketing",
                                                },
                                                {
                                                    label: "Programming",
                                                    value: "Programming",
                                                },
                                                {
                                                    label: "Business",
                                                    value: "Business",
                                                },
                                                {
                                                    label: "Design",
                                                    value: "Design",
                                                },
                                                {
                                                    label: "AI",
                                                    value: "AI",
                                                },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Modal>
            </Card>
        </div>
    );
};

export default UserCourse;