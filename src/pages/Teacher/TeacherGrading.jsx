import { Card, Table, Button, Tag, Space, Modal, Form, Input, InputNumber, Tooltip, Empty, Spin } from 'antd';
import { CheckOutlined, CommentOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { message } from 'antd';

const TeacherGrading = () => {
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [form] = Form.useForm();

    const reports = [
        {
            key: 1,
            studentName: 'Nguyễn Văn A',
            studentId: 'SV001',
            title: 'Hệ thống quản lý học tập',
            submitDate: '2026-06-01',
            status: 'Pending',
            grade: '-',
            comments: '',
        },
        {
            key: 2,
            studentName: 'Trần Thị B',
            studentId: 'SV002',
            title: 'App bán hàng online',
            submitDate: '2026-05-31',
            status: 'Graded',
            grade: '8.5',
            comments: 'Tốt, cần cải thiện giao diện',
        },
    ];

    const handleGrade = (record) => {
        setSelectedReport(record);
        form.setFieldsValue({
            grade: record.grade === '-' ? undefined : record.grade,
            comments: record.comments,
        });
        setIsModalVisible(true);
    };

    const handleSubmitGrade = async (values) => {
        try {
            setLoading(true);
            // API call here
            console.log('Grading:', selectedReport.key, values);
            message.success('Chấm điểm thành công!');
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            message.error('Lỗi khi chấm điểm');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Sinh viên',
            dataIndex: 'studentName',
            key: 'studentName',
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
            render: (status) => <Tag color={status === 'Pending' ? 'orange' : 'green'}>{status}</Tag>,
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
                <Space size="small">
                    <Tooltip title="Xem báo cáo">
                        <Button 
                            type="primary" 
                            size="small" 
                            ghost 
                            icon={<EyeOutlined />}
                        >
                            Xem
                        </Button>
                    </Tooltip>
                    <Tooltip title="Chấm điểm & Nhận xét">
                        <Button 
                            type="primary" 
                            size="small" 
                            icon={<CheckOutlined />}
                            onClick={() => handleGrade(record)}
                        >
                            Chấm
                        </Button>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <Spin spinning={loading}>
            <Card 
                title="⭐ Chấm điểm & Feedback"
                extra={<span style={{ color: '#999' }}>{reports.length} báo cáo</span>}
                style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
            >
                <Table
                    columns={columns}
                    dataSource={reports}
                    pagination={{ pageSize: 10 }}
                    loading={loading}
                />
            </Card>

            {/* Grading Modal */}
            <Modal
                title={`Chấm điểm - ${selectedReport?.studentName}`}
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                }}
                okText="Lưu"
                cancelText="Hủy"
                onOk={() => form.submit()}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmitGrade}
                >
                    <Form.Item label="Tiêu đề đồ án" disabled>
                        <p style={{ fontWeight: 600 }}>{selectedReport?.title}</p>
                    </Form.Item>

                    <Form.Item
                        label="Điểm (0-10)"
                        name="grade"
                        rules={[
                            { required: true, message: 'Vui lòng nhập điểm' },
                            { type: 'number', min: 0, max: 10, message: 'Điểm phải từ 0-10' },
                        ]}
                    >
                        <InputNumber min={0} max={10} step={0.5} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Nhận xét & Feedback"
                        name="comments"
                        rules={[{ required: true, message: 'Vui lòng nhập nhận xét' }]}
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="Nhập nhận xét chi tiết cho sinh viên..."
                        />
                    </Form.Item>

                    <Form.Item label="Phê duyệt báo cáo?">
                        <Space>
                            <Button type="primary" icon={<CheckOutlined />} onClick={() => {
                                form.submit();
                                message.success('Báo cáo đã phê duyệt!');
                            }}>
                                Phê duyệt
                            </Button>
                            <Button type="dashed" onClick={() => setIsModalVisible(false)}>
                                Chỉnh sửa sau
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </Spin>
    );
};

export default TeacherGrading;
