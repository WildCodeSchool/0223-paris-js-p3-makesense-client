import api from "./api";

const addAvis = () => api.post("/api/avis");

const getAllAvis = (id) => api.get(`/api/avis/avisfrompost/${id}`);

export { getAllAvis, addAvis };
