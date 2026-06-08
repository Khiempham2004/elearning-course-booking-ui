import axiosClient from "../utils/axiosClient.js";

export const getCourse = () => {
    return axiosClient.get('/courses')
};

// lay chi tiet 1 course
export const getCourseById = (id) => {
    return axiosClient.get(`/courses/${id}`)
};

export const createCourse = (data, token) => {
    return axiosClient.post('/courses', data, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
            }
    })
};

export const updateCourse = (id, data, token) => {
    return axiosClient.put(`/courses/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    })
};

export const deleteCourse = (id, token) => {
    return axiosClient.delete(`/courses/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
};

// Lấy danh sách courses do user tạo
export const getMyCreatedCourses = (token) => {
    return axiosClient.get('/courses/my-courses', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
};