import React, { useEffect, useState } from 'react';
import {
    Table,
    Card,
    Button,
    Modal,
    Form,
    Input,
    InputNumber,
    Upload,
    message,
    Space,
    Tag,
    Image,
    Row,
    Col,
    Statistic,
    Popconfirm,
    Select,
    Typography,
} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    ReloadOutlined,
    SearchOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { createCourse, updateCourse, deleteCourse, getAllCourse } from '../../service/course.service';
import { getToken } from '../../utils/Auth';
import { resolveApiAssetUrl } from '../../utils/apiUrl';

const { Title, Text } = Typography;
const { Option } = Select;

const imageModules = import.meta.glob("../../assets/Images/*", { eager: true });

// const getLocalImage = (courseImage) => {
//     if (!courseImage) return "";
//     const filename = courseImage.split("/").pop();
//     const key = Object.keys(imageModules).find((k) => k.includes(filename));
//     return key ? imageModules[key].default : courseImage;
// };

const getLocalImage = (courseImage) => {
    if (!courseImage) return "";

    // ảnh upload từ server
    if (courseImage.startsWith("/uploads")) {
        return resolveApiAssetUrl(courseImage);
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
        return resolveApiAssetUrl(imagePath);
    };
    return getLocalImage(imagePath);
}

const CourseManager = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [form] = Form.useForm();
    const [courseFile, setCourseFile] = useState(null);
    const [instructorFile, setInstructorFile] = useState(null);
    const [courseFileList, setCourseFileList] = useState([]);
    const [instructorFileList, setInstructorFileList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const res = await getAllCourse();
            setCourses(res?.data?.data || []);
        } catch (error) {
            console.log(error);
            message.error('Failed to fetch courses');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleAddCourse = () => {
        setEditingCourse(null);
        form.resetFields();
        setCourseFile(null);
        setInstructorFile(null);
        setCourseFileList([]);
        setInstructorFileList([]);
        setModalOpen(true);
    };

    const handleEditCourse = (record) => {
        setEditingCourse(record);
        setCourseFile(null);
        setInstructorFile(null);
        setCourseFileList([]);
        setInstructorFileList([]);
        form.setFieldsValue({
            title: record.title,
            lessons: record.lessons,
            price: record.price,
            level: record.level,
            rating: record.rating,
            reviews: record.reviews,
            instructor: record.instructor,
            catagory: record.catagory,
            enrollLink: record.enrollLink,
        });
        setModalOpen(true);
    };

    const handleDeleteCourse = async (id) => {
        try {
            const token = getToken();
            await deleteCourse(id, token);
            message.success('Course deleted successfully');
            fetchCourses();
        } catch (error) {
            console.log(error);
            message.error('Failed to delete course');
        }
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const token = getToken();
            const formData = new FormData();


            formData.append('title', values.title);
            formData.append('lessons', values.lessons);
            formData.append('price', values.price);
            formData.append('level', values.level);
            formData.append('rating', values.rating);
            formData.append('reviews', values.reviews);
            formData.append('instructor', values.instructor);
            formData.append('catagory', values.catagory);
            formData.append('enrollLink', values.enrollLink || '');

            if (courseFile instanceof File) {
                formData.append('courseImage', courseFile);
            }

            if (instructorFile instanceof File) {
                formData.append('instructorImage', instructorFile);
            }


            if (editingCourse) {
                await updateCourse(editingCourse._id, formData, token);
                message.success('Cập nhật khóa học thành công');
            } else {
                await createCourse(formData, token);
                message.success('Thêm mới khóa học thành công');
            }

            setModalOpen(false);
            form.resetFields();
            setCourseFile(null);
            setInstructorFile(null);
            await fetchCourses();
        } catch (error) {
            console.log("ERROR:", error);
            console.log("RESPONSE:", error.response?.data);
            message.error("Có lỗi xảy ra + : ", (error.response?.data?.message || error.message));
        }
    };

    const filteredCourses = courses.filter((course) => {
        const matchSearch =
            course?.title?.toLowerCase().includes(searchText.toLowerCase()) ||
            course?.instructor?.toLowerCase().includes(searchText.toLowerCase());

        const matchCategory =
            categoryFilter === 'all' ? true : course?.catagory === categoryFilter;

        return matchSearch && matchCategory;
    });

    const categories = [...new Set(courses.map(c => c?.catagory).filter(Boolean))];

    const columns = [
        {
            title: 'Course Image',
            dataIndex: 'courseImage',
            key: 'courseImage',
            width: 120,
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
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: 200,
            render: (title) => <Text strong>{title}</Text>,
        },
        {
            title: 'Instructor',
            dataIndex: 'instructor',
            key: 'instructor',
            render: (_, record) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Image
                        src={getImageUrl(record.instructorImage)}
                        width={32}
                        height={32}
                        preview={false}
                        style={{
                            borderRadius: '50%',
                            objectFit: 'cover',
                        }}
                    />
                    <Text>{record.instructor}</Text>
                </div>
            ),
        },
        {
            title: 'Category',
            dataIndex: 'catagory',
            key: 'catagory',
            render: (catagory) => (
                <Tag color="blue">{catagory}</Tag>
            ),
        },
        {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
            render: (level) => (
                <Tag color={level === 'Beginner' ? 'green' : level === 'Intermediate' ? 'orange' : 'red'}>
                    {level}
                </Tag>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <Text strong style={{ color: '#1677ff' }}>${price}</Text>,
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating) => <Tag color="gold">⭐ {rating}</Tag>,
        },
        {
            title: 'Reviews',
            dataIndex: 'reviews',
            key: 'reviews',
            render: (reviews) => <Text>{reviews}</Text>,
        },
        {
            title: 'Lessons',
            dataIndex: 'lessons',
            key: 'lessons',
            render: (lessons) => <Text type="secondary">{lessons || '-'}</Text>,
        },
        {
            title: 'Action',
            key: 'action',
            width: 150,
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => handleEditCourse(record)}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Delete Course"
                        description="Are you sure you want to delete this course?"
                        onConfirm={() => handleDeleteCourse(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            size="small"
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const stats = {
        total: courses.length,
        avgPrice: courses.length > 0
            ? (courses.reduce((sum, c) => sum + (c.price || 0), 0) / courses.length).toFixed(2)
            : 0,
        avgRating: courses.length > 0
            ? (courses.reduce((sum, c) => sum + (parseFloat(c.rating) || 0), 0) / courses.length).toFixed(2)
            : 0,
    };

    return (
        <div style={{ padding: 24, background: '#f5f7fa', minHeight: '100vh' }}>
            <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
                <Col>
                    <Title level={2} style={{ margin: 0 }}>
                        📚 Course Management
                    </Title>
                    <Text type="secondary">Manage all courses in the system</Text>
                </Col>
                <Col>
                    <Space>
                        <Button icon={<ReloadOutlined />} onClick={fetchCourses}>
                            Refresh
                        </Button>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAddCourse}
                            size="large"
                        >
                            Add Course
                        </Button>
                    </Space>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col xs={24} md={8}>
                    <Card>
                        <Statistic
                            title="Total Courses"
                            value={stats.total}
                            prefix="📖"
                        />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card>
                        <Statistic
                            title="Average Price"
                            value={stats.avgPrice}
                            prefix="💵"
                            suffix="$"
                            precision={2}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card>
                        <Statistic
                            title="Average Rating"
                            value={stats.avgRating}
                            prefix="⭐"
                            precision={2}
                        />
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginBottom: 24 }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Input
                            size="large"
                            placeholder="Search by course title..."
                            prefix={<SearchOutlined />}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </Col>
                    <Col xs={24} md={12}>
                        <Select
                            size="large"
                            style={{ width: '100%' }}
                            value={categoryFilter}
                            onChange={setCategoryFilter}
                            placeholder="Filter by catagory"
                        >
                            <Option value="all">All Categories</Option>
                            {categories.map((cat) => (
                                <Option key={cat} value={cat}>
                                    {cat}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                </Row>
            </Card>

            <Card style={{ borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <Table
                    columns={columns}
                    dataSource={filteredCourses}
                    rowKey="_id"
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: 1200 }}
                />
            </Card>

            <Modal
                title={editingCourse ? 'Edit Course' : 'Add New Course'}
                open={modalOpen}
                onOk={handleSubmit}
                onCancel={() => {
                    setModalOpen(false);
                    form.resetFields();
                    setCourseFile(null);
                    setInstructorFile(null);
                    setCourseFileList([]);
                    setInstructorFileList([]);
                }}
                width={700}
                okText={editingCourse ? 'Update' : 'Create'}
                cancelText="Cancel"
            >
                <Form layout="vertical" form={form}>
                    <Form.Item
                        label="Course Title"
                        name="title"
                        rules={[{
                            required: true, message: 'Please enter course title'
                        }]}
                    >
                        <Input placeholder="e.g., Web Development Basics" />
                    </Form.Item>

                    <Form.Item
                        label="Catagory"
                        name="catagory"
                        rules={[{ required: true, message: 'Please select category' }]}
                    >
                        <Select placeholder="Select category">
                            <Option value="Programming">Programming</Option>
                            <Option value="Design">Design</Option>
                            <Option value="Marketing">Marketing</Option>
                            <Option value="Business">Business</Option>
                            <Option value="Web Design">Web Design</Option>
                            <Option value="Academic">Academic</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Instructor"
                        name="instructor"
                        rules={[{ required: true, message: 'Please enter instructor name' }]}
                    >
                        <Input placeholder="Instructor name" />
                    </Form.Item>

                    <Form.Item
                        label="Level"
                        name="level"
                        rules={[{ required: true, message: 'Please select level' }]}
                    >
                        <Select placeholder="Select level">
                            <Option value="Beginner">Beginner</Option>
                            <Option value="Intermediate">Intermediate</Option>
                            <Option value="Advanced">Advanced</Option>
                        </Select>
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Price ($)"
                                name="price"
                                rules={[{ required: true, message: 'Please enter price' }]}
                            >
                                <InputNumber min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Lessons"
                                name="lessons"
                            >
                                <InputNumber min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Rating"
                                name="rating"
                            >
                                <InputNumber min={0} max={5} step={0.1} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Reviews"
                                name="reviews"
                            >
                                <Input min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="Enrollment Link"
                        name="enrollLink"
                    >
                        <Input placeholder="https://example.com/enroll" />
                    </Form.Item>

                    <Form.Item label="Course Image">
                        <Upload
                            fileList={courseFileList}
                            beforeUpload={(file) => {
                                setCourseFile(file);
                                setCourseFileList([{ uid: '-1', name: file.name, status: 'done', originFileObj: file }]);
                                return false;
                            }}
                            onChange={(info) => {
                                setCourseFileList(info.fileList);
                                if (info.fileList.length > 0) {
                                    setCourseFile(info.fileList[0].originFileObj || info.fileList[0]);
                                } else {
                                    setCourseFile(null);
                                }
                            }}
                            onRemove={() => {
                                setCourseFile(null);
                                setCourseFileList([]);
                            }}
                            maxCount={1} // chon image
                            listType="picture"
                        >
                            <Button icon={<UploadOutlined />}>
                                Upload Course Image
                            </Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item label="Instructor Image">
                        <Upload
                            fileList={instructorFileList}
                            beforeUpload={(file) => {
                                setInstructorFile(file);
                                setInstructorFileList([{ uid: '-1', name: file.name, status: 'done', originFileObj: file }]);
                                return false;
                            }}
                            onChange={(info) => {
                                setInstructorFileList(info.fileList);
                                if (info.fileList.length > 0) {
                                    setInstructorFile(info.fileList[0].originFileObj || info.fileList[0]);
                                } else {
                                    setInstructorFile(null);
                                }
                            }}
                            onRemove={() => {
                                setInstructorFile(null);
                                setInstructorFileList([]);
                            }}
                            maxCount={1}
                            listType="picture"
                        >
                            <Button icon={<UploadOutlined />}>
                                Upload Instructor Image
                            </Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CourseManager;
