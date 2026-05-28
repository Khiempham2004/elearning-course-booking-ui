import React, { useEffect, useState } from 'react';
import { Card, Spin, Typography, Row, Col, Empty, Button, Divider } from 'antd';
import { UserOutlined, MailOutlined, CopyOutlined } from '@ant-design/icons';
import { getUserProfile } from '../../service/user.service';
import './User.css'

const { Title, Text } = Typography;

const UserProfile = () => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getUserProfile();
                setUsers(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProfile();
    }, []);

    if (!users) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Spin size='large' />
            </div>
        );
    }

    const getRoleColor = (role) => {
        switch(role) {
            case 'admin': return '#ff7a45';
            case 'teacher': return '#13c2c2';
            case 'User': return '#1890ff';
            default: return '#1890ff';
        }
    };

    const getRoleLabel = (role) => {
        switch(role) {
            case 'admin': return '👨‍💼 Quản Trị Viên';
            case 'teacher': return '👨‍🏫 Giảng Viên';
            case 'User': return '👨‍🎓 Học Viên';
            default: return role;
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '40px 20px'
        }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                
                {/* Main Profile Card */}
                <Card
                    style={{
                        borderRadius: '20px',
                        border: 'none',
                        overflow: 'hidden',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    {/* Header Background */}
                    <div style={{
                        height: '140px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute',
                            bottom: '-50px',
                            left: '40px'
                        }}>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                background: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '50px',
                                fontWeight: 'bold',
                                color: '#667eea',
                                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                                border: '5px solid #667eea'
                            }}>
                                {users?.name?.charAt(0).toUpperCase() || <UserOutlined />}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '70px 40px 40px' }}>
                        {/* Name & Role */}
                        <div style={{ marginBottom: '30px' }}>
                            <Title level={2} style={{ margin: '0 0 12px 0', color: '#1f1f1f' }}>
                                {users?.name}
                            </Title>
                            <div style={{
                                display: 'inline-block',
                                padding: '6px 16px',
                                borderRadius: '20px',
                                background: getRoleColor(users?.role) + '20',
                                color: getRoleColor(users?.role),
                                fontWeight: '600',
                                fontSize: '14px'
                            }}>
                                {getRoleLabel(users?.role)}
                            </div>
                        </div>

                        <Divider />

                        {/* Profile Info Grid */}
                        <Row gutter={[32, 32]}>
                            {/* Email Info */}
                            <Col xs={24} sm={12}>
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '12px'
                                    }}>
                                        <MailOutlined style={{
                                            fontSize: '20px',
                                            color: '#667eea',
                                            marginRight: '8px'
                                        }} />
                                        <Text type="secondary" style={{ fontSize: '12px', fontWeight: '600' }}>
                                            ĐỊA CHỈ EMAIL
                                        </Text>
                                    </div>
                                    <div style={{
                                        padding: '12px 16px',
                                        background: '#f5f5f5',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <Text strong>{users?.email}</Text>
                                        <Button
                                            type="text"
                                            icon={<CopyOutlined />}
                                            size="small"
                                            onClick={() => {
                                                navigator.clipboard.writeText(users?.email);
                                            }}
                                        />
                                    </div>
                                </div>
                            </Col>

                            {/* Role Info */}
                            <Col xs={24} sm={12}>
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '12px'
                                    }}>
                                        <UserOutlined style={{
                                            fontSize: '20px',
                                            color: '#667eea',
                                            marginRight: '8px'
                                        }} />
                                        <Text type="secondary" style={{ fontSize: '12px', fontWeight: '600' }}>
                                            LOẠI TÀI KHOẢN
                                        </Text>
                                    </div>
                                    <div style={{
                                        padding: '12px 16px',
                                        background: '#f5f5f5',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <Text strong>{users?.role === 'User' ? 'Học Viên' : users?.role === 'teacher' ? 'Giảng Viên' : 'Quản Trị Viên'}</Text>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Divider style={{ margin: '30px 0' }} />

                        {/* Stats Section */}
                        <div style={{ marginTop: '30px' }}>
                            <Title level={4} style={{ marginBottom: '20px' }}>Thông Tin Tài Khoản</Title>
                            <Row gutter={[20, 20]}>
                                <Col xs={24} sm={12} lg={6}>
                                    <div style={{
                                        padding: '20px',
                                        background: '#f0f2f5',
                                        borderRadius: '12px',
                                        textAlign: 'center'
                                    }}>
                                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
                                            ✓
                                        </div>
                                        <Text type="secondary" style={{ fontSize: '12px' }}>
                                            Tài Khoản Hoạt Động
                                        </Text>
                                    </div>
                                </Col>
                                <Col xs={24} sm={12} lg={6}>
                                    <div style={{
                                        padding: '20px',
                                        background: '#f0f2f5',
                                        borderRadius: '12px',
                                        textAlign: 'center'
                                    }}>
                                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                                            ✓
                                        </div>
                                        <Text type="secondary" style={{ fontSize: '12px' }}>
                                            Đã Xác Thực
                                        </Text>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Card>

                {/* Action Buttons */}
                <Row gutter={[16, 16]} style={{ marginTop: '30px', justifyContent: 'center' }}>
                    <Col>
                        <Button
                            size="large"
                            style={{
                                borderRadius: '8px',
                                height: '45px',
                                paddingLeft: '30px',
                                paddingRight: '30px'
                            }}
                            onClick={() => window.location.href = '/users/settings'}
                        >
                            ⚙️ Cài Đặt Tài Khoản
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            size="large"
                            style={{
                                borderRadius: '8px',
                                height: '45px',
                                paddingLeft: '30px',
                                paddingRight: '30px'
                            }}
                            onClick={() => window.location.href = '/'}
                        >
                            🏠 Quay Về Trang Chủ
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default UserProfile;
