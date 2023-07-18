import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Dashboard() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.user) return navigate("/login");
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
              <p className="count_admin_dashboard">NaN</p>
            </div>
            <div className="counter_admin_dashboard">
              <h2>Publications</h2>
              <p className="count_admin_dashboard">NaN</p>
            </div>
            <div className="counter_admin_dashboard">
              <h2>Emplois</h2>
              <p className="count_admin_dashboard">NaN</p>
            </div>
            <div className="counter_admin_dashboard">
              <h2>Rôles</h2>
              <p className="count_admin_dashboard">NaN</p>
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
