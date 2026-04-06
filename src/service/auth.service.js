import axiosClient from "../utils/axiosClient.js";

export const login = (data) => {
    return axiosClient.post('http://localhost:3000/api/user/login', data);
};

export const register = (data) => {
    return axiosClient.post('http://localhost:3000/api/user/register', data);
}