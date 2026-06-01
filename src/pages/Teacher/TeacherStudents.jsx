import { Card, Table, Button, Tag, Space, Input, Tooltip, Spin, Popconfirm, message } from 'antd';
import { EyeOutlined, MailOutlined, PhoneOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

const TeacherStudents = () => {
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');

    const students = [
        {
            key: 1,
            name: 'Nguyễn Văn A',
            studentId: 'SV001',
            email: 'nguyenvana@student.edu',
            phone: '0912345678',
            status: 'Active',
            joinDate: '2026-01-15',
            reportCount: 1,
        },
        {
            key: 2,
            name: 'Trần Thị B',
            studentId: 'SV002',
            email: 'tranthib@student.edu',
            phone: '0987654321',
            status: 'Active',
            joinDate: '2026-01-16',
            reportCount: 1,
        },
        {
            key: 3,
            name: 'Lê Văn C',
            studentId: 'SV003',
            email: 'levanc@student.edu',
            phone: '0934567890',
            status: 'Inactive',
            joinDate: '2026-01-17',
            reportCount: 0,
        },
    ];

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchText.toLowerCase()) ||
        student.studentId.includes(searchText) ||
        student.email.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleDelete = (studentId) => {
        message.success(`Xóa sinh viên ${studentId} thành công!`);
    };

    const columns = [
        {
            title: 'Sinh viên',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
        },
        {
            title: 'ID SV',
            dataIndex: 'studentId',
            key: 'studentId',
            width: 100,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (email) => (
                <Tooltip title={email}>
                    <span style={{ color: '#1890ff', cursor: 'pointer' }}>{email}</span>
                </Tooltip>
            ),
        },
        {
            title: 'Điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            render: (phone) => (
                <Tooltip title={phone}>
                    <span>{phone}</span>
                </Tooltip>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
            ),
        },
        {
            title: 'Báo cáo',
            dataIndex: 'reportCount',
            key: 'reportCount',
            width: 100,
            render: (count) => <span style={{ fontWeight: 600, color: '#1890ff' }}>{count}</span>,
        },
        {
            title: 'Hành động',
            key: 'action',
            width: 180,
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="Xem chi tiết">
                        <Button type="primary" size="small" ghost icon={<EyeOutlined />}>
                            Xem
                        </Button>
                    </Tooltip>
                    <Tooltip title="Gửi email">
                        <Button size="small" icon={<MailOutlined />}>
                            Email
                        </Button>
                    </Tooltip>
                    <Popconfirm
                        title="Xoá sinh viên?"
                        description="Hành động này không thể hoàn tác"
                        onConfirm={() => handleDelete(record.studentId)}
                        okText="Xoá"
                        cancelText="Hủy"
                    >
                        <Button danger size="small" icon={<DeleteOutlined />}>
                            Xoá
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Spin spinning={loading}>
            <Card
                title="👥 Danh sách sinh viên"
                extra={
                    <Input
                        placeholder="Tìm kiếm sinh viên..."
                        prefix={<SearchOutlined />}
                        style={{ width: 250 }}
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                    />
                }
                style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
            >
                <Table
                    columns={columns}
                    dataSource={filteredStudents}
                    pagination={{ pageSize: 10 }}
                    loading={loading}
                    scroll={{ x: 1200 }}
                />
            </Card>
        </Spin>
    );
};

export default TeacherStudents;
