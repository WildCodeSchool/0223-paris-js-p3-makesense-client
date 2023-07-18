import api from "./api";

const getAllUsers = () => {
    return api.get("/api/users");
}

const getCurrentUser = () => {
    return api.get("/api/users/me");
} 

const editUser = (data) => {
    return api.put("/api/users/", data);
}

const createAccount = (data) => {
  return api.post("/api/users/register", data);
}

const deleteUtilisateur = (id) => {
  return api.delete(`/api/users/${id}`)
}

const getUser = (id)  => {
  return api.get(`/api/users/${id}`)
}

const modifyAccount = (data, id) => {
  return api.put(`/api/users/${id}`, data)
}

export { getAllUsers, getCurrentUser, createAccount, editUser, deleteUtilisateur, getUser, modifyAccount};
