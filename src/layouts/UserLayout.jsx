import { Layout, Menu } from 'antd';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const { Sider, Header, Content } = Layout;

const UserLayout = () => {

    return (
        <div style={{ background: "#f0f0f0", minHeight: "100vh" }}>
            <Layout style={{ minHeight: "100vh", background: "transparent" }}>
                <Sider width={220} theme="dark">
                    <h2 style={{ textAlign: 'center', padding: 20, fontSize: 30, color: '#fff' }}>User</h2>

                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
                        <Menu.Item key="1">
                            <NavLink to='/users'>
                                Home
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <NavLink to='/users/profile'>
                                Profile
                            </NavLink>
                        </Menu.Item>

                        <Menu.Item key="3">
                            <NavLink to='/users/my-courses'>
                                My Courses
                            </NavLink>
                        </Menu.Item>

                        <Menu.Item key="4">
                            <NavLink to='/users/settings'>
                                Settings
                            </NavLink>
                        </Menu.Item>
                    </Menu>
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
