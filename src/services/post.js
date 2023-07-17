import api from "./api";

const getAllPost = () => {
  api.get("/api/posts");
};
const getCurrentPost = (id) => {
  api.get(`/api/posts/${id}`);
};
export { getAllPost, getCurrentPost };


