import axiosClient from "../utils/axiosClient"

export const getMyCourses = (token) => {
    return axiosClient.get('/enrollments/my-courses',
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
};

export const createEnrollment = (courseId, token) => {
    return axiosClient.post('/enrollments', { courseId },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
};

export const getAllEnroll = () => {
    return axiosClient.get('/enrollments')
};

export const deleteEnroll = (id, token) => {
    return axiosClient.delete(`/enrollments/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};