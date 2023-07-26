import api from "./api";

const getAllJobs = async () => {
  return api.get("/api/jobs")
}

const getAllCountJob = async () => {
  return api.get("/api/jobs/count")
}

const createJob = async (data) => {
  return api.post("/api/jobs", data)
}

const deleteJob = async (id) => {
  return api.delete(`/api/jobs/${id}`)
}

const editJob = async (id, name) => {
  return api.put(`/api/jobs/${id}`, name)
}

const getJob = async (id) => {
  return api.get(`/api/jobs/${id}`);
}

export { getAllJobs, createJob, deleteJob, editJob, getJob, getAllCountJob };