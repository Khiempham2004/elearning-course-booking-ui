import React, { useEffect, useState } from 'react';
import {
    Card,
    Button,
    message,
    Space,
    Tag,
    Row,
    Col,
    Statistic,
    Input,
    Select,
    Typography,
    Modal,
    Empty,
    Skeleton,
    Divider,
} from 'antd';
import {
    ReloadOutlined,
    SearchOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import { getMyCourses, deleteEnrollments } from '../../service/enrollment.service';
import { getToken } from '../../utils/Auth';

const { Title, Text } = Typography;

const EnrollmentStatus = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedEnrollment, setSelectedEnrollment] = useState(null);
    const [cancelling, setCancelling] = useState(false);

    const fetchEnrollments = async () => {
        try {
            setLoading(true);
            const token = getToken();
            const res = await getMyCourses(token);
            console.log('My Courses:', res?.data);
            setEnrollments(res?.data?.courses || []);
        } catch (error) {
            console.log(error);
            message.error('Failed to fetch your enrollments');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const handleDeleteEnrollment = async (id) => {
        try {
            setCancelling(true);
            const token = getToken();
            await deleteEnrollments(id, token);
            message.success('Enrollment cancelled successfully');
            fetchEnrollments();
        } catch (error) {
            console.log(error);
            message.error('Failed to cancel enrollment');
        } finally {
            setCancelling(false);
        }
    };

    const handleViewDetails = (record) => {
        setSelectedEnrollment(record);
        setDetailModalOpen(true);
    };

    const filteredEnrollments = enrollments.filter((enrollment) => {
        const searchLower = searchText.toLowerCase();
        const matchSearch =
            enrollment?.courseId?.title?.toLowerCase().includes(searchLower) ||
            enrollment?.courseId?.level?.toLowerCase().includes(searchLower) ||
            enrollment?.courseId?.catagory?.toLowerCase().includes(searchLower);

        const matchStatus =
            statusFilter === 'all' ? true : enrollment?.status === statusFilter;

        return matchSearch && matchStatus;
    });

    const getStatusColor = (status) => {
        const colors = {
            approved: 'green',
            pending: 'orange',
            rejected: 'red',
            completed: 'blue',
        };
        return colors[status] || 'default';
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved':
                return <CheckCircleOutlined />;
            case 'pending':
                return <ClockCircleOutlined />;
            case 'rejected':
                return <CloseCircleOutlined />;
            default:
                return null;
        }
    };

    const stats = {
        total: enrollments.length,
        approved: enrollments.filter(e => e.status === 'approved').length,
        pending: enrollments.filter(e => e.status === 'pending').length,
        rejected: enrollments.filter(e => e.status === 'rejected').length,
    };

    const canEnrollMore = () => enrollments.filter(e => e.status === 'approved').length < 10;

    return (
        <div style={{ padding: 24, background: '#f5f7fa', minHeight: '100vh' }}>
            {/* Header */}
            <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
                <Col>
                    <Title level={2} style={{ margin: 0 }}>
                        📚 My Course Enrollments
                    </Title>
                    <Text type="secondary">Track the status of your course registrations</Text>
                </Col>
                <Col>
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={fetchEnrollments}
                        size="large"
                        loading={loading}
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
            </Row>

            {/* Filters */}
            <Card style={{ marginBottom: 24 }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Input
                            size="large"
                            placeholder="Search by course name or category..."
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
                            <Select.Option value="approved">✅ Approved</Select.Option>
                            <Select.Option value="pending">⏳ Pending</Select.Option>
                            <Select.Option value="rejected">❌ Rejected</Select.Option>
                            <Select.Option value="completed">🎓 Completed</Select.Option>
                        </Select>
                    </Col>
                </Row>
            </Card>

            {/* Enrollments List */}
            {loading ? (
                <Row gutter={[16, 16]}>
                    {[1, 2, 3].map(i => (
                        <Col xs={24} md={12} key={i}>
                            <Card>
                                <Skeleton active />
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : filteredEnrollments.length === 0 ? (
                <Card>
                    <Empty
                        description={searchText || statusFilter !== 'all' ? "No enrollments found" : "You haven't enrolled in any courses yet"}
                        style={{ padding: '50px 0' }}
                    />
                </Card>
            ) : (
                <Row gutter={[16, 16]}>
                    {filteredEnrollments.map((enrollment) => (
                        <Col xs={24} md={12} lg={8} key={enrollment._id}>
                            <Card
                                hoverable
                                style={{
                                    borderLeft: `4px solid ${getStatusColor(enrollment.status) === 'green' ? '#52c41a' : getStatusColor(enrollment.status) === 'orange' ? '#faad14' : getStatusColor(enrollment.status) === 'red' ? '#f5222d' : '#1890ff'}`,
                                    height: '100%'
                                }}
                            >
                                <div style={{ marginBottom: 16 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                                        <Text strong style={{ fontSize: 16 }}>
                                            {enrollment?.courseId?.title || 'N/A'}
                                        </Text>
                                        <Tag
                                            icon={getStatusIcon(enrollment.status)}
                                            color={getStatusColor(enrollment.status)}
                                        >
                                            {enrollment?.status?.toUpperCase()}
                                        </Tag>
                                    </div>
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        {enrollment?.courseId?.level || 'Level N/A'} • {enrollment?.courseId?.catagory || 'Category N/A'}
                                    </Text>
                                </div>

                                <Divider style={{ margin: '12px 0' }} />

                                <div style={{ marginBottom: 12 }}>
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        <strong>Enrolled:</strong> {new Date(enrollment?.createdAt).toLocaleDateString()}
                                    </Text>
                                </div>

                                {enrollment?.status === 'approved' && (
                                    <div style={{ marginBottom: 12 }}>
                                        <Text type="success" style={{ fontSize: 12 }}>
                                            ✓ You can now access this course
                                        </Text>
                                    </div>
                                )}

                                {enrollment?.status === 'rejected' && (
                                    <div style={{ marginBottom: 12 }}>
                                        <Text type="danger" style={{ fontSize: 12 }}>
                                            <strong>Rejection Reason:</strong>
                                        </Text>
                                        <p style={{ fontSize: 12, marginTop: 4 }}>
                                            {enrollment?.rejectionReason || 'No reason provided'}
                                        </p>
                                    </div>
                                )}

                                {enrollment?.status === 'pending' && (
                                    <div style={{ marginBottom: 12 }}>
                                        <Text type="warning" style={{ fontSize: 12 }}>
                                            ⏳ Waiting for admin approval
                                        </Text>
                                    </div>
                                )}

                                <Divider style={{ margin: '12px 0' }} />

                                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                                    <Button
                                        type="primary"
                                        size="small"
                                        icon={<EyeOutlined />}
                                        onClick={() => handleViewDetails(enrollment)}
                                    >
                                        Details
                                    </Button>
                                    {enrollment?.status !== 'rejected' && enrollment?.status !== 'completed' && (
                                        <Button
                                            danger
                                            size="small"
                                            icon={<DeleteOutlined />}
                                            onClick={() => handleDeleteEnrollment(enrollment._id)}
                                            loading={cancelling}
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                </Space>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

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
                width={600}
            >
                {selectedEnrollment && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                            <Text strong>Course Information</Text>
                            <Card style={{ marginTop: 8 }}>
                                <p>
                                    <strong>Course Name:</strong> {selectedEnrollment?.courseId?.title || 'N/A'}
                                </p>
                                <p>
                                    <strong>Level:</strong> {selectedEnrollment?.courseId?.level || 'N/A'}
                                </p>
                                <p>
                                    <strong>Category:</strong> {selectedEnrollment?.courseId?.catagory || 'N/A'}
                                </p>
                                <p>
                                    <strong>Price:</strong> ${selectedEnrollment?.courseId?.price || '0'}
                                </p>
                                <p>
                                    <strong>Lessons:</strong> {selectedEnrollment?.courseId?.lessons || '0'}
                                </p>
                                <p>
                                    <strong>Rating:</strong> ⭐ {selectedEnrollment?.courseId?.rating || '0'}/5
                                </p>
                            </Card>
                        </div>

                        <div>
                            <Text strong>Enrollment Status</Text>
                            <Card style={{ marginTop: 8 }}>
                                <p>
                                    <strong>Status:</strong>{' '}
                                    <Tag
                                        icon={getStatusIcon(selectedEnrollment?.status)}
                                        color={getStatusColor(selectedEnrollment?.status)}
                                    >
                                        {selectedEnrollment?.status?.toUpperCase()}
                                    </Tag>
                                </p>
                                <p>
                                    <strong>Enrollment Date:</strong>{' '}
                                    {new Date(selectedEnrollment?.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>

                                {selectedEnrollment?.approvedBy && (
                                    <>
                                        <p>
                                            <strong>Approved By:</strong> {selectedEnrollment.approvedBy.name}
                                        </p>
                                        <p>
                                            <strong>Approval Date:</strong>{' '}
                                            {new Date(selectedEnrollment.approvedAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </>
                                )}

                                {selectedEnrollment?.rejectionReason && (
                                    <div style={{ marginTop: 12, padding: 12, backgroundColor: '#fff2f0', borderRadius: 4 }}>
                                        <p style={{ margin: 0 }}>
                                            <strong>❌ Rejection Reason:</strong>
                                        </p>
                                        <p style={{ margin: '8px 0 0 0' }}>
                                            {selectedEnrollment.rejectionReason}
                                        </p>
                                    </div>
                                )}

                                {selectedEnrollment?.notes && (
                                    <div style={{ marginTop: 12, padding: 12, backgroundColor: '#f6f8fb', borderRadius: 4 }}>
                                        <p style={{ margin: 0 }}>
                                            <strong>📝 Notes:</strong>
                                        </p>
                                        <p style={{ margin: '8px 0 0 0' }}>
                                            {selectedEnrollment.notes}
                                        </p>
                                    </div>
                                )}

                                {selectedEnrollment?.completedAt && (
                                    <p>
                                        <strong>Completed Date:</strong>{' '}
                                        {new Date(selectedEnrollment.completedAt).toLocaleDateString()}
                                    </p>
                                )}
                            </Card>
                        </div>

                        {selectedEnrollment?.status === 'approved' && (
                            <div style={{ padding: 12, backgroundColor: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: 4 }}>
                                <Text type="success">
                                    ✅ Your enrollment has been approved! You can now access this course.
                                </Text>
                            </div>
                        )}

                        {selectedEnrollment?.status === 'pending' && (
                            <div style={{ padding: 12, backgroundColor: '#fffbe6', border: '1px solid #ffe58f', borderRadius: 4 }}>
                                <Text type="warning">
                                    ⏳ Your enrollment is pending admin approval. You'll be notified once it's reviewed.
                                </Text>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default EnrollmentStatus;
