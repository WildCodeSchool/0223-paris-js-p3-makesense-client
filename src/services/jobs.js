import api from "./api";

const getAllJobs = async (req, res) => {
  return api.get("/api/jobs")
}

export { getAllJobs };