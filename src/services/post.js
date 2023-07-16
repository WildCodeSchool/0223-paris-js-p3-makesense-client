import api from "./api";

const getAllPost = () => {
  return api.get("/api/posts");
};

const getCurrentPost = (id) => {
  return api.get(`/api/posts/${id}`);
};

export { getAllPost, getCurrentPost };
