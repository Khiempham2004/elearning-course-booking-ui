import axiosClient from "../utils/axiosClient.js";

export const login = (data) => {
    return axiosClient.post('/user/login', data);
};

export const register = (data) => {
    return axiosClient.post('/user/register', data);
}