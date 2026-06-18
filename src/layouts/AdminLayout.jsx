
import { Layout, Input, Avatar, Button, Space, Dropdown } from "antd";
import SideBar from '../components/SideBar.jsx';
import { Link, Outlet, useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
import {
    BellOutlined,
    UserOutlined,
    LogoutOutlined,
    SettingOutlined,
    ProfileOutlined
} from "@ant-design/icons";
import { logout } from "../utils/Auth.js";

const AdminLayout = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigae = useNavigate();

    const handleLogout = () => {
        logout(navigae);
    }

    const items = [
        {
            key: "profile",
            icon: <ProfileOutlined />,
            label: "Profile",
        },
        {
            key: "setting",
            icon: <SettingOutlined />,
            label: "Setting",
        },
        {
            type: "divider"
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Logout",
        }
    ];

    const handleMenuCLick = ({ key }) => {
        if (key === "profile") {
            navigae("/admin/profile");
        }

        if (key === "setting") {
            navigae("/admin/settings");
        }
        if (key === "logout") {
            handleLogout();
        }
    }
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <SideBar />
            <Layout>
                <Header
                    style={{
                        background: "#fff",
                        display: "flex",  
                        justifyContent: "space-between",
                        textAlign: "center",
                        alignItems: "center",
                        padding: "0 24px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
                    }}
                >
                    <h2 style={{ margin: 0, fontWeight: 600, fontSize: 20 }}>Admin Dashboard</h2>


                    <Space size="middle">
                        <Input style={{ width: 220 }} placeholder="Search..." />
                        <BellOutlined
                            style={{
                                fontSize: 18, cursor: "pointer"
                            }}
                        />
                        <Dropdown
                            menu={{ items, onClick: handleMenuCLick }}
                        // trigger={["click"]}
                        >
                            <Space
                                style={{
                                    cursor: "pointer"
                                }}
                            >
                                <Avatar icon={<UserOutlined />}
                                    style={{
                                        backgroundColor: "#1677ff"
                                    }}
                                >
                                </Avatar>

                                <span
                                    style={{
                                        fontWeight: 600
                                    }}
                                >
                                    {user?.name}
                                </span>
                            </Space>
                        </Dropdown>
                    </Space>
                </Header>

                <Content style={{ margin: 20 }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default AdminLayout;
