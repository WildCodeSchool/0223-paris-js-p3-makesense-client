import api from "./api";

const getAllAvis = (id) => api.get(`/api/avis/avisfrompost/${id}`);

export { getAllAvis };
