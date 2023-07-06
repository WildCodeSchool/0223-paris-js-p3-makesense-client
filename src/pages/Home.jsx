import React from "react";
import { Link } from "react-router-dom";
import authService from "../services/auth";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/auth";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log(auth, "logged out");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="submit" value="Disconnect" />
      </form>
    </div>
  );
};

export default Home;
