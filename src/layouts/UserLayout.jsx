import { Layout, Menu } from 'antd';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const { Sider, Header, Content } = Layout;

const UserLayout = () => {

    const menuItems = [
        {
            key: '1',
            label: (
                <NavLink to='/users'>
                    Home
                </NavLink>
            )
        },
        {
            key: '2',
            label: (
                <NavLink to='/users/profile'>
                    Profile
                </NavLink>
            )
        },
        {
            key: '3',
            label: (
                <NavLink to='/users/my-course'>
                    My Courses
                </NavLink>
            )
        },
        {
            key: '4',
            label: (
                <NavLink to='/users/enrollment-status'>
                    Enrollment
                </NavLink>
            )
        },
        {
            key: '5',
            label: (
                <NavLink to='/users/my-schedule'>
                    My Schedule
                </NavLink>
            )
        },
        {
            key: '6',
            label: (
                <NavLink to='/users/settings'>
                    Settings
                </NavLink>
            )
        },
    ]

    return (
        <div style={{ background: "#f0f0f0", minHeight: "100vh" }}>
            <Layout style={{ minHeight: "100vh", background: "transparent" }}>
                <Sider width={220} theme="dark">
                    <h2 style={{ textAlign: 'center', padding: 20, fontSize: 30, color: '#fff' }}>User</h2>
                    <Menu
                        theme='dark'
                        mode='inline'
                        defaultSelectedKeys={['1']}
                        items={menuItems}
                    />
                </Sider>

                <Layout>
                    <Header style={{ background: '#fff' }}>
                        <h2 style={{ fontWeight: 'bold', fontSize: 30 }}>User Dashboard</h2>
                    </Header>

                    <Content style={{ padding: 24, background: '#fff', margin: 24, minHeight: 280 }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default UserLayout;
