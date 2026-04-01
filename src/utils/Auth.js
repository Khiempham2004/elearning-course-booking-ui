export const getUsers = () => {
    return JSON.parse(localStorage.getItem("user")) || [];
}

export const getToken = () => {
    return localStorage.getItem("token") || null;
}
export const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
}

export const isAuthenticated = () => {
    const token = getToken();
    return !!token;
}