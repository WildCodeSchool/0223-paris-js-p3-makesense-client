import { useEffect, useState } from "react";
import api from "../../services/api";
import ProjectCard from "./ProjectCard";
import Pagination from "./Pagination";

export default function FetchPosts() {
  const [posts, setPosts] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);

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
    <>
      <ul>
        {currentItems.map((data) => (
          <ProjectCard post={data} key={data.id} />
        ))}
      </ul>
      <Pagination data={posts} setCurrentItems={setCurrentItems} />
    </>
  );
}
