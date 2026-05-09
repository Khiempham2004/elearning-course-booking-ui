/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react';
import { Avatar, Card, Row, Col, Typography, Spin, Progress } from 'antd';
import { BookOutlined, CheckCircleOutlined, UserOutlined } from '@ant-design/icons';
import { getMyCourses, getUserProfile } from '../../service/user.service';

const { Title, Text } = Typography;

const UserManager = () => {
    const [user, setUser] = useState({});
    const [course, setCourse] = useState([]);
    const [stats, setStats] = useState({
        totalCourse: 0,
        learning: 0,
        completed: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await getUserProfile();
                const courseRes = await getMyCourses();

                console.log('userRes : ', userRes);

                console.log('courseRes : ', courseRes);

                const courseData = courseRes?.data?.course || [];


                setUser(userRes?.data);
                setCourse(courseData);

                setStats({
                    totalCourse: courseData.length,
                    learning: courseData.filter(c => c.status === 'approved').length,
                    completed: 0
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
        return <Spin size='large' style={{ marginTop: 100 }} />
    };

    return (
        <div>
            <div style={{ padding: 24, background: '#f5f7fa', minHeight: '100vh' }}>

                <Title level={2}>User Dashboard</Title>

                {/* PROFILE */}
                <Card style={{ borderRadius: 16, marginBottom: 24 }}>
                    <Row align="middle" gutter={16}>
                        <Col>
                            <Avatar size={70} icon={<UserOutlined />} />
                        </Col>
                        <Col>
                            <Title level={4} style={{ margin: 0 }}>
                                {user?.name}
                            </Title>
                            <Text type="secondary">{user?.email}</Text> <br></br>
                        </Col>
                    </Row>
                </Card>

                <Row gutter={16} style={{ marginBottom: 24 }}>
                    <Col span={8}>
                        <Card bordered={false}>
                            <BookOutlined style={{ fontSize: 24 }} />
                            <Title level={3}>{stats.total}</Title>
                            <Text>Total Courses</Text>
                        </Card>
                    </Col>

                    <Col span={8}>
                        <Card bordered={false}>
                            <UserOutlined style={{ fontSize: 24 }} />
                            <Title level={3}>{stats.learning}</Title>
                            <Text>Learning</Text>
                        </Card>
                    </Col>

                    <Col span={8}>
                        <Card bordered={false}>
                            <CheckCircleOutlined style={{ fontSize: 24 }} />
                            <Title level={3}>{stats.completed}</Title>
                            <Text>Completed</Text>
                        </Card>
                    </Col>
                </Row>

                <Title level={4}>My Courses</Title>
                <Row gutter={[16, 16]}>
                    {course.map((item) => {
                        const course = item.courseId;

                        return (
                            <Col span={8} key={item._id}>
                                <Card
                                    hoverable
                                    cover={
                                        <img
                                            alt=""
                                            src={`http://localhost:3000/${course?.image}`}
                                            style={{ height: 180, objectFit: 'cover' }}
                                        />
                                    }
                                    style={{ borderRadius: 12 }}
                                >
                                    <Title level={5}>{course?.title}</Title>

                                    <Progress
                                        percent={item.progress || 50}
                                        status={item.status === 'completed' ? 'success' : 'active'}
                                    />
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </div>
    );
}

export default UserManager;
