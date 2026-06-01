import { Card, Row, Col, Statistic, Table, Tag, Button, Space, Tooltip, Spin } from 'antd';
import { UserOutlined, FileTextOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import {  useState } from 'react';

const TeacherDashboard = () => {
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({
        totalStudents: 25,
        pendingReports: 8,
        gradedReports: 17,
        approvedReports: 12,
    });

    const recentReports = [
        {
            key: 1,
            studentName: 'Nguyễn Văn A',
            studentId: 'SV001',
            title: 'Hệ thống quản lý học tập',
            submitDate: '2026-06-01',
            status: 'Pending',
            grade: '-',
        },
        {
            key: 2,
            studentName: 'Trần Thị B',
            studentId: 'SV002',
            title: 'App bán hàng online',
            submitDate: '2026-05-31',
            status: 'Graded',
            grade: '8.5',
        },
        {
            key: 3,
            studentName: 'Lê Văn C',
            studentId: 'SV003',
            title: 'Platform hẹn hò thông minh',
            submitDate: '2026-05-30',
            status: 'Approved',
            grade: '9.0',
        },
    ];

    const columns = [
        {
            title: 'Sinh viên',
            dataIndex: 'studentName',
            key: 'studentName',
        },
        {
            title: 'ID SV',
            dataIndex: 'studentId',
            key: 'studentId',
        },
        {
            title: 'Tiêu đề đồ án',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
        },
        {
            title: 'Ngày nộp',
            dataIndex: 'submitDate',
            key: 'submitDate',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = 'default';
                if (status === 'Pending') color = 'orange';
                if (status === 'Graded') color = 'blue';
                if (status === 'Approved') color = 'green';
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: 'Điểm',
            dataIndex: 'grade',
            key: 'grade',
            render: (grade) => <span style={{ fontWeight: 600, color: '#1890ff' }}>{grade}</span>,
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Xem chi tiết">
                        <Button type="primary" size="small" ghost>Xem</Button>
                    </Tooltip>
                    {record.status === 'Pending' && (
                        <Tooltip title="Chấm điểm">
                            <Button type="primary" size="small">Chấm</Button>
                        </Tooltip>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <Spin spinning={loading}>
            <div>
                {/* Statistics */}
                <Row gutter={16} style={{ marginBottom: 24 }}>
                    <Col xs={24} sm={12} lg={6}>
                        <Card>
                            <Statistic
                                title="Tổng sinh viên"
                                value={stats.totalStudents}
                                prefix={<UserOutlined />}
                                valueStyle={{ color: '#1890ff' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card>
                            <Statistic
                                title="Báo cáo chờ xử lý"
                                value={stats.pendingReports}
                                prefix={<ClockCircleOutlined />}
                                valueStyle={{ color: '#faad14' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card>
                            <Statistic
                                title="Đã chấm điểm"
                                value={stats.gradedReports}
                                prefix={<CheckCircleOutlined />}
                                valueStyle={{ color: '#52c41a' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card>
                            <Statistic
                                title="Đã phê duyệt"
                                value={stats.approvedReports}
                                prefix={<FileTextOutlined />}
                                valueStyle={{ color: '#722ed1' }}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Recent Reports */}
                <Card
                    title="📋 Báo cáo gần đây"
                    style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
                >
                    <Table
                        columns={columns}
                        dataSource={recentReports}
                        pagination={{ pageSize: 5 }}
                        loading={loading}
                    />
                </Card>
            </div>
        </Spin>
    );
};

export default TeacherDashboard;
