import { getToken } from "../utils/Auth.js";

export const fetchData = () => {
    const token = getToken();

    return fetch("http://localhost:3000/api/user/admin/dashboard", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}