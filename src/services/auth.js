import api from "./api";

const login = async (email, password) => api.post("/users/login", { email, password });

const logout = async () => api.get("/users/logout");

export { login, logout };
export default { login, logout };
