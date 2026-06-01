import { Card, Row, Col, Descriptions, Avatar, Button, Space, Statistic, Divider } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';

const TeacherProfile = () => {
    const [editMode, setEditMode] = useState(false);
    const [courses, setCourses] = useState([]);

    const teacher = {
        fullname: 'Nguyễn Thanh Tuấn',
        email: 'teacher@example.com',
        phone: '0912345678',
        department: 'Công nghệ Thông tin',
        joinDate: '2025-01-15',
        bio: 'Giảng viên chuyên ngành công nghệ phần mềm, chuyên về phát triển web và mobile.',
        avatar: null,
    };

    const stats = {
        totalStudents: 45,
        totalReports: 45,
        approvedReports: 38,
        gradedReports: 43,
    };
    // const stats = {
    //     total: courses.length,
    //     avgPrice: courses.length > 0
    //         ? (courses.reduce((sum, c) => sum + (c.price || 0), 0) / courses.length).toFixed(2)
    //         : 0,
    //     avgRating: courses.length > 0
    //         ? (courses.reduce((sum, c) => sum + (parseFloat(c.rating) || 0), 0) / courses.length).toFixed(2)
    //         : 0,
    // };

    return (
        <div>
            {/* Profile Header */}
            <Card style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', marginBottom: 20 }}>
                <Row gutter={24}>
                    <Col xs={24} sm={6} style={{ textAlign: 'center' }}>
                        <Avatar
                            size={120}
                            icon={<UserOutlined />}
                            style={{ backgroundColor: '#1890ff', fontSize: 40 }}
                        />
                        <h2 style={{ marginTop: 16, marginBottom: 0 }}>{teacher.fullname}</h2>
                        <p style={{ color: '#999', marginTop: 4 }}>{teacher.department}</p>
                    </Col>

                    <Col xs={24} sm={18}>
                        <Descriptions bordered size="small">
                            <Descriptions.Item label="Email" span={3}>
                                <MailOutlined /> {teacher.email}
                            </Descriptions.Item>
                            <Descriptions.Item label="Điện thoại" span={3}>
                                <PhoneOutlined /> {teacher.phone}
                            </Descriptions.Item>
                            <Descriptions.Item label="Bộ môn" span={3}>
                                <EnvironmentOutlined /> {teacher.department}
                            </Descriptions.Item>
                            <Descriptions.Item label="Ngày tham gia" span={3}>
                                {teacher.joinDate}
                            </Descriptions.Item>
                        </Descriptions>

                        <Divider />

                        <p><strong>Về tôi:</strong></p>
                        <p style={{ color: '#666' }}>{teacher.bio}</p>

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
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Tổng sinh viên"
                            value={stats.totalStudents}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Tổng báo cáo"
                            value={stats.totalReports}
                            valueStyle={{ color: '#faad14' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Đã chấm"
                            value={stats.gradedReports}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Đã phê duyệt"
                            value={stats.approvedReports}
                            valueStyle={{ color: '#722ed1' }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Activity */}
            <Card
                title="📊 Hoạt động gần đây"
                style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
            >
                <ul style={{ paddingLeft: 20 }}>
                    <li>Chấm điểm báo cáo của Nguyễn Văn A - 2026-06-01</li>
                    <li>Phê duyệt báo cáo của Trần Thị B - 2026-05-31</li>
                    <li>Cập nhật cài đặt - 2026-05-30</li>
                    <li>Tạo tài khoản giáo viên - 2026-05-25</li>
                </ul>
            </Card>
        </div>
    );
};

export default TeacherProfile;
