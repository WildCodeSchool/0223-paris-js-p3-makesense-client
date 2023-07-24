import api from "./api";

const getAllRoles = async () => {
  return api.get("/api/roles");
};

const createRole = async (data) => {
  return api.post("/api/roles", data)
}

const deleteRole = async (id) => {
  return api.delete(`/api/roles/${id}`)
}

const editRole = async (id, data) => {
  return api.put(`/api/roles/${id}`, data)
}

const getRole = async (id) => {
  return api.get(`/api/roles/${id}`);
}

export { getAllRoles, createRole, deleteRole, editRole, getRole};
