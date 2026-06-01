import { Card, Table, Button, Tag, Space, Input, Tooltip, Spin, Empty } from 'antd';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

const TeacherReports = () => {
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');

    const reports = [
        {
            key: 1,
            studentName: 'Nguyễn Văn A',
            studentId: 'SV001',
            title: 'Hệ thống quản lý học tập',
            submitDate: '2026-06-01',
            status: 'Pending',
            fileUrl: '#',
            size: '12.5 MB',
        },
        {
            key: 2,
            studentName: 'Trần Thị B',
            studentId: 'SV002',
            title: 'App bán hàng online',
            submitDate: '2026-05-31',
            status: 'Approved',
            fileUrl: '#',
            size: '15.3 MB',
        },
        {
            key: 3,
            studentName: 'Lê Văn C',
            studentId: 'SV003',
            title: 'Platform hẹn hò thông minh',
            submitDate: '2026-05-30',
            status: 'Approved',
            fileUrl: '#',
            size: '18.7 MB',
        },
    ];

    const filteredReports = reports.filter((report) =>
        report.studentName.toLowerCase().includes(searchText.toLowerCase()) ||
        report.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: 'Sinh viên',
            dataIndex: 'studentName',
            key: 'studentName',
            width: 150,
        },
        {
            title: 'ID',
            dataIndex: 'studentId',
            key: 'studentId',
            width: 100,
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
            width: 120,
        },
        {
            title: 'Dung lượng',
            dataIndex: 'size',
            key: 'size',
            width: 100,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status) => {
                let color = 'default';
                if (status === 'Pending') color = 'orange';
                if (status === 'Approved') color = 'green';
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            width: 150,
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="Xem báo cáo">
                        <Button type="primary" size="small" ghost icon={<EyeOutlined />}>
                            Xem
                        </Button>
                    </Tooltip>
                    <Tooltip title="Tải xuống">
                        <Button size="small" >
                            Tải
                        </Button>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <Spin spinning={loading}>
            <Card
                title="📄 Quản lý báo cáo đồ án"
                extra={
                    <Input
                        placeholder="Tìm kiếm báo cáo..."
                        prefix={<SearchOutlined />}
                        style={{ width: 250 }}
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                    />
                }
                style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
            >
                {filteredReports.length === 0 ? (
                    <Empty description="Không có báo cáo nào" />
                ) : (
                    <Table
                        columns={columns}
                        dataSource={filteredReports}
                        pagination={{ pageSize: 10 }}
                        loading={loading}
                        scroll={{ x: 1000 }}
                    />
                )}
            </Card>
        </Spin>
    );
};

export default TeacherReports;
