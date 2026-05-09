import { getToken, logout } from '../utils/Auth';
import React from 'react';

const HeaderBar = () => {
    const user = getToken();

    return (
        <div>
            <span style={{ marginLeft: 20, fontSize: 18, fontWeight: 500 }}>
                {user?.name}
            </span>
            <button onClick={logout}>
                Logout
            </button>
        </div>
    );
}

export default HeaderBar;
