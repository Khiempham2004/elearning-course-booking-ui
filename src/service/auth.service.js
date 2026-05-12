import axiosClient from "../utils/axiosClient.js";

export const login = (data) => {
    return axiosClient.post('/users/login', data);
};

export const register = (data) => {
    return axiosClient.post('/users/register', data);
}

