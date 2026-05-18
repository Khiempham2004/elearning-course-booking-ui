import axiosClient from "../utils/axiosClient";

// lay tat ca lich hoc
export const getSchedule = () => {
    return axiosClient.get("/schedules")
};

// lay chi tiet lich hoc
export const getAllSchedule = (id, data) => {
    return axiosClient.get(`/schedules/${id}`, data)
};

export const createSchedule = () => {
    return axiosClient.post('/schedules')
};

export const updateSchedule = (id, data) => {
    return axiosClient.put(`/schedules/${id}`, data)
};

export const deleteSchedule = (id, data) => {
    return axiosClient.delete(`/schedules/${id}`, data)
};