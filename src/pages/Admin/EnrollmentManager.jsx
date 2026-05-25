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
    CloseCircleOutlined,
} from '@ant-design/icons';
import {
    getAllEnrollments,
    deleteEnrollments,
    approveEnrollment,
    rejectEnrollment,
    completeEnrollment,
} from '../../service/enrollment.service';
import { getToken } from '../../utils/Auth';

const { Title, Text } = Typography;

const EnrollmentManager = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedEnrollment, setSelectedEnrollment] = useState(null);
    const [approvalModalOpen, setApprovalModalOpen] = useState(false);
    const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
    const [completeModalOpen, setCompleteModalOpen] = useState(false);
    const [actionType, setActionType] = useState(null);
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);

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

    const handleApproveClick = (record) => {
        setSelectedEnrollment(record);
        setActionType('approve');
        setApprovalModalOpen(true);
        form.resetFields();
    };

    const handleRejectClick = (record) => {
        setSelectedEnrollment(record);
        setActionType('reject');
        setRejectionModalOpen(true);
        form.resetFields();
    };

    const handleCompleteClick = (record) => {
        setSelectedEnrollment(record);
        setActionType('complete');
        setCompleteModalOpen(true);
        form.resetFields();
    };

    const handleApproveSubmit = async () => {
        try {
            setSubmitting(true);
            const token = getToken();
            const notes = form.getFieldValue('notes');

            await approveEnrollment(selectedEnrollment._id, token, notes);
            message.success('Enrollment approved successfully');
            setApprovalModalOpen(false);
            fetchEnrollments();
        } catch (error) {
            console.log(error);
            message.error(error?.response?.data?.message || 'Failed to approve enrollment');
        } finally {
            setSubmitting(false);
        }
    };

    const handleRejectSubmit = async () => {
        try {
            const rejectionReason = form.getFieldValue('rejectionReason');
            const notes = form.getFieldValue('notes');

            if (!rejectionReason) {
                message.error('Please provide rejection reason');
                return;
            }

            setSubmitting(true);
            const token = getToken();

            await rejectEnrollment(selectedEnrollment._id, token, rejectionReason, notes);
            message.success('Enrollment rejected successfully');
            setRejectionModalOpen(false);
            fetchEnrollments();
        } catch (error) {
            console.log(error);
            message.error(error?.response?.data?.message || 'Failed to reject enrollment');
        } finally {
            setSubmitting(false);
        }
    };

    const handleCompleteSubmit = async () => {
        try {
            setSubmitting(true);
            const token = getToken();
            const notes = form.getFieldValue('notes');

            await completeEnrollment(selectedEnrollment._id, token, notes);
            message.success('Enrollment completed successfully');
            setCompleteModalOpen(false);
            fetchEnrollments();
        } catch (error) {
            console.log(error);
            message.error(error?.response?.data?.message || 'Failed to complete enrollment');
        } finally {
            setSubmitting(false);
        }
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
            pending: 'orange',// chờ admin duyệt
            approved: 'green',
            rejected: 'red',
            cancelled: 'default',
            completed: 'blue'
        };
        return colors[status] || 'blue';
    };

    const stats = {
        total: enrollments.length,
        approved: enrollments.filter(e => e.status === 'approved').length,
        pending: enrollments.filter(e => e.status === 'pending').length,
        rejected: enrollments.filter(e => e.status === 'rejected').length,
        completed: enrollments.filter(e => e.status === 'completed').length,
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
            render: (status) => {
                let icon = null;
                if (status === 'approved') icon = <CheckCircleOutlined />;
                else if (status === 'pending') icon = <ClockCircleOutlined />;
                else if (status === 'rejected') icon = <CloseCircleOutlined />;

                return (
                    <Tag icon={icon} color={getStatusColor(status)}>
                        {status?.toUpperCase()}
                    </Tag>
                );
            },
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
            title: 'Approved By',
            key: 'approvedBy',
            width: 150,
            render: (_, record) => (
                <Text>
                    {record?.approvedBy ? record.approvedBy.name : '-'}
                </Text>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            width: 300,
            render: (_, record) => (
                <Space>
                    <Button
                        type="default"
                        size="small"
                        onClick={() => handleViewDetails(record)}
                    >
                        Details
                    </Button>
                    {record.status === 'pending' && (
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => handleApproveClick(record)}
                        >
                            Approve
                        </Button>
                    )}
                    {record.status === 'approved' && (
                        <Button
                            type="primary"
                            style={{ background: '#52c41a', borderColor: '#52c41a' }}
                            size="small"
                            onClick={() => handleCompleteClick(record)}
                        >
                            ✓ Complete
                        </Button>
                    )}
                    {record.status !== 'rejected' && record.status !== 'completed' && (
                        <Button
                            danger
                            size="small"
                            onClick={() => handleRejectClick(record)}
                        >
                            Reject
                        </Button>
                    )}
                    <Popconfirm
                        title="Delete Enrollment"
                        description="Are you sure you want to remove this enrollment?"
                        onConfirm={() => handleDeleteEnrollment(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            ghost
                            danger
                            icon={<DeleteOutlined />}
                            size="small"
                        >
                            Delete
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
                            prefix={<CloseCircleOutlined style={{ color: 'red' }} />}
                            valueStyle={{ color: 'red' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card>
                        <Statistic
                            title="Completed"
                            value={stats.completed}
                            prefix="🎓"
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
            </Row>

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
                            <Select.Option value="pending">Pending</Select.Option>
                            <Select.Option value="approved">Approved</Select.Option>
                            <Select.Option value="rejected">Rejected</Select.Option>
                            <Select.Option value="completed">Completed</Select.Option>
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
                    scroll={{ x: 1200 }}
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
                                {selectedEnrollment?.approvedBy && (
                                    <>
                                        <p>
                                            <strong>Approved By:</strong> {selectedEnrollment.approvedBy.name}
                                        </p>
                                        <p>
                                            <strong>Approved Date:</strong>{' '}
                                            {new Date(selectedEnrollment.approvedAt).toLocaleDateString()}
                                        </p>
                                    </>
                                )}
                                {selectedEnrollment?.rejectionReason && (
                                    <p>
                                        <strong>Rejection Reason:</strong> {selectedEnrollment.rejectionReason}
                                    </p>
                                )}
                                {selectedEnrollment?.notes && (
                                    <p>
                                        <strong>Notes:</strong> {selectedEnrollment.notes}
                                    </p>
                                )}
                            </Card>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Approval Modal */}
            <Modal
                title="Approve Enrollment"
                open={approvalModalOpen}
                onOk={handleApproveSubmit}
                onCancel={() => setApprovalModalOpen(false)}
                confirmLoading={submitting}
                okText="Approve"
            >
                <Form form={form} layout="vertical">
                    <Form.Item>
                        <Text strong>
                            Confirm approval for {selectedEnrollment?.userId?.name} - {selectedEnrollment?.courseId?.title}
                        </Text>
                    </Form.Item>
                    <Form.Item
                        label="Notes (Optional)"
                        name="notes"
                    >
                        <Input.TextArea rows={3} placeholder="Add any notes about this approval" />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Rejection Modal */}
            <Modal
                title="Reject Enrollment"
                open={rejectionModalOpen}
                onOk={handleRejectSubmit}
                onCancel={() => setRejectionModalOpen(false)}
                confirmLoading={submitting}
                okText="Reject"
                okButtonProps={{ danger: true }}
            >
                <Form form={form} layout="vertical">
                    <Form.Item>
                        <Text strong>
                            Confirm rejection for {selectedEnrollment?.userId?.name} - {selectedEnrollment?.courseId?.title}
                        </Text>
                    </Form.Item>
                    <Form.Item
                        label="Rejection Reason *"
                        name="rejectionReason"
                        rules={[{ required: true, message: 'Please provide a rejection reason' }]}
                    >
                        <Input.TextArea rows={3} placeholder="Explain why this enrollment is being rejected" />
                    </Form.Item>
                    <Form.Item
                        label="Additional Notes (Optional)"
                        name="notes"
                    >
                        <Input.TextArea rows={2} placeholder="Add any additional notes" />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Complete Modal */}
            <Modal
                title="✓ Complete Enrollment"
                open={completeModalOpen}
                onOk={handleCompleteSubmit}
                onCancel={() => setCompleteModalOpen(false)}
                confirmLoading={submitting}
                okText="Complete"
                okButtonProps={{ style: { background: '#52c41a', borderColor: '#52c41a' } }}
            >
                <Form form={form} layout="vertical">
                    <Form.Item>
                        <Text strong>
                            Mark as completed for {selectedEnrollment?.userId?.name} - {selectedEnrollment?.courseId?.title}
                        </Text>
                    </Form.Item>
                    <Form.Item
                        label="Completion Notes (Optional)"
                        name="notes"
                    >
                        <Input.TextArea rows={3} placeholder="Add notes about course completion (e.g., Final grade, achievements, etc.)" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default EnrollmentManager;
