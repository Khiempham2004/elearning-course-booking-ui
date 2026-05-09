export const getUser = () => {
    return JSON.parse(localStorage.getItem("user")) || null;
};

export const getToken = () => {
    return localStorage.getItem("token") || null;
};

export const logout = (navigate) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/signin");
}

export const isAuthenticated = () => {
    const token = getToken();
    return !!token;
}