import axiosClient from "../utils/axiosClient.js";

export const getCourse = (data) => {
    return axiosClient.get('/courses/' , data)
}

