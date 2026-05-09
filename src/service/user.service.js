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

export const getMyCourses = () => {
    return axiosClient.get('/courses/my-course')
}