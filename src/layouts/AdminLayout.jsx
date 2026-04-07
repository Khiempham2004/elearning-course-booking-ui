/* eslint-disable react-hooks/purity */
import { Sidebar } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { getToken } from '../utils/Auth.js';
import { Layout, Menu, Card, Avatar, Input, Button, Progress } from "antd";
import {
    DashboardOutlined,
    BookOutlined,
    UserOutlined,
    TeamOutlined,
    CalendarOutlined,
    LogoutOutlined,
    BellOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {

    useEffect(() => {
        const token = getToken();

        fetch("http://localhost:3000/api/user/admin/dashboard", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => console.log("Data dashboard : ", data))
            .catch((err) => console.log(err));
    }, []);

    const [search, setSearch] = useState("");
    const courses = [
        { name: "React Course", progress: 60 },
        { name: "NodeJS API", progress: 40 },
        { name: "UI/UX Design", progress: 80 },
    ];
    const filteredCourses = courses.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div className='flex'>
            <Layout style={{ minHeight: "100vh" }}>

                <Sider width={220} theme="dark">
                    <h2
                        style={{
                            color: "white",
                            textAlign: "center",
                            padding: 20,
                            fontSize: 26,
                            fontWeight: "bold",
                        }}
                    >
                        StudIQ
                    </h2>

                    <Menu theme="dark" mode="inline">
                        <Menu.Item icon={<DashboardOutlined />}>
                            <Link to="/admin">Dashboard</Link>
                        </Menu.Item>

                        <Menu.Item icon={<BookOutlined />}>
                            <Link to="/admin/course">Courses</Link>
                        </Menu.Item>

                        <Menu.Item icon={<UserOutlined />}>
                            <Link to="/admin/user">Users</Link>
                        </Menu.Item>

                        <Menu.Item icon={<TeamOutlined />}>
                            <Link to="/admin/enrollment">Enrollment</Link>
                        </Menu.Item>

                        <Menu.Item icon={<CalendarOutlined />}>
                            <Link to="/admin/schedule">Schedule</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout>
                    <Header
                        style={{
                            background: "#fff",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0 20px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        }}
                    >
                        <h2 style={{ margin: 0 }}>Admin Dashboard</h2>

                        <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
                            <Input
                                placeholder="Search..."
                                style={{ width: 220 }}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <BellOutlined style={{ fontSize: 18, cursor: "pointer" }} />

                            <Avatar icon={<UserOutlined />} />

                            <Link to="/signin">
                                <Button danger icon={<LogoutOutlined />}>
                                    Logout
                                </Button>
                            </Link>
                        </div>
                    </Header>

                    <Content style={{ margin: 20 }}>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                gap: 20,
                            }}
                        >
                            {["Courses", "Users", "Revenue", "Orders"].map((item, i) => (
                                <Card key={i} bordered={false}>
                                    <p style={{ color: "#888" }}>{item}</p>
                                    <h2>{Math.floor(Math.random() * 100)}</h2>
                                </Card>
                            ))}
                        </div>

                        <Card title="Course Management" style={{ marginTop: 20 }}>
                            {filteredCourses.map((course, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: 15,
                                    }}
                                >
                                    <div style={{ width: "60%" }}>
                                        <p>{course.name}</p>
                                        <Progress percent={course.progress} />
                                    </div>

                                    <div style={{ display: "flex", gap: 10 }}>
                                        <Button type="primary">Edit</Button>
                                        <Button danger>Delete</Button>
                                    </div>
                                </div>
                            ))}
                        </Card>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default AdminLayout;
