import api from "./api";

const login = async (email, password) => api.post("api/users/login", { email, password });

const logout = async () => api.get("api/users/logout");

export { login, logout };
export default { login, logout };
