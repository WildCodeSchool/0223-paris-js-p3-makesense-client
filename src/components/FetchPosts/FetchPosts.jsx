import { useEffect, useState } from "react";
import api from "../../services/api";
import ProjectCard from "../ProjectCard/ProjectCard";
import Pagination from "../Pagination/Pagination";
import { getAllPosts } from "../../services/post";
export default function FetchPosts() {
  const [posts, setPosts] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);

  const searchData = async () => {
    try {
      const postsData = await getAllPosts();
      setPosts(postsData.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    searchData();
  }, []);

  return (
    <>
      <ul className="fetchPosts">
        {currentItems.map((data) => (
          <ProjectCard post={data} key={data.id} />
        ))}
      </ul>
      <Pagination data={posts} setCurrentItems={setCurrentItems} />
    </>
  );
}
