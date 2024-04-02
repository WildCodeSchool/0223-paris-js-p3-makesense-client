import api from "./api";

const addAvis = (data) => api.post("/api/avis", data);

const deleteAvis = (id) => api.delete(`/api/avis/${id}`);

const editAvis = (id, data) => api.put(`/api/avis/${id}`, data);

const getAllAvis = (id) => api.get(`/api/avis/avisfrompost/${id}`);

export { getAllAvis, addAvis, deleteAvis, editAvis };
