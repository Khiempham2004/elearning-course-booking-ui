import { Card, Row, Col, Statistic, Table, Tag, Button, Space, Tooltip, Spin, message } from 'antd';
import { UserOutlined, FileTextOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { getMyCreatedCourses } from '../../service/course.service.js';
import { useEffect } from 'react';
import { getTeacherDashboard } from '../../service/user.service.js';

const imageModules = import.meta.glob("../../assets/Images/*", { eager: true });


const getLocalImage = (courseImage) => {
    if (!courseImage) return "";

    // ảnh upload từ server
    if (courseImage.startsWith("/uploads")) {
        return `http://localhost:5000${courseImage}`;
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

const TeacherDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        const getAllCreateCourses = async () => {
            try {
                setLoading(true);
                const response = await getMyCreatedCourses();
                const dashboardRes = await getTeacherDashboard(); // Nếu có API riêng cho dashboard, gọi ở đây

                // const userCreatedCourses = response.data.data || [];
                // console.log("Khóa học do user tạo:", userCreatedCourses);

                const createdCourses = response.data.data || [];
                setCourses(response.data.data || []);
                setUser(dashboardRes.data.user); // Nếu có API riêng cho dashboard, lấy thông tin user từ đó 

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

    const handleDetail = () => {
        message.info('Xem teacher')
    }

    const columns = [
        {
            title: 'Ảnh khóa học',
            dataIndex: 'courseImage',
            key: 'courseImage',
            render: (_, record) => (
                <img
                    src={getImageUrl(record.courseImage)}
                    width={100}
                    height={60}
                    style={{
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
                        onClick={() => handleDetail(record)}
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
                                styles={{ color: '#1890ff' }}
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
                                styles={{ color: '#52c41a' }}
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
                                styles={{ color: '#faad14' }}
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
                                styles={{ color: '#722ed1' }}
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
