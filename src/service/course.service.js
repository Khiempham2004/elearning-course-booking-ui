import axiosClient from "../utils/axiosClient.js";

export const getCourse = () => {
    return axiosClient.get('/courses')
};

// lay chi tiet 1 course
export const getCourseById = (id) => {
    return axiosClient.get(`/courses/${id}`)
};

export const createCourse = (data) => {
    return axiosClient.post('/courses', data)
};

export const updateCourse = (id, data) => {
    return axiosClient.put(`/courses/${id}`, data)
};

export const deleteCourse = (id) => {
    return axiosClient.delete(`/courses/${id}`)
};