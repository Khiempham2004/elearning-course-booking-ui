import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

const { Title, Text } = Typography;

const UserCourse = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCourse = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem('token');

            const res = await axios.get(
                'http://localhost:3000/api/courses',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('API:', res.data.courses);

            // FIX
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
            title: 'Image',
            dataIndex: 'image',
            key: 'image',

            render: (image) => (
                <Image
                    src={`http://localhost:3000/${image}`}
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
            title: 'Description',
            dataIndex: 'description',
            key: 'description',

            render: (description) => (
                <Text type="secondary">
                    {description || 'Không có mô tả'}
                </Text>
            ),
        },

        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',

            render: (price) => (
                <Text strong style={{ color: '#1677ff' }}>
                    {price
                        ? `${price.toLocaleString()} VND`
                        : 'Free'}
                </Text>
            ),
        },

        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',

            render: (status) => (
                <Tag color={status === 'active' ? 'green' : 'orange'}>
                    {status || 'Unknown'}
                </Tag>
            ),
        },
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