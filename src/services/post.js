import api from "./api";

const getAllPost = () => {
  return api.get("/api/posts");
};
const getCurrentPost = (id) => {
  return api.get(`/api/posts/${id}`);
};

const getPostFromUser = () => {
  return api.get(`/api/posts/me`)
};

const getVoteFromUser = (id) => {
  return api.get(`api/posts/votes/fromuser`)
};


export { getAllPost, getCurrentPost, getPostFromUser, getVoteFromUser };


