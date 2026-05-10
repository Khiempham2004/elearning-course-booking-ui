import React, { useEffect, useState } from 'react';

import {
    Table,
    Tag,
    Image,
    Empty,
    Spin,
    message,
    Card,
    Typography,
} from 'antd';
import { getMyCourses } from '../../service/user.service';

const { Title, Text } = Typography;
const imageModules = import.meta.glob("../../assets/Images/*.{png,jpg,jpeg,webp}", { eager: true });

const getLocalImage = (courseImage) => {
    if (!courseImage) return "";
    const filename = courseImage.split("/").pop();
    const key = Object.keys(imageModules).find((k) => k.includes(filename));
    return key ? imageModules[key].default : "";
};

const UserCourse = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCourse = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem('token');
            console.log(token);


            const res = await getMyCourses(token);

            console.log('API:', res.data.courses);

            setCourses(res.data.courses || []);

        } catch (error) {
            console.log(error);
            message.error('Không thể lấy danh sách khóa học!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourse();
    }, []);

    const columns = [
        {
            title: 'Course Image',
            dataIndex: 'courseImage',
            key: 'courseImage',

            render: (courseImage) => (
                <Image
                    src={getLocalImage(courseImage)}
                    width={100}
                    height={60}
                    style={{
                        objectFit: 'cover',
                        borderRadius: 8,
                    }}
                />
            ),
        },

        {
            title: 'Course Name',
            dataIndex: 'title',
            key: 'title',

            render: (title) => (
                <Text strong>{title}</Text>
            ),
        },

        {
            title: 'lessons',
            dataIndex: 'lessons',
            key: 'lessons',

            render: (lessons) => (
                <Text type="secondary">
                    {lessons || 'Không có mô tả'}
                </Text>
            ),
        },

        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',

            render: (price) => (
                <Text strong style={{ color: '#1677ff' }}>
                    ${price}
                </Text>
            ),
        },

        {
            title: 'level',
            dataIndex: 'level',
            key: 'level',

            render: (level) => (
                <Tag color="blue">
                    {level}
                </Tag>
            ),
        },
        {
            title: 'rating',
            dataIndex: 'rating',
            key: 'rating',

            render: (rating) => (
                <Tag color="gold">
                    ⭐ {rating}
                </Tag>
            ),
        },
        {
            title: 'reviews',
            dataIndex: 'reviews',
            key: 'reviews',
        },
        {
            title: 'Instructor',
            dataIndex: 'instructor',
            key: 'instructor',
            render: (_, record) => (
                <div style={{ display: 'flex', alignItems: "center" }}>
                    <Image
                        src={getLocalImage(record.instructorImage)}
                        width={40}
                        height={40}
                        style={{
                            borderRadius: '50%',
                            objectFit: 'cover',
                            marginRight: 10,
                        }}
                    />
                    <Text>{record.instructor}</Text>
                </div>
            )
        },

        {
            title: "Catagory",
            dataIndex: 'catagory',
            key: 'catagory',
            render: (catagory) => (
                <Tag color='purple'>
                    {catagory}
                </Tag>
            )
        }
    ];

    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: 100 }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!courses || courses.length === 0) {
        return (
            <div style={{ marginTop: 100 }}>
                <Empty description="Bạn chưa có khóa học nào!" />
            </div>
        );
    }

    return (
        <div
            style={{
                padding: 24,
                background: '#f5f7fa',
                minHeight: '100vh',
            }}
        >
            <Card
                style={{
                    borderRadius: 16,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                }}
            >
                <Title level={3}>
                    📚 My Courses
                </Title>

                <Table
                    columns={columns}
                    dataSource={courses}
                    rowKey="_id"
                    pagination={{ pageSize: 5 }}
                />
            </Card>
        </div>
    );
};

export default UserCourse;