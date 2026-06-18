export const getUser = () => {
    return JSON.parse(localStorage.getItem("user")) || null;
};

export const getToken = () => {
    return localStorage.getItem("token") || "";
};

export const getUserId = () => {
    const user = getUser();
    return user?._id || null;
};

// console.log(localStorage.getItem("token"));

export const logout = (navigate) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
}

export const isAuthenticated = () => {
    const token = getToken();
    return !!token;
}