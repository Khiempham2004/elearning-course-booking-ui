import React, { useEffect, useState } from 'react';
import { Button, Card, Col, message, Row, Spin, Tag, Typography, Rate, Avatar, Space } from 'antd';
import { createEnrollment } from '../../service/enrollment.service';
import { getCourseById } from '../../service/course.service';
import { useNavigate, useParams } from 'react-router-dom';
import { BookOutlined, DollarOutlined, UserOutlined, StarFilled, TagOutlined } from '@ant-design/icons';
import { getToken } from '../../utils/Auth';
const { Title, Paragraph, Text } = Typography;

const imageModules = import.meta.glob(
    "../../assets/Images/*",
    { eager: true }
);

const getLocalImage = (courseImage) => {
    if (!courseImage) return "";

    // ảnh upload từ server
    if (courseImage.startsWith("/uploads")) {
        return `http://localhost:3000${courseImage}`;
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
        return `http://localhost:3000${imagePath}`;
    };
    return getLocalImage(imagePath);
}

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState({});
    const [loading, setLoading] = useState(false);
    const [enrollLoading, setEnrollLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getCourseDetail = async () => {
            try {
                setLoading(true);

                const res = await getCourseById(id)

                setCourse(res.data.data);
                message.success("Lấy course chi tiết thành công")
            } catch (error) {
                console.log(error);
                message.error("Lấy chi tiết course thất bại")
            } finally {
                setLoading(false);
            }
        };
        getCourseDetail();
    }, [id]);


    const handleEnroll = async () => {
        try {
            setEnrollLoading(true);

            const token = getToken()
            if (!token) {
                message.warning("Vui lòng đăng nhập");
                navigate('/signin');
                return;
            }

            await createEnrollment(id, token);

            message.success("Đăng ký khóa học thành công");
            navigate('/users/my-course');
        } catch (error) {
            console.log(error);
            if (error.response?.data?.message === "Token không hợp lệ") {
                localStorage.removeItem("token");
                navigate("/signin");
                return;
            }
            message.error(
                error.response?.data?.message || "Đăng ký thất bại"
            );
        } finally {
            setEnrollLoading(false)
        }
    };

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 100,
                }}
            >
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div>
            <div
                style={{
                    padding: "60px 0",
                    background: "linear-gradient(135deg,#f0f7ff 0%,#ffffff 50%,#f5f7fa 100%)",
                    minHeight: "100vh",
                }}
            >
                <Row justify="center" style={{ marginTop: 50 }}>
                    <Col xs={24} md={20} lg={16}>
                        <Card
                            bordered={false}
                            style={{
                                borderRadius: 20,
                                overflow: "hidden",
                                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                            }}
                        >
                            <Row gutter={[40, 20]} align="middle">
                                {/* Image */}
                                <Col xs={24} md={10}>
                                    <img
                                        src={getImageUrl(course.courseImage)}
                                        alt={course.title}
                                        // style={{
                                        //     width: "100%",
                                        //     height: 350,
                                        //     objectFit: "cover",
                                        //     borderRadius: 20,
                                        //     transition: "0.3s"
                                        // }}
                                        className='w-full h-87.5 object-cover rounded-2xl transition-all duration-300 hover:scale-105'
                                    />
                                </Col>

                                <Col xs={24} md={14}>
                                    <Title level={2}>
                                        {course.title}
                                    </Title>

                                    <Paragraph
                                        style={{
                                            fontSize: 16,
                                            color: "#666",
                                        }}
                                    >
                                        {course.description}
                                    </Paragraph>

                                    <div style={{ marginBottom: 16 }}>
                                        <Tag color="blue">
                                            {course.level}
                                        </Tag>

                                        <Tag color="purple">
                                            {course.catagory}
                                        </Tag>
                                    </div>

                                    <Card
                                        size="small"
                                        style={{
                                            borderRadius: 12,
                                            marginTop: 20,
                                        }}
                                    >
                                        <Space>
                                            <Avatar
                                                size={60}
                                                src={getImageUrl(course.instructorImage)}
                                            />

                                            <div>
                                                <Title level={5} style={{ margin: 0 }}>
                                                    {course.instructor}
                                                </Title>

                                                <Text type="secondary">
                                                    Instructor
                                                </Text>
                                            </div>
                                        </Space>
                                    </Card>

                                    <Paragraph>
                                        <StarFilled
                                            style={{
                                                color: "#faad14",
                                                marginRight: 8,
                                            }}
                                        />

                                        <Text strong>
                                            {course.rating}
                                        </Text>

                                        <Text type="secondary">
                                            {" "}
                                            ({course.reviews} reviews)
                                        </Text>
                                    </Paragraph>

                                    <Paragraph>
                                        <BookOutlined />{" "}
                                        <Text strong>
                                            Lessons:
                                        </Text>{" "}
                                        {course.lessons}
                                    </Paragraph>

                                    <Paragraph>
                                        <TagOutlined />{" "}
                                        <Text strong>
                                            Category:
                                        </Text>{" "}
                                        {course.catagory}
                                    </Paragraph>

                                    <Paragraph>
                                        <DollarOutlined />{" "}
                                        <Text strong>
                                            Price:
                                        </Text>{" "}
                                        <span
                                            style={{
                                                color: "#1677ff",
                                                fontSize: 20,
                                                fontWeight: 700,
                                            }}
                                        >
                                            ${course.price}
                                        </span>
                                    </Paragraph>

                                    {/* Button */}
                                    <Button
                                        type="primary"
                                        size="large"
                                        loading={enrollLoading}
                                        onClick={handleEnroll}
                                        style={{
                                            marginTop: 20,
                                            height: 50,
                                            minWidth: 180,
                                            borderRadius: 14,
                                            fontWeight: 600,
                                            boxShadow: "0 10px 20px rgba(24,144,255,0.25)"
                                        }}
                                    >
                                        {course.enrollLink || "Enroll Now"}
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default CourseDetail;