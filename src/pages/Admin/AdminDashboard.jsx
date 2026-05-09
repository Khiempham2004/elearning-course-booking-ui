import { BookOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Col, message, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const { Title, Text } = Typography;
const AdminDashboard = () => {
  const [ setCourse] = useState([]);
  const [stats] = useState({
    users: 0,
    courses: 0,
    enrollments: null,
    schedules: null,
  });
  useEffect(() => {
    const courseData = async () => {
      try {
        const resCourse = await axios.get('http://localhost:3000/api/courses');
        setCourse(resCourse);

      } catch (error) {
        console.log(error);
        message.error(error)
      }
    };
    courseData();
  }, []);

  const StatCard = ({ icon, value, label, color }) => (
    <Card
      style={{
        borderRadius: 16,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        textAlign: 'center'
      }}
    >
      {React.cloneElement(icon, {
        style: { fontSize: 30, color }
      })}
      <Title level={3}>{value ?? '--'}</Title>
      <Text>{label}</Text>
    </Card>
  );

  return (
    <div>
      <div style={{ padding: 24, background: '#f5f7fa', minHeight: '100vh' }}>

        <Title level={2}>Admin Dashboard</Title>

        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card>
              <UserOutlined style={{ fontSize: 24, color: "#1677ff" }} />
              <h2>{stats.users}</h2>
              <p>Total Users</p>
            </Card>
          </Col>

          <Col span={6}>
            <Card>
              <UserOutlined style={{ fontSize: 24, color: "#1677ff" }} />
              <h2>{stats.courses}</h2>
              <p>Total Courses</p>
            </Card>
          </Col>

          <Col span={6}>
            <Card>
              <UserOutlined style={{ fontSize: 24, color: "#1677ff" }} />
              <h2>{stats.enrollments}</h2>
              <p>Total Enrollments</p>
            </Card>
          </Col>

          <Col span={6}>
            <Card>
              <UserOutlined style={{ fontSize: 24, color: "#1677ff" }} />
              <h2>{stats.schedules}</h2>
              <p>Total Schedules</p>
            </Card>
          </Col>
        </Row>

        <Card
          style={{
            marginTop: 24,
            borderRadius: 16,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}
        >
          <Title level={4}>Welcome Admin 👋</Title>
          <Text>
            Manage users, courses and system data from here.
          </Text>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;
