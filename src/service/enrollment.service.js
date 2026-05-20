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

export const getAllEnrollments = (token) => {
    return axiosClient.get('/enrollments', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const deleteEnrollments = (id, token) => {
    return axiosClient.delete(`/enrollments/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
// duyệt dky course
export const approveEnrollment = (id, token, notes = '') => {
    return axiosClient.patch(`/enrollments/${id}/approve`, { notes }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

// từ chối enrollment
export const rejectEnrollment = (id, token, rejectionReason, notes = '') => {
    return axiosClient.patch(`/enrollments/${id}/reject`, 
        { rejectionReason, notes }, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};
// cập nhật trạng thái enrollment tổng quát
export const updateEnrollmentStatus = (id, token, status, notes = '') => {
    return axiosClient.patch(`/enrollments/${id}/status`, 
        { status, notes }, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};
// Lấy list course mà user đã đky
export const getEnrollmentByUser = (userId, token) => {
    return axiosClient.get(`/enrollments/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

// Lấy danh sách user đã đky 1 course
export const getEnrollmentByCourse = (courseId, token) => {
    return axiosClient.get(`/enrollments/course/${courseId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};