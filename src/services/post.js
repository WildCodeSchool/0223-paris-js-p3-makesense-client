import api from "./api";

const getAllPost = () => api.get("/api/posts");

const getCurrentPost = (id) => api.get(`/api/posts/${id}`);

const getPostVote = (id) => api.get(`/api/posts/votes/frompost/${id}`);

const getPostFromUser = () => api.get(`/api/posts/me`);

const getVoteFromUser = () => api.get(`api/posts/votes/fromuser`);

const getImpactedFromPost = (id) => api.get(`/api/posts/impacted/${id}`);

const getExpertFromPost = (id) => api.get(`/api/posts/expert/${id}`);

const addVote = () => api.get(`/api/posts/votes`);

const deletePost = (id) => {
  return api.delete(`/api/posts/${id}`)
}

export {
  getAllPost,
  getCurrentPost,
  getPostVote,
  getPostFromUser,
  getVoteFromUser,
  getExpertFromPost,
  getImpactedFromPost,
  addVote,
  deletePost,
};
