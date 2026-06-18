import { Avatar, Button, Card, Col, Form, Input, message, Row, Switch, Upload } from 'antd';
import React, { useEffect } from 'react';
import { updateProfile } from '../../service/user.service';
import { SaveOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { getToken } from '../../utils/Auth';
import { useNavigate } from 'react-router-dom'

const AdminSetting = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        form.setFieldsValue({
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
            emailNotification: true,
            systemNotification: true
        });
    }, []);

    const onFinish = async (values) => {
        try {
            const token = getToken();

            await updateProfile(
                {
                    name: values.name,
                    email: values.email,
                    password: values.password
                },
                token
            );
            navigate('/users/profile')
            message.success("Cập nhật thành công")
        } catch (error) {
            console.log(error);
            message.error("Cập nhật thất bại")
        }
    }
    return (
        <div>
            <div style={{ padding: 20 }}>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                >
                    <Row gutter={[24, 24]}>
                        <Col span={24}>
                            <Card title="👤 Personal Information">
                                <Row gutter={24}>
                                    <Col span={24}>
                                        <div
                                            style={{
                                                textAlign: "center",
                                                marginBottom: 20,
                                            }}
                                        >
                                            <Avatar
                                                size={90}
                                                icon={<UserOutlined />}
                                            />

                                            <br />
                                            <br />

                                            <Upload showUploadList={false}>
                                                <Button icon={<UploadOutlined />}>
                                                    Upload Avatar
                                                </Button>
                                            </Upload>
                                        </div>
                                    </Col>

                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            label="Full Name"
                                            name="name"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            label="Phone"
                                            name="phone"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>

                        {/* Security */}
                        <Col span={24}>
                            <Card title="🔐 Change Password">
                                <Row gutter={24}>
                                    <Col xs={24} md={8}>
                                        <Form.Item
                                            label="Current Password"
                                            name="oldPassword"
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} md={8}>
                                        <Form.Item
                                            label="New Password"
                                            name="newPassword"
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} md={8}>
                                        <Form.Item
                                            label="Confirm Password"
                                            name="confirmPassword"
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>

                        {/* Notification */}
                        <Col span={24}>
                            <Card title="🔔 Notification Settings">
                                <Form.Item
                                    label="Email Notification"
                                    name="emailNotification"
                                    valuePropName="checked"
                                >
                                    <Switch />
                                </Form.Item>

                                <Form.Item
                                    label="System Notification"
                                    name="systemNotification"
                                    valuePropName="checked"
                                >
                                    <Switch />
                                </Form.Item>
                            </Card>
                        </Col>

                        {/* Save */}
                        <Col span={24}>
                            <Button
                                htmlType="submit"
                                type="primary"
                                size="large"
                                icon={<SaveOutlined />}
                            >
                                Save Changes
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
}

export default AdminSetting;
