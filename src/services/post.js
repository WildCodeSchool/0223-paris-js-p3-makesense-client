import api from "./api";

const getAllPosts = async (req, res) => {
  return api.get("/api/posts")
}

export { getAllPosts };