import { Card, Form, Input, Button, Divider, Space, message, Spin } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useState } from 'react';

const TeacherSettings = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            setLoading(true);
            console.log('Settings:', values);
            message.success('Cập nhật cài đặt thành công!');
        } catch (error) {
            message.error('Lỗi khi cập nhật cài đặt');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Spin spinning={loading}>
            <Card title="⚙️ Cài đặt" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        fullname: 'Nguyễn Thanh Tuấn',
                        email: 'teacher@example.com',
                        department: 'Công nghệ Thông tin',
                        phone: '0912345678',
                    }}
                >
                    <h3>📋 Thông tin cá nhân</h3>
                    <Form.Item
                        label="Họ và tên"
                        name="fullname"
                        rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                    >
                        <Input placeholder="Nhập họ và tên" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email' },
                            { type: 'email', message: 'Email không hợp lệ' },
                        ]}
                    >
                        <Input placeholder="Nhập email" />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>

                    <Form.Item
                        label="Bộ môn"
                        name="department"
                        rules={[{ required: true, message: 'Vui lòng nhập bộ môn' }]}
                    >
                        <Input placeholder="Nhập bộ môn" />
                    </Form.Item>

                    <Divider />

                    <h3>🔐 Bảo mật</h3>
                    <Form.Item
                        label="Mật khẩu hiện tại"
                        name="currentPassword"
                    >
                        <Input.Password placeholder="Nhập mật khẩu hiện tại" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu mới"
                        name="newPassword"
                    >
                        <Input.Password placeholder="Nhập mật khẩu mới" />
                    </Form.Item>

                    <Form.Item
                        label="Xác nhận mật khẩu mới"
                        name="confirmPassword"
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu không khớp'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Xác nhận mật khẩu mới" />
                    </Form.Item>

                    <Divider />

                    <h3>⏰ Cài đặt chấm điểm</h3>
                    <Form.Item
                        label="Thời gian chấm điểm (ngày)"
                        name="gradingDeadline"
                    >
                        <Input placeholder="Nhập số ngày" type="number" />
                    </Form.Item>

                    <Form.Item
                        label="Ghi chú"
                        name="note"
                    >
                        <Input.TextArea 
                            rows={3} 
                            placeholder="Nhập ghi chú..." 
                        />
                    </Form.Item>

                    <Space>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            icon={<SaveOutlined />}
                            size="large"
                        >
                            Lưu thay đổi
                        </Button>
                        <Button onClick={() => form.resetFields()}>
                            Đặt lại
                        </Button>
                    </Space>
                </Form>
            </Card>
        </Spin>
    );
};

export default TeacherSettings;
