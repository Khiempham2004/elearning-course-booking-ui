import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../service/user.service';
import { Button, Card, Col, Divider, Row, Spin, Typography } from 'antd';
import { CopyOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography


const AdminProfile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDataProfile = async () => {
            try {
                const res = await getUserProfile();
                setUser(res?.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataProfile();
    }, []);
    if (!user) {
        return (
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'
            }}>
                <Spin size='large' />
            </div>
        );
    }

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
        <div >
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '40px 20px'
            }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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
                                    {user.name?.charAt(0).toUpperCase() || <UserOutlined />}
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '70px 40px 40px' }}>
                            <div style={{ marginBottom: '30px' }}>
                                <Title level={2} style={{ margin: '0 0 12px 0', color: '#1f1f1f' }}>
                                    {user?.name}
                                </Title>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '6px 16px',
                                    borderRadius: '20px',
                                    background: getRoleColor(user?.role) + '20',
                                    color: getRoleColor(user?.role),
                                    fontWeight: '600',
                                    fontSize: '14px'
                                }}>
                                    {getRoleLabel(user?.role)}
                                </div>
                            </div>

                            <Divider />

                            <Row gutter={[32, 32]}>
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
                                            <Text strong>{user?.email}</Text>
                                            <Button
                                                type="text"
                                                icon={<CopyOutlined />}
                                                size="small"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(user?.email);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Col>

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
                                            <Text strong>{user?.role === 'User' ? 'Học Viên' : user?.role === 'teacher' ? 'Giảng Viên' : 'Quản Trị Viên'}</Text>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <Divider style={{ margin: '30px 0' }} />

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
                                onClick={() => navigate('/admin/settings')}
                            >
                                ⚙️ Cài Đặt Tài Khoản
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                size='primary'
                                style={{
                                    borderRadius: '8px',
                                    height: '45px',
                                    paddingLeft: '30px',
                                    paddingRight: "30px"
                                }}
                            >
                                Chỉnh sửa hồ sơ
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default AdminProfile;
