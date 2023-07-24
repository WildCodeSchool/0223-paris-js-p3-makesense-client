import { useEffect, useState } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import Pagination from "../Pagination/Pagination";
import { getAllPost } from "../../services/post";

export default function FetchPosts() {
  const [posts, setPosts] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);

  const searchData = async () => {
    try {
      const postsData = await getAllPost();
      setPosts(postsData.data);
    } catch (err) {
      console.error("err", err);
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
