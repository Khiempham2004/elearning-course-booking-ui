/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react';
import { Avatar, Card, Row, Col, Typography, Spin, Progress, Empty, Button, Tag } from 'antd';
import { BookOutlined, CheckCircleOutlined, UserOutlined, ClockCircleOutlined, FireOutlined } from '@ant-design/icons';
import { getUserProfile } from '../../service/user.service';
import { getMyCourses } from '../../service/enrollment.service';
import { getToken } from '../../utils/Auth';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

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

const UserDashboard = () => {
    const [user, setUser] = useState({});
    const [course, setCourse] = useState([]);

    const [stats, setStats] = useState({
        totalCourse: 0,
        learning: 0,
        completed: 0
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(false);
                const token = getToken();

                const userRes = await getUserProfile();
                const courseRes = await getMyCourses(token);

                console.log('userRes : ', userRes);
                console.log('courseRes : ', courseRes);
                console.log(courseRes.data);

                const courseData = Array.isArray(courseRes?.data?.courses)
                    ? courseRes?.data?.courses
                    : [];

                courseData.forEach((item, index) => {
                    console.log(`Course ${index} : `, item.status);
                });

                setUser(userRes?.data);
                setCourse(courseData);


                setStats({
                    totalCourse: courseData.length,
                    learning: courseData.filter(c => c.status === 'approved').length,
                    completed: courseData.filter(c => c.status === 'completed').length,
                });

            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Spin size='large' />
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'blue';
            case 'completed': return 'green';
            case 'pending': return 'orange';
            case 'rejected': return 'red';
            default: return 'default';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'approved': return '✅ APRROVED';
            case 'completed': return '🎓 COMPLETED';
            case 'pending': return '⏳ PENDING';
            case 'rejected': return '❌ REJECTED';
            default: return status;
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '40px 20px'
        }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

                {/* WELCOME HEADER */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '20px',
                    padding: '40px',
                    marginBottom: '30px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <Row align="middle" gutter={24}>
                        <Col>
                            <Avatar
                                size={100}
                                style={{
                                    backgroundColor: '#667eea',
                                    fontSize: '45px',
                                    border: '4px solid #667eea'
                                }}
                            >
                                {user?.name?.charAt(0).toUpperCase() || <UserOutlined />}
                            </Avatar>
                        </Col>
                        <Col flex="auto">
                            <div>
                                <Title level={2} style={{ margin: '0 0 8px 0' }}>
                                    👋 Xin chào, {user?.name}
                                </Title>
                                <Text style={{ fontSize: '16px', color: '#666' }}>
                                    {user?.email} • <strong>{user?.role}</strong>
                                </Text>
                                <div style={{ marginTop: '12px' }}>
                                    <Text type="secondary">
                                        Hãy tiếp tục học và phát triển kỹ năng của bạn 🚀
                                    </Text>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>

                {/* STATS CARDS */}
                <Row gutter={[20, 20]} style={{ marginBottom: '40px' }}>
                    {/* Total Courses */}
                    <Col xs={24} sm={12} lg={8}>
                        <Card
                            style={{
                                borderRadius: '16px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                cursor: 'pointer',
                                padding: '30px'
                            }}
                            hoverable
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
                            }}
                        >
                            <div style={{ textAlign: 'center' }}>
                                <BookOutlined style={{ fontSize: '40px', marginBottom: '12px' }} />
                                <div style={{ fontSize: '36px', fontWeight: 'bold', margin: '8px 0' }}>
                                    {stats.totalCourse}
                                </div>
                                <div style={{ fontSize: '14px', opacity: 0.9 }}>
                                    Tổng Khóa Học
                                </div>
                            </div>
                        </Card>
                    </Col>

                    {/* Learning */}
                    <Col xs={24} sm={12} lg={8}>
                        <Card
                            style={{
                                borderRadius: '16px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                color: 'white',
                                boxShadow: '0 10px 30px rgba(245, 87, 108, 0.3)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                cursor: 'pointer',
                                padding: '30px'
                            }}
                            hoverable
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(245, 87, 108, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(245, 87, 108, 0.3)';
                            }}
                        >
                            <div style={{ textAlign: 'center' }}>
                                <FireOutlined style={{ fontSize: '40px', marginBottom: '12px' }} />
                                <div style={{ fontSize: '36px', fontWeight: 'bold', margin: '8px 0' }}>
                                    {stats.learning}
                                </div>
                                <div style={{ fontSize: '14px', opacity: 0.9 }}>
                                    Đang Học
                                </div>
                            </div>
                        </Card>
                    </Col>

                    {/* Completed */}
                    <Col xs={24} sm={12} lg={8}>
                        <Card
                            style={{
                                borderRadius: '16px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                color: 'white',
                                boxShadow: '0 10px 30px rgba(79, 172, 254, 0.3)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                cursor: 'pointer',
                                padding: '30px'
                            }}
                            hoverable
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(79, 172, 254, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(79, 172, 254, 0.3)';
                            }}
                        >
                            <div style={{ textAlign: 'center' }}>
                                <CheckCircleOutlined style={{ fontSize: '40px', marginBottom: '12px' }} />
                                <div style={{ fontSize: '36px', fontWeight: 'bold', margin: '8px 0' }}>
                                    {stats.completed}
                                </div>
                                <div style={{ fontSize: '14px', opacity: 0.9 }}>
                                    Đã Hoàn Thành
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>

                {/* MY COURSES SECTION */}
                <div>
                    <div style={{ marginBottom: '30px' }}>
                        <Title level={3} style={{ color: 'white', margin: '0 0 8px 0' }}>
                            📚 Khóa Học Của Tôi
                        </Title>
                        <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
                            Theo dõi tiến độ học tập của bạn
                        </Text>
                    </div>

                    {course.length === 0 ? (
                        <Card
                            style={{
                                borderRadius: '16px',
                                textAlign: 'center',
                                padding: '60px 40px',
                                background: 'rgba(255, 255, 255, 0.95)',
                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <Empty
                                description="Chưa có khóa học nào"
                                style={{ marginBottom: '20px' }}
                            />
                            <Text type="secondary">
                                Bạn chưa đăng ký khóa học nào. Hãy khám phá các khóa học mới!
                            </Text>
                            <br />
                            <Button
                                type="primary"
                                size="large"
                                style={{ marginTop: '20px', borderRadius: '8px' }}
                                onClick={() => navigate('/Courses')}
                            >
                                Xem Khóa Học
                            </Button>
                        </Card>
                    ) : (
                        <Row gutter={[20, 20]}>
                            {course.map((item) => {
                                const courseData = item.courseId;
                                const progress = item.progress || (item.status === 'completed' ? 100 : 50);

                                return (
                                    <Col xs={24} sm={12} lg={8} key={item._id}>
                                        <Card
                                            hoverable
                                            style={{
                                                borderRadius: '16px',
                                                border: 'none',
                                                overflow: 'hidden',
                                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                                                transition: 'all 0.3s ease',
                                                height: '100%'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-12px)';
                                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.25)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
                                            }}
                                            cover={
                                                <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                                                    <img
                                                        alt={courseData?.title}
                                                        // src={courseData?.courseImage || `http://localhost:3000/${courseData?.image}`}
                                                        src={getImageUrl(courseData?.image)}
                                                        style={{
                                                            height: '100%',
                                                            width: '100%',
                                                            objectFit: 'cover',
                                                            transition: 'transform 0.3s ease'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.transform = 'scale(1.1)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.transform = 'scale(1)';
                                                        }}
                                                    />
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '12px',
                                                        right: '12px',
                                                        fontSize: '16px',
                                                        zIndex: 10
                                                    }}>
                                                        <Tag color={getStatusColor(item.status)}>
                                                            {getStatusLabel(item.status)}
                                                        </Tag>
                                                    </div>
                                                </div>
                                            }
                                        >
                                            <Title level={5} style={{ marginBottom: '12px' }}>
                                                {courseData?.title}
                                            </Title>

                                            <div style={{ marginBottom: '16px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                                    <Text type="secondary" style={{ fontSize: '12px' }}>
                                                        Tiến độ
                                                    </Text>
                                                    <Text strong style={{ fontSize: '12px' }}>
                                                        {progress}%
                                                    </Text>
                                                </div>
                                                <Progress
                                                    percent={progress}
                                                    size="small"
                                                    status={item.status === 'completed' ? 'success' : item.status === 'pending' ? 'exception' : 'active'}
                                                    strokeColor={
                                                        item.status === 'completed'
                                                            ? '#52c41a'
                                                            : item.status === 'pending'
                                                                ? '#ff4d4f'
                                                                : '#1890ff'
                                                    }
                                                />
                                            </div>

                                            <Row gutter={12} style={{ marginTop: '12px' }}>
                                                <Col span={12}>
                                                    <Text type="secondary" style={{ fontSize: '12px', display: 'flex', alignItems: 'center' }}>
                                                        <BookOutlined style={{ marginRight: '4px' }} />
                                                        {courseData?.lessons} bài
                                                    </Text>
                                                </Col>
                                                <Col span={12}>
                                                    <Text type="secondary" style={{ fontSize: '12px', display: 'flex', alignItems: 'center' }}>
                                                        <ClockCircleOutlined style={{ marginRight: '4px' }} />
                                                        {courseData?.level}
                                                    </Text>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
