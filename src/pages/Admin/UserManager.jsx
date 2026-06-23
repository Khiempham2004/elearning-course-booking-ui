import {
    DeleteOutlined,
    EditOutlined,
    FileAddOutlined,
    ReloadOutlined,
    SearchOutlined,
    UserAddOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    Avatar,
    Button,
    Card,
    Col,
    Form,
    Input,
    message,
    Modal,
    Popconfirm,
    Row,
    Select,
    Space,
    Statistic,
    Table,
    Tag,
    Typography,
} from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { createUser, deleteUser, getAllUsers, updateUserRole } from '../../service/user.service';
import { getToken } from '../../utils/Auth';


const { Title, Text } = Typography;
const { Option } = Select;

const UserManager = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [searchText, setSearchText] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedName, setSelectedName] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedPassword, setSelectedPassword] = useState('');
    const [createOpenModal, setCreateOpenModal] = useState(false);

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    })

    const fetchUsers = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem('token');

            const res = await getAllUsers(token);

            setUsers(res?.data?.users || []);
        } catch (error) {
            message.error('Fetch users failed', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleCreateUser = async () => {
        try {
            if (!newUser.name.trim()) {
                return message.error("Vui lòng nhập họ tên");
            }
            if (!newUser.email.trim()) {
                return message.error("Vui lòng nhập email");
            }
            if (!newUser.password.trim()) {
                return message.error("Vui lòng nhập password");
            }
            if (!newUser.role.trim()) {
                return message.error("Vui lòng chọn role");
            }

            const token = getToken();
            await createUser(
                {
                    name: newUser.name,
                    email: newUser.email,
                    password: newUser.password,
                    role: newUser.role
                },
                token
            );

            message.success("Tạo mới tài thoản thành công");
            setCreateOpenModal(false);
            setNewUser({
                name: "",
                email: "",
                password: "",
                role: ""
            });
            await fetchUsers();
        } catch (error) {
            message.error("Tạo tài khoản thất bại", error);
        }
    }

    const handleEditClick = (record) => {
        setSelectedUser(record);
        setSelectedRole(record?.role || '');
        setSelectedName(record?.name || '');
        setSelectedEmail(record?.email || '');
        setSelectedPassword('');
        setEditModalOpen(true);
    };

    const handleEditConfirm = async () => {
        try {
            if (!selectedRole) {
                return message.error('Please select a role');
            }

            if (!selectedName.trim()) {
                return message.error('Please enter user name');
            }

            if (!selectedEmail.trim()) {
                return message.error('Please enter email');
            }
            if (!selectedPassword.trim()) {
                return message.error('Please enter password');
            }

            await updateUserRole(selectedUser._id, {
                role: selectedRole,
                name: selectedName,
                email: selectedEmail,
                password: selectedPassword
            });
            message.success('Update user success');
            setEditModalOpen(false);
            setSelectedUser(null);
            setSelectedRole('');
            setSelectedName('');
            setSelectedEmail('');
            setSelectedPassword('')
            fetchUsers();
        } catch (error) {
            message.error("Edit users failed", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');

            await deleteUser(id, token);

            message.success('Delete user success');

            fetchUsers();
        } catch (error) {
            console.log(error);
            message.error('Delete failed');
        }
    };

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
                if (role === 'User') color = 'green';
                if (role === "teacher") color = 'orange'

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
                        onClick={() => handleEditClick(record)}
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
                    <Space>
                        <Button
                            icon={<ReloadOutlined />}
                            onClick={fetchUsers}
                        >
                            Refresh
                        </Button>
                        <Button
                            type='primary'
                            onClick={() => {
                                setNewUser({
                                    name: "",
                                    email: "",
                                    password: "",
                                    role: ""
                                });
                                setCreateOpenModal(true);
                            }}
                        >
                            + Create User
                        </Button>

                    </Space>
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

                            <Option value="User">
                                User
                            </Option>
                            <Option value="teacher">
                                Teacher
                            </Option>
                        </Select>
                    </Col>
                </Row>
            </Card>

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

            <Modal
                title={
                    <Space>
                        <UserOutlined />
                        <span>Update User</span>
                    </Space>
                }
                open={editModalOpen}
                onOk={handleEditConfirm}
                onCancel={() => {
                    setEditModalOpen(false);
                    setSelectedUser(null);
                    setSelectedRole("");
                    setSelectedName("");
                    setSelectedEmail("");
                    setSelectedPassword("");
                }}
                okText="Update User"
                cancelText="Cancel"
                width={600}
            >
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: 24,
                    }}
                >
                    <Avatar
                        size={80}
                        icon={<UserOutlined />}
                    />

                    <div
                        style={{
                            marginTop: 12,
                            fontWeight: 600,
                            fontSize: 18,
                        }}
                    >
                        {selectedName}
                    </div>

                    <div style={{ color: "#888" }}>
                        {selectedEmail}
                    </div>
                </div>
                {selectedUser && (
                    <div style={{ marginTop: 20 }}>
                        <Form layout="vertical">

                            <Form.Item
                                label="Full Name"
                                required
                            >
                                <Input
                                    size="large"
                                    prefix={<UserOutlined />}
                                    value={selectedName}
                                    onChange={(e) =>
                                        setSelectedName(e.target.value)
                                    }
                                    placeholder="Enter full name"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Email Address"
                                required
                            >
                                <Input
                                    size="large"
                                    value={selectedEmail}
                                    onChange={(e) =>
                                        setSelectedEmail(e.target.value)
                                    }
                                    placeholder="Enter email"
                                />
                            </Form.Item>

                            <Form.Item
                                label="New Password"
                                extra="Leave blank if you don't want to change password"
                            >
                                <Input.Password
                                    size="large"
                                    value={selectedPassword}
                                    onChange={(e) =>
                                        setSelectedPassword(e.target.value)
                                    }
                                    placeholder="Enter new password"
                                    type='password'
                                />
                            </Form.Item>

                            <Form.Item
                                label="Role"
                                required
                            >
                                <Select
                                    size="large"
                                    value={selectedRole}
                                    onChange={setSelectedRole}
                                >
                                    <Option value="admin">
                                        👑 Admin
                                    </Option>

                                    <Option value="User">
                                        👤 User
                                    </Option>

                                    <Option value="teacher">
                                        👨‍🏫 Teacher
                                    </Option>
                                </Select>
                            </Form.Item>

                        </Form>
                    </div>
                )}
            </Modal>

            <Modal
                title={
                    <Space>
                        <UserAddOutlined />
                        <span>Create New User</span>
                    </Space>
                }
                open={createOpenModal}
                onOk={handleCreateUser}
                onCancel={() => {
                    setCreateOpenModal(false);
                    setNewUser({
                        name: "",
                        email: "",
                        password: "",
                        role: "",
                    });
                }}
                okText="Create User"
                width={600}
            >
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: 24,
                    }}
                >
                    <Avatar
                        size={80}
                        icon={<UserOutlined />}
                    />
                </div>

                <Form layout="vertical">

                    <Form.Item
                        label="Full Name"
                        required
                    >
                        <Input
                            size="large"
                            prefix={<UserOutlined />}
                            placeholder="Enter full name"
                            value={newUser.name}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    name: e.target.value,
                                })
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        label="Email Address"
                        required
                    >
                        <Input
                            size="large"
                            placeholder="Enter email"
                            autoComplete="off"
                            value={newUser.email}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    email: e.target.value,
                                })
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        required
                    >
                        <Input.Password
                            size="large"
                            autoComplete="new-password"
                            placeholder="Enter password"
                            value={newUser.password}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    password: e.target.value,
                                })
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        label="Role"
                        required
                    >
                        <Select
                            size="large"
                            placeholder="Select role"
                            value={newUser.role || undefined}
                            onChange={(value) =>
                                setNewUser({
                                    ...newUser,
                                    role: value,
                                })
                            }
                        >
                            <Option value="admin">
                                👑 Admin
                            </Option>

                            <Option value="User">
                                👤 User
                            </Option>

                            <Option value="teacher">
                                👨‍🏫 Teacher
                            </Option>
                        </Select>
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
}

export default UserManager;
