import React, { useEffect, useState } from 'react';
import { Button, Card, Col, message, Row, Spin, Tag, Typography } from 'antd';
import { createEnrollment } from '../../service/enrollment.service';
import { getCourseById } from '../../service/course.service';
import { useNavigate, useParams } from 'react-router-dom';
import { BookOutlined, DollarOutlined, UserOutlined } from '@ant-design/icons';
import { getToken } from '../../utils/Auth'
const { Title, Paragraph, Text } = Typography;

const imageModules = import.meta.glob(
    "../../assets/Images/*",
    { eager: true }
);

const getLocalImage = (courseImage) => {
    if (!courseImage) return null;
    const filename = courseImage.split("/").pop();

    const key = Object.keys(imageModules).find((k) => k.includes(filename));

    return key ? imageModules[key].default : null;
};

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
                console.log(res.data);

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
            console.log(token);

            if (!token) {
                navigate('/signin');
                message.error("Vui lòng đăng nhập");
                return;
            }

            const res = await createEnrollment(id, token);

            console.log(res.data);

            message.success("Đăng ký khóa học thành công");
            navigate('/users/my-courses')
        } catch (error) {
            console.log(error);
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
                    padding: "160px",
                    background: "#f5f5f5",
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
                                boxShadow:
                                    "0 4px 20px rgba(0,0,0,0.1)",
                            }}
                        >
                            <Row gutter={[40, 20]}>
                                <Col xs={24} md={10}>
                                    <img
                                        src={getLocalImage(course.courseImage) || course.courseImage}
                                        alt="course"
                                        style={{
                                            width: "100%",
                                            borderRadius: 16,
                                            objectFit: "cover",
                                        }}
                                    />
                                </Col>

                                <Col xs={24} md={14}>

                                    <Title level={2}>
                                        {course.title}
                                    </Title>

                                    <Paragraph
                                        style={{
                                            fontSize: 16,
                                            color: "#555",
                                        }}
                                    >
                                        {course.description}
                                    </Paragraph>

                                    <div
                                        style={{
                                            marginBottom: 15,
                                        }}
                                    >
                                        <Tag color="blue">
                                            {course.level}
                                        </Tag>
                                    </div>

                                    <Paragraph>
                                        <UserOutlined />{" "}
                                        <Text strong>
                                            Instructor:
                                        </Text>{" "}
                                        {course.instructor}
                                    </Paragraph>

                                    <Paragraph>
                                        <BookOutlined />{" "}
                                        <Text strong>
                                            Lessons:
                                        </Text>{" "}
                                        {course.lessons}
                                    </Paragraph>

                                    <Paragraph>
                                        <DollarOutlined />{" "}
                                        <Text strong>
                                            Price:
                                        </Text>{" "}
                                        ${course.price}
                                    </Paragraph>

                                    <Button
                                        type="primary"
                                        size="large"
                                        loading={enrollLoading}
                                        onClick={handleEnroll}
                                        style={{
                                            marginTop: 20,
                                            height: 45,
                                            paddingInline: 40,
                                            borderRadius: 10,
                                        }}
                                    >
                                        Enroll Now
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