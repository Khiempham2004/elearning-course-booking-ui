
import { Layout, Input, Avatar, Button } from "antd";
import SideBar from '../components/SideBar.jsx';
import { Link, Outlet } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
import {
    BellOutlined,
    UserOutlined,
    LogoutOutlined,
} from "@ant-design/icons";

const AdminLayout = () => {
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

                    <div style={{ display: "flex", gap: 16, padding: "6px 12px", borderRadius: 6, background: "#fafafa" }}>
                        <Input placeholder="Search..." style={{ width: 200, borderRadius: 6 }} />
                        <BellOutlined style={{ fontSize: 18, cursor: "pointer" }} />
                        <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />

                        <Link to="/signin">
                            <Button danger icon={<LogoutOutlined />} style={{
                                borderRadius: 6,
                                display: "flex",
                                alignItems: "center"
                            }}>
                                Logout
                            </Button>
                        </Link>
                    </div>
                </Header>

                <Content style={{ margin: 20 }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default AdminLayout;
