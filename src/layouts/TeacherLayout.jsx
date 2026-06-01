import { Layout, Input, Avatar, Button, Dropdown, Space } from "antd";
import TeacherSideBar from '../components/TeacherSideBar.jsx';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../utils/Auth.js';
const { Header, Sider, Content } = Layout;
import {
    BellOutlined,
    UserOutlined,
    LogoutOutlined,
    DownOutlined,
} from "@ant-design/icons";

const TeacherLayout = () => {
    const navigate = useNavigate();
    const user = getUser();

    const handleLogout = () => {
        logout(navigate);
    };

    const userMenu = {
        items: [
            {
                key: '1',
                label: 'Profile',
                onClick: () => navigate('/teacher/profile')
            },
            {
                key: '2',
                label: 'Settings',
                onClick: () => navigate('/teacher/settings')
            },
            {
                type: 'divider',
            },
            // {
            //     key: '3',
            //     label: 'Logout',
            //     onClick: handleLogout
            // }
        ],
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <TeacherSideBar />
            <Layout>
                <Header
                    style={{
                        background: "#fff",
                        display: "flex",
                        justifyContent: "space-between",
                        textAlign: "center",
                        alignItems: "center",
                        padding: "0 24px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <h2 style={{ margin: 0, fontWeight: 600, fontSize: 20, color: "#1890ff" }}>
                        📚 Teacher Dashboard
                    </h2>

                    <div style={{ display: "flex", gap: 16, padding: "6px 12px", borderRadius: 6, background: "#fafafa", alignItems: "center" }}>
                        <Input placeholder="Search..." style={{ width: 200, borderRadius: 6 }} />
                        <BellOutlined style={{ fontSize: 18, cursor: "pointer" }} />

                        <Dropdown menu={userMenu} trigger={['click']}>
                            <Space style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                <Avatar
                                    icon={<UserOutlined />}
                                    style={{ cursor: "pointer", backgroundColor: '#1890ff' }}
                                />
                                <span style={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {user?.fullname || 'Teacher'}
                                </span>
                                <DownOutlined style={{ fontSize: 12 }} />
                            </Space>
                        </Dropdown>

                        <Button
                            danger
                            icon={<LogoutOutlined />}
                            onClick={handleLogout}
                            style={{
                                borderRadius: 6,
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                </Header>

                <Content style={{ margin: 20, background: '#f5f5f5', borderRadius: 8, padding: 20 }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default TeacherLayout;
