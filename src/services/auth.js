import api from "./api";

const login = async (email, password) => api.post("api/users/login", { email, password });

const logout = async () => api.get("api/users/logout");

const sendResetPassword = async (email) => {
    return api.post("/users/sendResetPassword", {email});
}

const resetPassword = async (password, token) => {
    return api.post("/users/resetPassword", {password, token});
}

export { login, logout, sendResetPassword, resetPassword };
export default { login, logout, sendResetPassword, resetPassword};
