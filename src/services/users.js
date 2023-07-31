import api from "./api";

const getAllUsers = () => api.get("/api/users");

const getAllCountUser = () => api.get("/api/users/count");

const getCurrentUser = () => api.get("/api/users/me");

const editUser = (data) => api.put("/api/users/", data);

const createAccount = (data) => api.post("/api/users/register", data);

const deleteUtilisateur = (id) => api.delete(`/api/users/${id}`);

const getUser = (id) => api.get(`/api/users/${id}`);

const modifyAccount = (data, id) => api.put(`/api/users/${id}`, data);

const modifyAccountAdmin = (data, id) => api.put(`/api/users/admin/${id}`, data);

export {
  getAllUsers,
  getAllCountUser,
  getCurrentUser,
  createAccount,
  editUser,
  deleteUtilisateur,
  getUser,
  modifyAccount,
  modifyAccountAdmin,
};
