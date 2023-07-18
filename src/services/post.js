import api from "./api";

const getAllPost = () => {
  return api.get("/api/posts");
};

const getCurrentPost = (id) => {
  return api.get(`/api/posts/${id}`);
};
const getPostVote = (id) => {
  return api.get(`/api/posts/votes/frompost/${id}`);
};

export { getAllPost, getCurrentPost, getPostVote };
