import React, { useEffect, useState } from 'react';
import {
    Card,
    Button,
    Form,
    Input,
    message,
    Spin,
    Row,
    Col,
    Typography,
    Divider,
    Space,
    Steps,
    Result,
} from 'antd';
import {
    CheckOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    MailOutlined,
    ArrowLeftOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourseById } from '../../service/course.service';
import { createEnrollment } from '../../service/enrollment.service';
import { getToken } from '../../utils/Auth';
import { resolveApiAssetUrl } from '../../utils/apiUrl';

const { Title, Text, Paragraph } = Typography;

const imageModules = import.meta.glob(
    "../../assets/Images/*",
    { eager: true }
);

const getLocalImage = (courseImage) => {
    if (!courseImage) return "";

    // ảnh upload từ server
    if (courseImage.startsWith("/uploads")) {
        return resolveApiAssetUrl(courseImage);
    }

    // ảnh local trong assets
    const filename = courseImage.split("/").pop();
    const key = Object.keys(imageModules).find(
        (k) => k.includes(filename)
    );
    return key ? imageModules[key].default : courseImage;
};
const getImageUrl = (imagePath) => {
    if (!imagePath) return "";

    // image upload tu server
    if (imagePath.startsWith("/uploads")) {
        return resolveApiAssetUrl(imagePath);
    };
    return getLocalImage(imagePath);
}

const Enrollment = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [course, setCourse] = useState({});
    const [loading, setLoading] = useState(false);
    const [enrolling, setEnrolling] = useState(false);
    const [step, setStep] = useState(0);
    const [enrolled, setEnrolled] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                const res = await getCourseById(courseId);
                setCourse(res.data.data);
            } catch (error) {
                console.log(error);
                message.error('Failed to load course details');
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [courseId]);

    const handleEnroll = async () => {
        try {
            setEnrolling(true);
            const token = getToken();

            if (!token) {
                message.error('Please log in first');
                navigate('/signin');
                return;
            }

            await createEnrollment(courseId, token);
            setStep(1);
            setEnrolled(true);

            message.success(
                'Đăng ký thành công. Vui lòng chờ Admin phê duyệt.'
            );

            setTimeout(() => {
                navigate('/users/enrollments');
            }, 2000);
        } catch (error) {
            console.log(error);
            message.error(
                error.response?.data?.message || 'Enrollment failed. Please try again.'
            );
            setStep(0);
        } finally {
            setEnrolling(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (enrolled) {
        return (
            <div style={{ padding: '40px 20px', minHeight: '100vh', background: '#f5f7fa' }}>
                <Row justify="center">
                    <Col xs={24} md={18} lg={12}>
                        <Result
                            status="success"
                            title="Đăng ký khóa học thành công"
                            subTitle="Yêu cầu đăng ký của bạn đang chờ Admin phê duyệt. Sau khi được duyệt, lịch học sẽ xuất hiện trong mục My Schedule."
                            extra={
                                <Button
                                    type="primary"
                                    onClick={() => navigate('/users/enrollment')}
                                >
                                    Xem trạng thái đăng ký
                                </Button>
                            }
                        />
                    </Col>
                </Row>
            </div>
        );
    }

    return (
        <div style={{ padding: '40px 20px', minHeight: '100vh', background: '#f5f7fa' }}>
            <Row justify="center">
                <Col xs={24} md={20} lg={16}>
                    {/* Back Button */}
                    <Button
                        type="text"
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate(-1)}
                        style={{ marginBottom: 24, marginTop: 70 }}
                    >
                        Back
                    </Button>

                    {/* Main Card */}
                    <Card
                        style={{
                            borderRadius: 16,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Progress Steps */}
                        <Steps
                            current={step}
                            items={[
                                { title: 'Course Info', icon: <ShoppingCartOutlined /> },
                                { title: 'Enrollment', icon: <CheckOutlined /> },
                            ]}
                            style={{ marginBottom: 32 }}
                        />

                        <Divider />

                        <Row gutter={[32, 32]}>
                            {/* Course Summary */}
                            <Col xs={24} md={10}>
                                <Title level={4}>📚 Course Summary</Title>

                                {course?.courseImage && (
                                    <img
                                        src={getImageUrl(course.courseImage)}
                                        alt={course.title}
                                        style={{
                                            width: '100%',
                                            borderRadius: 12,
                                            marginBottom: 16,
                                            objectFit: 'cover',
                                            height: 220,
                                        }}
                                    />
                                )}

                                <Card
                                    size="small"
                                    style={{
                                        border: 'none',
                                        background: '#fafafa',
                                        marginBottom: 16,
                                    }}
                                >
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <div>
                                            <Text strong>Course Title</Text>
                                            <Paragraph style={{ margin: 0, color: '#1677ff' }}>
                                                {course?.title}
                                            </Paragraph>
                                        </div>

                                        <Divider style={{ margin: '12px 0' }} />

                                        <div>
                                            <Text strong>Instructor</Text>
                                            <Paragraph style={{ margin: 0 }}>
                                                {course?.instructor}
                                            </Paragraph>
                                        </div>

                                        <Divider style={{ margin: '12px 0' }} />

                                        <Row gutter={12}>
                                            <Col span={12}>
                                                <div>
                                                    <Text type="secondary">Level</Text>
                                                    <Paragraph style={{ margin: 0, fontWeight: 'bold' }}>
                                                        {course?.level}
                                                    </Paragraph>
                                                </div>
                                            </Col>
                                            <Col span={12}>
                                                <div>
                                                    <Text type="secondary">Price</Text>
                                                    <Paragraph style={{ margin: 0, fontWeight: 'bold', color: '#52c41a' }}>
                                                        ${course?.price}
                                                    </Paragraph>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Divider style={{ margin: '12px 0' }} />

                                        <Row gutter={12}>
                                            <Col span={12}>
                                                <div>
                                                    <Text type="secondary">Lessons</Text>
                                                    <Paragraph style={{ margin: 0, fontWeight: 'bold' }}>
                                                        {course?.lessons || 'N/A'}
                                                    </Paragraph>
                                                </div>
                                            </Col>
                                            <Col span={12}>
                                                <div>
                                                    <Text type="secondary">Rating</Text>
                                                    <Paragraph style={{ margin: 0, fontWeight: 'bold' }}>
                                                        ⭐ {course?.rating}
                                                    </Paragraph>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Divider style={{ margin: '12px 0' }} />

                                        <div>
                                            <Text type="secondary">Category</Text>
                                            <Paragraph style={{ margin: 0, fontWeight: 'bold' }}>
                                                {course?.catagory}
                                            </Paragraph>
                                        </div>
                                    </Space>
                                </Card>
                            </Col>

                            {/* Enrollment Form */}
                            <Col xs={24} md={14}>
                                <Title level={4}>✍️ Complete Your Enrollment</Title>
                                <Paragraph type="secondary">
                                    Fill in your details to enroll in this course
                                </Paragraph>

                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={handleEnroll}
                                    style={{ marginTop: 24 }}
                                >
                                    <Form.Item
                                        label={
                                            <Text strong style={{ fontSize: 14 }}>
                                                Course ID
                                            </Text>
                                        }
                                    >
                                        <Input
                                            value={courseId}
                                            readOnly
                                            disabled
                                            style={{ background: '#f5f5f5' }}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label={
                                            <Text strong style={{ fontSize: 14 }}>
                                                Course Name
                                            </Text>
                                        }
                                    >
                                        <Input
                                            value={course?.title}
                                            readOnly
                                            disabled
                                            style={{ background: '#f5f5f5' }}
                                        />
                                    </Form.Item>

                                    <Divider />

                                    <Title level={5}>Your Information</Title>

                                    <Form.Item
                                        label={<Text strong>Full Name</Text>}
                                        name="name"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please enter your full name',
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="Enter your full name"
                                            prefix={<UserOutlined />}
                                            size="large"
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label={<Text strong>Email Address</Text>}
                                        name="email"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please enter your email',
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="Enter your email"
                                            prefix={<MailOutlined />}
                                            type="email"
                                            size="large"
                                        />
                                    </Form.Item>

                                    <Divider />

                                    <div
                                        style={{
                                            background: '#f0f9ff',
                                            padding: 16,
                                            borderRadius: 8,
                                            border: '1px solid #87d068',
                                            marginBottom: 24,
                                        }}
                                    >
                                        <Space>
                                            <CheckOutlined style={{ color: '#52c41a', fontSize: 18 }} />
                                            <Text style={{ color: '#274002' }}>
                                                Your enrollment is secure and verified
                                            </Text>
                                        </Space>
                                    </div>

                                    <Button
                                        type="primary"
                                        size="large"
                                        htmlType="submit"
                                        block
                                        loading={enrolling}
                                        icon={<ShoppingCartOutlined />}
                                        style={{ height: 48, fontSize: 16 }}
                                    >
                                        {enrolling ? 'Enrolling...' : 'Enroll Now'}
                                    </Button>

                                    <Button
                                        block
                                        size="large"
                                        style={{ marginTop: 12, height: 48 }}
                                        onClick={() => navigate(-1)}
                                    >
                                        Cancel
                                    </Button>
                                </Form>

                                <Divider />

                                <div
                                    style={{
                                        background: '#fffbe6',
                                        padding: 12,
                                        borderRadius: 8,
                                        border: '1px solid #ffe58f',
                                    }}
                                >
                                    <Text type="warning">
                                        💡 <strong>Lưu ý:</strong> Sau khi đăng ký, yêu cầu của bạn sẽ ở trạng thái Pending và cần được Admin phê duyệt trước khi xem lịch học.
                                    </Text>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Enrollment;
