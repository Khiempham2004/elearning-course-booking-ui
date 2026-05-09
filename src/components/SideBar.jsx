import { Layout, Menu } from 'antd';
import {
    DashboardOutlined,
    BookOutlined,
    UserOutlined,
    TeamOutlined,
    CalendarOutlined,
} from "@ant-design/icons";
import { NavLink } from 'react-router-dom';
const { Sider } = Layout;



const SideBar = () => {

    return (
        <Sider width={220} theme="dark">
            <h2 style={{ color: "white", textAlign: "center", padding: 20 }}>
                Admin
            </h2>

            <Menu theme="dark" mode="inline">
                <Menu.Item icon={<DashboardOutlined />}>
                    <NavLink to="/admin">Dashboard</NavLink>
                </Menu.Item>

                <Menu.Item icon={<BookOutlined />}>
                    <NavLink to="/admin/course">Course</NavLink>
                </Menu.Item>

                <Menu.Item icon={<UserOutlined />}>
                    <NavLink to="/admin/user">User</NavLink>
                </Menu.Item>

                <Menu.Item icon={<TeamOutlined />}>
                    <NavLink to="/admin/enrollment">Enrollment</NavLink>
                </Menu.Item>

                <Menu.Item icon={<CalendarOutlined />}>
                    <NavLink to="/admin/schedule">Schedule</NavLink>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default SideBar;
