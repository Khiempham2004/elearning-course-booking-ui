import axiosClient from '../utils/axiosClient.js'

export const getAdminDashboard = () => {
    return axiosClient.get("/users/admin/dashboard");
}

export const getUserDashboard = () => {
    return axiosClient.get("/users/user/dashboard");
}

export const getTeacherDashboard = () => {
    return axiosClient.get("/users/teacher/dashboard");
}

export const getUserProfile = () => {
    return axiosClient.get('/users/profile');
}

export const getAllUsers = () => {
    return axiosClient.get('/users');
}

export const updateUser = (id, data) => {
    return axiosClient.put(`/users/${id}`, data);
}

export const deleteUser = (id, token) => {
    return axiosClient.delete(`/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
