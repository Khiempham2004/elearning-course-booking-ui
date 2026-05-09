import { Layout, Button, Tabs } from 'antd';
import React, { Children } from 'react';
import { logout } from '../../utils/Auth.js';
import { useNavigate } from 'react-router-dom';
// import ProfileTab from './settings/ProfileTab.jsx';
// import PasswordTab from './settings/PasswordTab.jsx';
// import NotificationTab from './settings/NotificationTab.jsx';

const UserSettings = () => {

    const items = [
        {
            key: '1',
            label: 'Change Password',
            // children: <ProfileTab />
        },
        {
            key: '2',
            label: 'Update Email',
            // children: <PasswordTab />
        },
        {
            key: '3',
            label: 'Notification Preferences',
            // children: <NotificationTab />
        }
    ];

    const navigate = useNavigate();

    const handleLogout = () => {
        logout(navigate);
    };

    return (
        <div>
            <h2>User Settings</h2>
            {/* <Tabs defaultActiveKey="1" items={items} /> */}
            <Layout style={{ padding: '24px', background: '#fff' }}>
                <p>Manage your account settings, including changing your password, updating your email address, and configuring notification preferences.</p>
                <Tabs defaultActiveKey="1" items={items} />
                <Button type='primary' danger style={{ width: '150px', marginTop: '20px' }} onClick={handleLogout}>
                    Logout
                </Button>
            </Layout>
        </div>
    );
}

export default UserSettings;
