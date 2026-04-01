import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { getToken } from "../../utils/Auth.js";
import { Layout, Menu, Card, Avatar, Input, Button, Progress } from "antd";
import {
  DashboardOutlined,
  BookOutlined,
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

export default function AdminDashboard() {
  const [search, setSearch] = useState("");

  const courses = [
    { name: "React Course", progress: 60 },
    { name: "NodeJS API", progress: 40 },
    { name: "UI/UX Design", progress: 80 },
  ];

  const filteredCourses = courses.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

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

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <Sider>
          <h2 style={{ color: "white", textAlign: "center", padding: 20 }}>
            StudIQ
          </h2>
          <Menu theme="dark" mode="inline">
            <Menu.Item icon={<DashboardOutlined />}>Dashboard</Menu.Item>
            <Menu.Item icon={<BookOutlined />}>Courses</Menu.Item>
            <Menu.Item icon={<UserOutlined />}>Users</Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          {/* Header */}
          <Header
            style={{
              background: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 20px",
            }}
          >
            <h2>Admin Dashboard</h2>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Input
                placeholder="Search..."
                style={{ width: 200 }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <BellOutlined style={{ fontSize: 18 }} />

              <Avatar icon={<UserOutlined />} />

              <Link to="/signin">
                <Button danger icon={<LogoutOutlined />}>
                  Logout
                </Button>
              </Link>
            </div>
          </Header>

          {/* Content */}
          <Content style={{ margin: "20px" }}>
            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 20,
              }}
            >
              {["Courses", "Users", "Revenue", "Orders"].map((item, i) => (
                <Card key={i}>
                  <p>{item}</p>
                  <h2>{Math.floor(Math.random() * 100)}</h2>
                </Card>
              ))}
            </div>

            {/* Course List */}
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
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
