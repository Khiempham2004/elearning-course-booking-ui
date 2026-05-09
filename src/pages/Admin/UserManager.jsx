import {
    DeleteOutlined,
    EditOutlined,
    ReloadOutlined,
    SearchOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    Avatar,
    Button,
    Card,
    Col,
    Input,
    message,
    Popconfirm,
    Row,
    Select,
    Space,
    Statistic,
    Table,
    Tag,
    Typography,
} from 'antd';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';


const { Title, Text } = Typography;
const { Option } = Select;

const UserManager = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [searchText, setSearchText] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    const fetchUsers = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem('token');

            const res = await axios.get(
                'http://localhost:3000/api/users',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUsers(res?.data?.users || []);
        } catch (error) {
            console.log(error);
            message.error('Fetch users failed');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // ================= DELETE USER =================
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');

            await axios.delete(
                `http://localhost:9000/api/users/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            message.success('Delete user success');

            fetchUsers();
        } catch (error) {
            console.log(error);
            message.error('Delete failed');
        }
    };

    // ================= FILTER =================
    const filteredUsers = useMemo(() => {
        return users.filter((item) => {
            const matchSearch =
                item?.name
                    ?.toLowerCase()
                    ?.includes(searchText.toLowerCase()) ||
                item?.email
                    ?.toLowerCase()
                    ?.includes(searchText.toLowerCase());

            const matchRole =
                roleFilter === 'all'
                    ? true
                    : item?.role === roleFilter;

            return matchSearch && matchRole;
        });
    }, [users, searchText, roleFilter]);

    // ================= STATISTIC =================
    const totalUsers = users.length;

    const totalAdmins = users.filter(
        (item) => item.role === 'admin'
    ).length;

    const totalTeachers = users.filter(
        (item) => item.role === 'teacher'
    ).length;

    const totalStudents = users.filter(
        (item) => item.role === 'user'
    ).length;

    // ================= TABLE =================
    const columns = [
        {
            title: 'User',
            key: 'user',
            render: (_, record) => (
                <Space>
                    <Avatar
                        size={45}
                        icon={<UserOutlined />}
                        src={record?.avatar}
                    />

                    <div>
                        <Text strong>{record?.name}</Text>

                        <br />

                        <Text type="secondary">
                            {record?.email}
                        </Text>
                    </div>
                </Space>
            ),
        },

        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => {
                let color = 'blue';

                if (role === 'admin') color = 'red';
                if (role === 'teacher') color = 'gold';
                if (role === 'user') color = 'green';

                return (
                    <Tag color={color}>
                        {role?.toUpperCase()}
                    </Tag>
                );
            },
        },

        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            render: (phone) => phone || 'N/A',
        },

        {
            title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) =>
                date
                    ? new Date(date).toLocaleDateString()
                    : 'N/A',
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                    >
                        Edit
                    </Button>

                    <Popconfirm
                        title="Delete User"
                        description="Are you sure delete this user?"
                        onConfirm={() =>
                            handleDelete(record?._id)
                        }
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return (
        <div style={{ padding: 24 }}>
            <Row
                justify="space-between"
                align="middle"
                style={{ marginBottom: 24 }}
            >
                <Col>
                    <Title level={2} style={{ margin: 0 }}>
                        User Management
                    </Title>

                    <Text type="secondary">
                        Manage all users in system
                    </Text>
                </Col>

                <Col>
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={fetchUsers}
                    >
                        Refresh
                    </Button>
                </Col>
            </Row>

            {/* STATISTIC */}
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col xs={24} md={6}>
                    <Card>
                        <Statistic
                            title="Total Users"
                            value={totalUsers}
                        />
                    </Card>
                </Col>

                <Col xs={24} md={6}>
                    <Card>
                        <Statistic
                            title="Admins"
                            value={totalAdmins}
                        />
                    </Card>
                </Col>

                <Col xs={24} md={6}>
                    <Card>
                        <Statistic
                            title="Teachers"
                            value={totalTeachers}
                        />
                    </Card>
                </Col>

                <Col xs={24} md={6}>
                    <Card>
                        <Statistic
                            title="Students"
                            value={totalStudents}
                        />
                    </Card>
                </Col>
            </Row>

            {/* FILTER */}
            <Card style={{ marginBottom: 24 }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Input
                            size="large"
                            placeholder="Search by name or email..."
                            prefix={<SearchOutlined />}
                            value={searchText}
                            onChange={(e) =>
                                setSearchText(e.target.value)
                            }
                        />
                    </Col>

                    <Col xs={24} md={6}>
                        <Select
                            size="large"
                            style={{ width: '100%' }}
                            value={roleFilter}
                            onChange={setRoleFilter}
                        >
                            <Option value="all">
                                All Roles
                            </Option>

                            <Option value="admin">
                                Admin
                            </Option>

                            <Option value="teacher">
                                Teacher
                            </Option>

                            <Option value="user">
                                Student
                            </Option>
                        </Select>
                    </Col>
                </Row>
            </Card>

            {/* TABLE */}
            <Card>
                <Table
                    rowKey="_id"
                    columns={columns}
                    dataSource={filteredUsers}
                    loading={loading}
                    pagination={{
                        pageSize: 5,
                    }}
                    scroll={{ x: 900 }}
                />
            </Card>
        </div>
    );
}

export default UserManager;
