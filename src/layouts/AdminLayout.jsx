import { Sidebar } from 'lucide-react';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex-1'>
                <h1>Admin Layout</h1>
                <Outlet />
            </div>
        </div>
    );
}

export default AdminLayout;
