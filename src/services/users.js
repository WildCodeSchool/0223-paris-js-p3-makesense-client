import api from "./api";

const getAllUsers = () => {
  return api.get("/api/users");
};

const getCurrentUser = () => {
  return api.get("/api/users/me");
};

const createAccount = (data) => {
  return api.get("/api/users/register", data);
}

export { getAllUsers, getCurrentUser, createAccount};
