import api from "./api";

const getAllRoles = async (req, res) => {
  return api.get("/api/roles")
}

export { getAllRoles };
