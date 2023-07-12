import { useEffect, useState } from "react";
import api from "../../services/api";
import ProjectCard from "./ProjectCard";

export default function FetchPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api
      .get("/api/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <ul>
      {posts.slice(0, 3).map((data) => (
        <ProjectCard post={data} key={data.id} />
      ))}
    </ul>
  );
}
