import api from "./api";

const getAllUsers = () => {
  api.get("/api/users");
};

const getCurrentUser = () => {
  api.get("/api/users/me");
};

export { getAllUsers, getCurrentUser };
