import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import { getUserProfile } from '../../service/user.service';
// import { getCourse } from '../../service/course.service';
import './User.css'
const UserProfile = () => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getUserProfile();
                setUsers(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProfile();
    }, []);

    if (!users) {
        return <Spin />;
    };

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">User Profile</h1>

            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {users?.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <div className="profile-name">{users?.name}</div>
                        <div className="profile-role">{users?.role}</div>
                    </div>
                </div>

                <div className="profile-info">
                    <p><strong>Name:</strong>{users?.name}</p>
                    <p><strong>Email:</strong> {users?.email}</p>
                    <p><strong>Role:</strong> {users?.role}</p>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
