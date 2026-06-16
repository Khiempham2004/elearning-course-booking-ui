import axiosClient from "../utils/axiosClient";

// lay tat ca lich hoc
export const getAllSchedule = (schedules) => {
    return axiosClient.get("/schedules", schedules)
};

// lay chi tiet lich hoc
export const getScheduleDetail = (id, data) => {
    return axiosClient.get(`/schedules/${id}`, data)
};

export const getMySchedule = (token) => {
    return axiosClient.get("/schedules/my-schedules", {
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
}
export const updateMySchedule = (id, data) => {
    return axiosClient.patch(`/schedules/${id}`, data);
}
export const createSchedule = (schedules) => {
    return axiosClient.post('/schedules', schedules)
};

export const updateSchedule = (id, data) => {
    return axiosClient.patch(`/schedules/${id}`, data)
};

export const deleteSchedule = (id, data) => {
    return axiosClient.delete(`/schedules/${id}`, data)
};