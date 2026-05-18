import { getToken } from "../utils/Auth.js";
import axiosClient from '../utils/axiosClient.js'

export const fetchData = () => {
    const token = getToken();

    return fetch("http://localhost:3000/api/user/admin/dashboard", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const getUserProfile = () => {
    return axiosClient.get('/users/profile')
}

export const getAllUsers = (token) => {
    return axiosClient.get('/users', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateUser = (id, data) => {
    return axiosClient.put(`/users/${id}`, data)
}

export const deleteUser = (id, token) => {
    return axiosClient.delete(`/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
