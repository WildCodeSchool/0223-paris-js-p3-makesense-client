import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../../../components/Pagination/Pagination";
import { sendPostData } from "../../../store/posts";
import { getAllPost } from "../../../services/post";
import SearchBarAdmin from "../../../components/SearchBarAdmin/SearchBarAdmin";
import ProjectCard from "../../../components/ProjectCard/ProjectCard";

function PostsManager() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  const [currentPagePosts, setCurrentPagePosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [adminFilter, setAdminFilter] = useState(false);
  const [nonAdminFilter, setNonAdminFilter] = useState(false);
  const [visible, setVisible] = useState(false);

  const searchData = async () => {
    try {
      const postsData = await getAllPost();
      dispatch(sendPostData(postsData.data));
      setVisible(true);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    if (!auth.user) return navigate("/login");
    searchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAdminFilter = (e) => {
    setAdminFilter(e.target.checked);
  };

  const handleNonAdminFilter = (e) => {
    setNonAdminFilter(e.target.checked);
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const { title, status, location, firstname, lastname } = post;

      const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

      const titleMatch =
        (title && title.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (title &&
          title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(lowerCaseSearchTerm));

      const statusMatch =
        (status && status.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (status &&
          status
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(lowerCaseSearchTerm));

      const locationMatch =
        (location && location.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (location &&
          location
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(lowerCaseSearchTerm));

      const firstnameLastnameMatch =
        (`${firstname} ${lastname}` &&
          `${firstname} ${lastname}`
            .toLowerCase()
            .includes(lowerCaseSearchTerm)) ||
        (`${lastname} ${firstname}` &&
          `${lastname} ${firstname}`
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(lowerCaseSearchTerm));

      const isMatch =
        titleMatch || statusMatch || locationMatch || firstnameLastnameMatch;

      return isMatch;
    });
  }, [posts, searchTerm]);

  useEffect(() => {
    if (searchTerm === "") {
      setCurrentPagePosts(filteredPosts.slice(currentPagePosts, 9));
    } else {
      setCurrentPagePosts(filteredPosts);
    }
  }, [filteredPosts]);

  return visible ? (
    <div>
      <div className="container_admin_postmanage">
        <SearchBarAdmin searchTerm={searchTerm} handleSearch={handleSearch} />
        <div className="card_container_admin_post">
          {currentPagePosts.map((post) => {
            return <ProjectCard post={post} edit />;
          })}
        </div>
        {posts && (
          <div className="pagination_admin_post">
            <Pagination
              data={filteredPosts}
              setCurrentItems={setCurrentPagePosts}
            />
          </div>
        )}
      </div>
    </div>
  ) : (
    ""
  );
}

export default PostsManager;
