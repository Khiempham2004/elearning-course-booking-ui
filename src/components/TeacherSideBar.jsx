import { Layout, Menu } from 'antd';
import {
    DashboardOutlined,
    FileTextOutlined,
    CheckCircleOutlined,
    TeamOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { NavLink } from 'react-router-dom';
const { Sider } = Layout;

const TeacherSideBar = () => {
    return (
        <Sider width={220} theme="dark" style={{ background: '#001529' }}>
            <div style={{ color: "white", textAlign: "center", padding: 20 }}>
                <h2 style={{ margin: '0 0 5px 0', fontSize: 18 }}>🎓 Teacher</h2>
                <p style={{ margin: 0, fontSize: 12, opacity: 0.8 }}>Defense System</p>
            </div>

            <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']}>
                <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                    <NavLink to="/teacher">Dashboard</NavLink>
                </Menu.Item>

                <Menu.Item key="reports" icon={<FileTextOutlined />}>
                    <NavLink to="/teacher/reports">Báo cáo đồ án</NavLink>
                </Menu.Item>

                <Menu.Item key="grading" icon={<CheckCircleOutlined />}>
                    <NavLink to="/teacher/grading">Chấm điểm & Feedback</NavLink>
                </Menu.Item>

                <Menu.Item key="students" icon={<TeamOutlined />}>
                    <NavLink to="/teacher/students">Danh sách SV</NavLink>
                </Menu.Item>

                <Menu.Item key="settings" icon={<SettingOutlined />}>
                    <NavLink to="/teacher/settings">Cài đặt</NavLink>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default TeacherSideBar;
