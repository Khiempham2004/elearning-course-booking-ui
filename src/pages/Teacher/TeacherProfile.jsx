import { Card, Row, Col, Descriptions, Avatar, Button, Space, Statistic, Divider, Spin, Tag } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { getUserProfile } from '../../service/user.service';

const TeacherProfile = () => {
    const [editMode, setEditMode] = useState(false);
    const [teacher, setTeacher] = useState(null);
    const [stats, setStats] = useState({
        totalCourses: 0,
        totalLessons: 0,
        totalRevenue: 0
    });

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await getUserProfile();
                setTeacher(response.data);
                // Set stats based on teacher data or fetch additional stats
                setStats({
                    totalCourses: response.data.data.totalCourses || 0,
                    totalLessons: response.data.data.totalLessons || 0,
                    totalRevenue: response.data.data.totalRevenue || 0
                });
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, []);

    if (!teacher) {
        return (
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'
            }}>
                <Spin size='large' />
            </div>
        );
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'admin': return '#ff7a45';
            case 'teacher': return '#13c2c2';
            case 'User': return '#1890ff';
            default: return '#1890ff';
        }
    };

    const getRoleLabel = (role) => {
        switch (role) {
            case 'admin': return '👨‍💼 Quản Trị Viên';
            case 'teacher': return '👨‍🏫 Giảng Viên';
            case 'User': return '👨‍🎓 Học Viên';
            default: return role;
        }
    };

    return (
        <div>
            {/* Profile Header */}
            <Card style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', marginBottom: 20 }}>
                <Row gutter={24}>
                    <Col xs={24} sm={6} style={{ textAlign: 'center' }}>
                        <Avatar
                            size={120}
                            icon={<UserOutlined />}
                            style={{
                                backgroundColor: '#1890ff',
                                fontSize: 40
                            }}
                        />

                        <h2>{teacher.fullname}</h2>

                        <Tag color="cyan">
                            {teacher.role?.toUpperCase()}
                        </Tag>
                    </Col>

                    <Col xs={24} sm={18}>
                        <Descriptions bordered size="small">
                            <Descriptions.Item label="Email" span={3}>
                                <MailOutlined /> {teacher.email}
                            </Descriptions.Item>

                            <Descriptions.Item color={getRoleColor(teacher.role)} label="Vai trò" span={3}>
                                {getRoleLabel(teacher.role)}
                            </Descriptions.Item>

                            <Descriptions.Item label="ID" span={3}>
                                {teacher._id}
                            </Descriptions.Item>
                        </Descriptions>
                        <Divider />

                        <p><strong>Về tôi:</strong></p>
                        <p style={{ color: '#666' }}>{teacher.bio || "Chưa có thông tin giới thiệu"}</p>

                        <Space style={{ marginTop: 16 }}>
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => setEditMode(!editMode)}
                            >
                                Chỉnh sửa thông tin
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Card>

            {/* Statistics */}
            <Row gutter={16} style={{ marginBottom: 20 }}>
                <Col xs={24} sm={8}>
                    <Card>
                        <Statistic
                            title="Khóa học đã tạo"
                            value={stats.totalCourses}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={8}>
                    <Card>
                        <Statistic
                            title="Tổng bài học"
                            value={stats.totalLessons}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={8}>
                    <Card>
                        <Statistic
                            title="Doanh thu"
                            value={stats.totalRevenue}
                            suffix="VNĐ"
                            valueStyle={{ color: '#722ed1' }}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default TeacherProfile;
