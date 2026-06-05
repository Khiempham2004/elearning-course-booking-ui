import { Card, Row, Col, Statistic, Table, Tag, Button, Space, Tooltip, Spin, message } from 'antd';
import { UserOutlined, FileTextOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { getMyCreatedCourses } from '../../service/course.service.js';
import { useEffect } from 'react';
import { getToken } from '../../utils/Auth.js';
import { getMyCourses } from '../../service/enrollment.service.js';

const imageModules = import.meta.glob("../../assets/Images/*",
    {
        eager: true
    }
);
const getLocalImage = (dashboardImage) => {
    if (!dashboardImage) return "";
    const filename = dashboardImage.split("/").pop();
    const key = Object.keys(imageModules).find((k) => k.includes(filename));
    return key ? imageModules[key].default : dashboardImage;
}
const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith('/uploads')) {
        return `http://localhost:3000${imagePath}`;
    };
    return getLocalImage(imagePath);
}

const TeacherDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getAllCreateCourses = async () => {
            try {
                setLoading(true);
                const token = getToken();
                const response = await getMyCreatedCourses(token);
                const getCourses = await getMyCourses();

                console.log("Danh sách tất cả khóa học:", getCourses.data.data);
                
                const userCreatedCourses = response.data.data || [];
                console.log("Khóa học do user tạo:", userCreatedCourses);
                
                const createdCourses = response.data.data || [];
                setCourses(createdCourses);
                console.log("Danh sách khóa học do bạn tạo:", createdCourses);
            } catch (error) {
                console.error("Error fetching created courses:", error);
                setLoading(false);
                message.error(error.response?.data?.message ||
                    "Có lỗi xảy ra khi lấy danh sách khóa học");
            } finally {
                setLoading(false);
            }
        };

        getAllCreateCourses();
    }, []);

    const columns = [
        {
            title: 'Ảnh khóa học',
            dataIndex: 'courseImage',
            key: 'courseImage',
            render: (image) => (
                <img
                    src={getImageUrl(image.courseImage)}
                    alt="course"
                    style={{
                        width: 80,
                        height: 50,
                        objectFit: 'cover',
                        borderRadius: 8
                    }}
                />
            )
        },
        {
            title: 'Tên khóa học',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Giảng viên',
            dataIndex: 'instructor',
            key: 'instructor',
        },
        {
            title: 'Danh mục',
            dataIndex: 'catagory',
            key: 'catagory',
            render: (catagory) => (
                <Tag color="blue">{catagory}</Tag>
            )
        },
        {
            title: 'Cấp độ',
            dataIndex: 'level',
            key: 'level',
            render: (level) => (
                <Tag color="green">{level}</Tag>
            )
        },
        {
            title: 'Số bài học',
            dataIndex: 'lessons',
            key: 'lessons',
        },
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating) => (
                <span>⭐ {rating}</span>
            )
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) =>
                `${Number(price).toLocaleString("vi-VN")} VNĐ`
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) =>
                new Date(date).toLocaleDateString("vi-VN")
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        size="small"
                    >
                        Xem
                    </Button>

                    <Button
                        size="small"
                    >
                        Sửa
                    </Button>

                    <Button
                        danger
                        size="small"
                    >
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];


    return (
        <Spin spinning={loading}>
            <div>
                {/* Statistics */}
                <Row gutter={16} style={{ marginBottom: 24 }}>
                    <Col xs={24} sm={12} lg={6}>
                        <Card>
                            <Statistic
                                title="Tổng khóa học"
                                value={courses.length}
                                prefix={<FileTextOutlined />}
                                valueStyle={{ color: '#1890ff' }}
                            />
                        </Card>
                    </Col>

                    <Col xs={24} sm={12} lg={6}>
                        <Card>
                            <Statistic
                                title="Tổng bài học"
                                value={
                                    courses.reduce(
                                        (total, course) => total + (course.lessons || 0),
                                        0
                                    )
                                }
                                prefix={<CheckCircleOutlined />}
                                valueStyle={{ color: '#52c41a' }}
                            />
                        </Card>
                    </Col>

                    <Col xs={24} sm={12} lg={6}>
                        <Card>
                            <Statistic
                                title="Tổng đánh giá"
                                value={courses.reduce(
                                    (total, course) => total + (course.rating || 0),
                                    0
                                ).toFixed(1)
                                }
                                prefix={<UserOutlined />}
                                valueStyle={{ color: '#faad14' }}
                            />
                        </Card>
                    </Col>

                    <Col xs={24} sm={12} lg={6}>
                        <Card>
                            <Statistic
                                title="Tổng doanh thu"
                                value={
                                    courses.reduce(
                                        (total, course) => total + (course.price || 0),
                                        0
                                    )
                                }
                                prefix={<ClockCircleOutlined />}
                                suffix="VNĐ"
                                valueStyle={{ color: '#722ed1' }}
                            />
                        </Card>
                    </Col>
                </Row>

                <Card
                    title="📚 Danh sách khóa học của bạn"
                    style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
                >
                    <Table
                        rowKey="_id"
                        columns={columns}
                        dataSource={courses}
                        pagination={{ pageSize: 5 }}
                        loading={loading}
                    />
                </Card>
            </div>
        </Spin>
    );
};

export default TeacherDashboard;
