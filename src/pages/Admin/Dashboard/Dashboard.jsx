import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllCountUser } from "../../../services/users";
import { getAllCountPost } from "../../../services/post";
import { getAllCountJob } from "../../../services/jobs";
import { getAllCountRole } from "../../../services/roles";

function Dashboard() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const [countUsers, setCountUsers] = useState(0);
  const [countPosts, setCountPosts] = useState(0);
  const [countJobs, setCountJobs] = useState(0);
  const [countRoles, setCountRoles] = useState(0);
  const searchData = async () => {
    try {
      const countUser = await getAllCountUser();
      setCountUsers(countUser?.data?.count);
      const countPost = await getAllCountPost();
      setCountPosts(countPost?.data?.count);
      const countJob = await getAllCountJob();
      setCountJobs(countJob?.data?.count);
      const countRole = await getAllCountRole();
      setCountRoles(countRole?.data?.count);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    if (!auth.user) return navigate("/login");
    searchData();
  }, []);

  return (
    <div className="box">
      <div className="dashboard_admin_dashboard">
        <header className="dashboard_header_admin_dashboard">
          <h1 className="title_h1_admin_dashboard">
            Tableau de bord - Administration
          </h1>
          <div className="counters_admin_dashboard">
            <div className="counter_admin_dashboard">
              <h2>Utilisateurs</h2>
              <p className="count_admin_dashboard">{countUsers}</p>
            </div>
            <div className="counter_admin_dashboard">
              <h2>Publications</h2>
              <p className="count_admin_dashboard">{countPosts}</p>
            </div>
            <div className="counter_admin_dashboard">
              <h2>Emplois</h2>
              <p className="count_admin_dashboard">{countJobs}</p>
            </div>
            <div className="counter_admin_dashboard">
              <h2>Rôles</h2>
              <p className="count_admin_dashboard">{countRoles}</p>
            </div>
          </div>
        </header>

        <div className="card_container_admin_dashboard">
          <Link to="/admin/users" className="card_link_admin_dashboard">
            <div className="card_admin_dashboard user_card_admin_dashboard">
              <h2>Gestion des utilisateurs</h2>
            </div>
          </Link>

          <Link to="/admin/posts" className="card_link_admin_dashboard">
            <div className="card_admin_dashboard post_card_admin_dashboard">
              <h2>Gestion des publications</h2>
            </div>
          </Link>
          <Link to="/admin/jobs" className="card_link_admin_dashboard">
            <div className="card_admin_dashboard job_card_admin_dashboard">
              <h2>Gestion des Emplois</h2>
            </div>
          </Link>
          <Link to="/admin/roles" className="card_link_admin_dashboard">
            <div className="card_admin_dashboard role_card_admin_dashboard">
              <h2>Gestion des Rôles</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
