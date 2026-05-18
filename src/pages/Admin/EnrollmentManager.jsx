import React, { useEffect, useState } from 'react';
import {
    Table,
    Card,
    Button,
    message,
    Space,
    Tag,
    Row,
    Col,
    Statistic,
    Popconfirm,
    Input,
    Select,
    Typography,
    Badge,
    Modal,
    Form,
} from 'antd';
import {
    DeleteOutlined,
    ReloadOutlined,
    SearchOutlined,
    UserOutlined,
    BookOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
} from '@ant-design/icons';
import { getAllEnrollments, deleteEnrollments } from '../../service/enrollment.service';
import { getToken } from '../../utils/Auth';

const { Title, Text } = Typography;

const EnrollmentManager = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedEnrollment, setSelectedEnrollment] = useState(null);

    const fetchEnrollments = async () => {
        try {
            setLoading(true);
            const token = getToken();
            const res = await getAllEnrollments(token);
            console.log('Enrollments:', res?.data);
            setEnrollments(res?.data?.enrollments || []);
        } catch (error) {
            console.log(error);
            message.error('Failed to fetch enrollments');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const handleDeleteEnrollment = async (id) => {
        try {
            const token = getToken();
            await deleteEnrollments(id, token);
            message.success('Enrollment deleted successfully');
            fetchEnrollments();
        } catch (error) {
            console.log(error);
            message.error('Failed to delete enrollment');
        }
    };

    const handleViewDetails = (record) => {
        setSelectedEnrollment(record);
        setDetailModalOpen(true);
    };

    const filteredEnrollments = enrollments.filter((enrollment) => {
        const searchLower = searchText.toLowerCase();
        const matchSearch =
            enrollment?.userId?.name?.toLowerCase().includes(searchLower) ||
            enrollment?.userId?.email?.toLowerCase().includes(searchLower) ||
            enrollment?.courseId?.title?.toLowerCase().includes(searchLower);

        const matchStatus =
            statusFilter === 'all' ? true : enrollment?.status === statusFilter;

        return matchSearch && matchStatus;
    });

    const getStatusColor = (status) => {
        const colors = {
            approved: 'green',
            pending: 'orange',
            rejected: 'red',
            cancelled: 'default',
        };
        return colors[status] || 'blue';
    };

    const stats = {
        total: enrollments.length,
        approved: enrollments.filter(e => e.status === 'approved').length,
        pending: enrollments.filter(e => e.status === 'pending').length,
        rejected: enrollments.filter(e => e.status === 'rejected').length,
    };

    const columns = [
        {
            title: 'User',
            key: 'user',
            width: 200,
            render: (_, record) => (
                <div>
                    <Text strong>{record?.userId?.name || 'N/A'}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                        {record?.userId?.email || 'N/A'}
                    </Text>
                </div>
            ),
        },
        {
            title: 'Course',
            dataIndex: ['courseId', 'title'],
            key: 'course',
            width: 250,
            render: (courseTitle) => (
                <Text ellipsis>{courseTitle || 'N/A'}</Text>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status) => (
                <Tag
                    icon={
                        status === 'approved' ? (
                            <CheckCircleOutlined />
                        ) : status === 'pending' ? (
                            <ClockCircleOutlined />
                        ) : null
                    }
                    color={getStatusColor(status)}
                >
                    {status?.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Enrolled Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150,
            render: (date) => {
                if (!date) return 'N/A';
                return new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                });
            },
        },
        {
            title: 'Action',
            key: 'action',
            width: 150,
            render: (_, record) => (
                <Space>
                    <Button
                        type="default"
                        size="small"
                        onClick={() => handleViewDetails(record)}
                    >
                        Details
                    </Button>
                    <Popconfirm
                        title="Delete Enrollment"
                        description="Are you sure you want to remove this enrollment?"
                        onConfirm={() => handleDeleteEnrollment(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            size="small"
                        >
                            Remove
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: 24, background: '#f5f7fa', minHeight: '100vh' }}>
            {/* Header */}
            <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
                <Col>
                    <Title level={2} style={{ margin: 0 }}>
                        📝 Enrollment Management
                    </Title>
                    <Text type="secondary">View and manage student course enrollments</Text>
                </Col>
                <Col>
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={fetchEnrollments}
                        size="large"
                    >
                        Refresh
                    </Button>
                </Col>
            </Row>

            {/* Statistics */}
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col xs={24} md={6}>
                    <Card>
                        <Statistic
                            title="Total Enrollments"
                            value={stats.total}
                            prefix="📊"
                        />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card>
                        <Statistic
                            title="Approved"
                            value={stats.approved}
                            prefix={<CheckCircleOutlined style={{ color: 'green' }} />}
                            valueStyle={{ color: 'green' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card>
                        <Statistic
                            title="Pending"
                            value={stats.pending}
                            prefix={<ClockCircleOutlined style={{ color: 'orange' }} />}
                            valueStyle={{ color: 'orange' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card>
                        <Statistic
                            title="Rejected"
                            value={stats.rejected}
                            prefix="❌"
                        />
                    </Card>
                </Col>
            </Row>

            {/* Filters */}
            <Card style={{ marginBottom: 24 }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Input
                            size="large"
                            placeholder="Search by student name, email, or course..."
                            prefix={<SearchOutlined />}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </Col>
                    <Col xs={24} md={12}>
                        <Select
                            size="large"
                            style={{ width: '100%' }}
                            value={statusFilter}
                            onChange={setStatusFilter}
                            placeholder="Filter by status"
                        >
                            <Select.Option value="all">All Status</Select.Option>
                            <Select.Option value="approved">Approved</Select.Option>
                            <Select.Option value="pending">Pending</Select.Option>
                            <Select.Option value="rejected">Rejected</Select.Option>
                            <Select.Option value="cancelled">Cancelled</Select.Option>
                        </Select>
                    </Col>
                </Row>
            </Card>

            {/* Enrollments Table */}
            <Card style={{ borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <Table
                    columns={columns}
                    dataSource={filteredEnrollments}
                    rowKey="_id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        total: filteredEnrollments.length,
                        showTotal: (total) => `Total ${total} enrollments`,
                    }}
                    scroll={{ x: 1000 }}
                    locale={{
                        emptyText: (
                            <div style={{ padding: '50px 0', textAlign: 'center' }}>
                                <BookOutlined style={{ fontSize: 48, color: '#bfbfbf' }} />
                                <p style={{ color: '#8c8c8c', marginTop: 16 }}>
                                    No enrollments found
                                </p>
                            </div>
                        ),
                    }}
                />
            </Card>

            {/* Details Modal */}
            <Modal
                title="Enrollment Details"
                open={detailModalOpen}
                onCancel={() => {
                    setDetailModalOpen(false);
                    setSelectedEnrollment(null);
                }}
                footer={[
                    <Button key="close" onClick={() => {
                        setDetailModalOpen(false);
                        setSelectedEnrollment(null);
                    }}>
                        Close
                    </Button>,
                ]}
            >
                {selectedEnrollment && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                            <Text strong>Student Information</Text>
                            <Card style={{ marginTop: 8 }}>
                                <p>
                                    <strong>Name:</strong> {selectedEnrollment?.userId?.name || 'N/A'}
                                </p>
                                <p>
                                    <strong>Email:</strong> {selectedEnrollment?.userId?.email || 'N/A'}
                                </p>
                            </Card>
                        </div>

                        <div>
                            <Text strong>Course Information</Text>
                            <Card style={{ marginTop: 8 }}>
                                <p>
                                    <strong>Course:</strong> {selectedEnrollment?.courseId?.title || 'N/A'}
                                </p>
                            </Card>
                        </div>

                        <div>
                            <Text strong>Enrollment Status</Text>
                            <Card style={{ marginTop: 8 }}>
                                <p>
                                    <strong>Status:</strong>{' '}
                                    <Tag color={getStatusColor(selectedEnrollment?.status)}>
                                        {selectedEnrollment?.status?.toUpperCase()}
                                    </Tag>
                                </p>
                                <p>
                                    <strong>Enrolled Date:</strong>{' '}
                                    {new Date(selectedEnrollment?.createdAt).toLocaleDateString()}
                                </p>
                            </Card>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default EnrollmentManager;
