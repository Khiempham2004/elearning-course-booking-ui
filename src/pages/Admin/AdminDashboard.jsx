import {
    UserOutlined,
    FileTextOutlined,
    TeamOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    AlertOutlined,
    TrophyOutlined,
    DownloadOutlined
} from '@ant-design/icons';
import {
    Card,
    Col,
    Row,
    Statistic,
    Table,
    Tag,
    Button,
    Progress,
    message,
    Empty,
    Spin
} from 'antd';
import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../service/user.service';
import { getAllEnrollments } from '../../service/enrollment.service';

const AdminDashboard = () => {
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalTeachers: 0,
        totalReports: 0,
        completedDefense: 0,
        pendingDefense: 0,
        failedDefense: 0,
    });
    const [pendingStudents, setPendingStudents] = useState([]);

    // 🔥 Fetch data từ API - Fix: axiosClient tự động add token từ localStorage
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                console.log('🔄 Loading dashboard data...');

                // ✅ FIX: Gọi API đúng cách
                // - axiosClient tự động thêm token từ localStorage (xem axiosClient.js)
                // - Không cần truyền token vào headers
                // - Không gọi getCourse() trong Promise.all (không cần)

                const [usersRes, enrollmentsRes] = await Promise.all([
                    getAllUsers(),
                    getAllEnrollments(),
                ]);

                console.log('✅ Users data:', usersRes);
                console.log('✅ Enrollments data:', enrollmentsRes);

                // 📊 Tính toán thống kê
                // Fix: API trả về users & enrollments, không phải data
                const users = Array.isArray(usersRes?.users)
                    ? usersRes.users
                    : Array.isArray(usersRes?.data)
                        ? usersRes.data
                        : Array.isArray(usersRes?.data?.users)
                            ? usersRes.data.users
                            : [];
                const enrollments = Array.isArray(enrollmentsRes?.enrollments)
                    ? enrollmentsRes.enrollments
                    : Array.isArray(enrollmentsRes?.data)
                        ? enrollmentsRes.data
                        : Array.isArray(enrollmentsRes?.data?.enrollments)
                            ? enrollmentsRes.data.enrollments
                            : [];

                const totalStudents = users.filter(u => u.role?.toLowerCase() === 'user').length;
                const totalTeachers = users.filter(u => u.role?.toLowerCase() === 'teacher').length;
                const totalReports = enrollments.length;

                // 📈 Mock data cho trạng thái (nếu API không cung cấp status field)
                const completedDefense = Math.floor(totalReports * 0.63);
                const pendingDefense = Math.floor(totalReports * 0.22);
                const failedDefense = Math.floor(totalReports * 0.15);

                setStats({
                    totalStudents,
                    totalTeachers,
                    totalReports,
                    completedDefense,
                    pendingDefense,
                    failedDefense,
                });

                // 📋 Xử lý dữ liệu danh sách sinh viên (Top 3)
                const students = enrollments.slice(0, 3).map((enrollment, idx) => {
                    // userId is already populated with user data from API
                    const user = enrollment.userId || {};
                    return {
                        key: idx + 1,
                        studentId: user.studentId || `SV${String(idx + 1).padStart(3, '0')}`,
                        name: user.name || user.fullname || `Sinh viên ${idx + 1}`,
                        title: enrollment.courseId?.title || 'Chưa cập nhật',
                        teacher: enrollment.courseId?.instructor || 'GV',
                        submittedDate: new Date(enrollment.createdAt).toLocaleDateString('vi-VN'),
                        defenseDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN'),
                        status: enrollment.status === 'completed' ? 'Graded' : (enrollment.status === 'approved' ? 'Scheduled' : 'Pending'),
                    };
                });

                setPendingStudents(students);
                message.success('✅ Dữ liệu dashboard tải thành công!');

            } catch (error) {
                console.error('❌ Lỗi fetch API:', error);
                console.error('📍 Chi tiết lỗi:', error.response?.data || error.message);
                message.error(`❌ Lỗi tải dữ liệu: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // 📊 Thống kê báo cáo theo trạng thái
    const reportStats = [
        { status: 'Chưa nộp', count: Math.floor(stats.totalReports * 0.08), percentage: 8 },
        { status: 'Đang chấm', count: Math.floor(stats.totalReports * 0.29), percentage: 29 },
        { status: 'Chờ bảo vệ', count: stats.pendingDefense, percentage: 22 },
        { status: 'Đã bảo vệ', count: stats.completedDefense, percentage: 63 },
        { status: 'Không đạt', count: stats.failedDefense, percentage: 15 },
    ];

    const columns = [
        {
            title: 'MSSV',
            dataIndex: 'studentId',
            key: 'studentId',
            width: 100,
        },
        {
            title: 'Tên sinh viên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tiêu đề đồ án',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Giáo viên hướng dẫn',
            dataIndex: 'teacher',
            key: 'teacher',
        },
        {
            title: 'Ngày nộp',
            dataIndex: 'submittedDate',
            key: 'submittedDate',
        },
        {
            title: 'Ngày bảo vệ',
            dataIndex: 'defenseDate',
            key: 'defenseDate',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = 'default';
                if (status === 'Pending') color = 'orange';
                if (status === 'Scheduled') color = 'blue';
                if (status === 'Graded') color = 'green';
                return <Tag color={color}>{status}</Tag>;
            },
        },
    ];

    return (
        <Spin spinning={loading}>
            <div style={{ padding: 24, background: '#f5f7fa', minHeight: '100vh' }}>

                {/* 🎓 Header */}
                <div style={{ marginBottom: 32 }}>
                    <h1 style={{ margin: 0, color: '#001529', fontSize: 28, fontWeight: 600 }}>
                        🎓 Quản lý Bảo vệ Đồ án Tốt nghiệp
                    </h1>
                    <p style={{ color: '#666', marginTop: 8 }}>
                        Hệ thống quản lý toàn bộ quy trình nộp báo cáo, chấm điểm, và bảo vệ đồ án tốt nghiệp
                    </p>
                </div>

                {/* 📊 Statistics Cards */}
                <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                    <Col xs={24} sm={12} lg={6}>
                        <Card style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                            <Statistic
                                title="👥 Tổng sinh viên"
                                value={stats.totalStudents}
                                prefix={<UserOutlined />}
                                valueStyle={{ color: '#1890ff', fontSize: 24 }}
                            />
                        </Card>
                    </Col>

                    <Col xs={24} sm={12} lg={6}>
                        <Card style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                            <Statistic
                                title="📚 Tổng giáo viên"
                                value={stats.totalTeachers}
                                prefix={<TeamOutlined />}
                                valueStyle={{ color: '#52c41a', fontSize: 24 }}
                            />
                        </Card>
                    </Col>

                    <Col xs={24} sm={12} lg={6}>
                        <Card style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                            <Statistic
                                title="📄 Tổng báo cáo"
                                value={stats.totalReports}
                                prefix={<FileTextOutlined />}
                                valueStyle={{ color: '#faad14', fontSize: 24 }}
                            />
                        </Card>
                    </Col>

                    <Col xs={24} sm={12} lg={6}>
                        <Card style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                            <Statistic
                                title="✅ Đã bảo vệ"
                                value={stats.completedDefense}
                                suffix={`/${stats.totalReports}`}
                                prefix={<CheckCircleOutlined />}
                                valueStyle={{ color: '#722ed1', fontSize: 24 }}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* 📈 Tiến độ & Thống kê */}
                <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                    <Col xs={24} lg={12}>
                        <Card
                            title="📊 Phân bố báo cáo theo trạng thái"
                            style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {reportStats.map((item, idx) => (
                                    <div key={idx}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                            <span style={{ fontWeight: 500 }}>{item.status}</span>
                                            <span style={{ color: '#999' }}>
                                                {item.count} ({item.percentage}%)
                                            </span>
                                        </div>
                                        <Progress
                                            percent={item.percentage}
                                            strokeColor={{
                                                '0%': '#108ee9',
                                                '100%': '#87d068',
                                            }}
                                            size="small"
                                        />
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} lg={12}>
                        <Card
                            title="⏰ Thống kê nhanh"
                            style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                        >
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <div style={{
                                        padding: 16,
                                        background: '#fff7e6',
                                        borderRadius: 8,
                                        textAlign: 'center'
                                    }}>
                                        <ClockCircleOutlined style={{ fontSize: 24, color: '#faad14' }} />
                                        <p style={{ margin: '8px 0 0 0', color: '#666' }}>Chờ bảo vệ</p>
                                        <h3 style={{ margin: 0, color: '#faad14' }}>{stats.pendingDefense}</h3>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div style={{
                                        padding: 16,
                                        background: '#f6ffed',
                                        borderRadius: 8,
                                        textAlign: 'center'
                                    }}>
                                        <CheckCircleOutlined style={{ fontSize: 24, color: '#52c41a' }} />
                                        <p style={{ margin: '8px 0 0 0', color: '#666' }}>Đã bảo vệ</p>
                                        <h3 style={{ margin: 0, color: '#52c41a' }}>{stats.completedDefense}</h3>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div style={{
                                        padding: 16,
                                        background: '#fff1f0',
                                        borderRadius: 8,
                                        textAlign: 'center'
                                    }}>
                                        <AlertOutlined style={{ fontSize: 24, color: '#ff4d4f' }} />
                                        <p style={{ margin: '8px 0 0 0', color: '#666' }}>Không đạt</p>
                                        <h3 style={{ margin: 0, color: '#ff4d4f' }}>{stats.failedDefense}</h3>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div style={{
                                        padding: 16,
                                        background: '#f0f5ff',
                                        borderRadius: 8,
                                        textAlign: 'center'
                                    }}>
                                        <TrophyOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                                        <p style={{ margin: '8px 0 0 0', color: '#666' }}>Tỉ lệ</p>
                                        <h3 style={{ margin: 0, color: '#1890ff' }}>
                                            {stats.totalReports > 0 ? Math.round((stats.completedDefense / stats.totalReports) * 100) : 0}%
                                        </h3>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                {/* 📋 Danh sách chờ bảo vệ */}
                <Card
                    title="📋 Danh sách sinh viên chờ bảo vệ (Top 3)"
                    style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                >
                    {pendingStudents.length > 0 ? (
                        <Table
                            columns={columns}
                            dataSource={pendingStudents}
                            pagination={false}
                            size="small"
                        />
                    ) : (
                        <Empty description="Không có dữ liệu" />
                    )}
                </Card>

                {/* ℹ️ Hướng dẫn */}
                {/* <Card
                    title="ℹ️ Hướng dẫn sử dụng"
                    style={{ marginTop: 24, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', background: '#fafafa' }}
                >
                    <div style={{ lineHeight: 1.8, color: '#666' }}>
                        <p><strong>📌 Bảo vệ đồ án tốt nghiệp là gì?</strong></p>
                        <p>
                            Bảo vệ đồ án là một phần của quá trình hoàn thành khóa học đại học.
                            Sinh viên phải nộp báo cáo chi tiết về dự án/nghiên cứu của mình,
                            sau đó sẽ được giáo viên hướng dẫn và một hội đồng chấm điểm đánh giá.
                        </p>

                        <p><strong>🔄 Quy trình hoạt động:</strong></p>
                        <ol>
                            <li><strong>Nộp báo cáo:</strong> SV nộp file báo cáo qua hệ thống</li>
                            <li><strong>Chấm điểm:</strong> Giáo viên hướng dẫn chấm và cho feedback</li>
                            <li><strong>Lên lịch bảo vệ:</strong> Admin lên lịch bảo vệ công khai</li>
                            <li><strong>Bảo vệ trước hội đồng:</strong> SV trình bày trước hội đồng</li>
                            <li><strong>Kết quả:</strong> Hội đồng cho điểm cuối cùng</li>
                        </ol>

                        <p><strong>🎯 Vai trò trong hệ thống:</strong></p>
                        <ul>
                            <li><strong>Admin:</strong> Quản lý toàn bộ quy trình, lên lịch, phê duyệt</li>
                            <li><strong>Giáo viên:</strong> Chấm điểm, feedback, dự hội đồng</li>
                            <li><strong>Sinh viên:</strong> Nộp báo cáo, bảo vệ</li>
                        </ul>
                    </div>
                </Card> */}
            </div>
        </Spin>
    );
};

export default AdminDashboard;
