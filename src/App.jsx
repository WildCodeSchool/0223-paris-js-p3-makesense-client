import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./sass/style.scss";
import Navbar from "./components/Navbar/Navbar";

import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import CreationGuide from "./pages/CreationGuide/CreationGuide";
import Login from "./pages/Login/Login";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "./services/users";
import { signin } from "./store/auth";
import ForgotPassword from "./pages/Forgotpassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import MonProfil from "./pages/MonProfil/MonProfil";
import TitleProject from "./pages/CreateProject/TitleProject/TitleProject";
import SuiviProjet from "./pages/SuiviProjet/SuiviProjet";

function App() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const reloadStore = async () => {
    try {
      const result = await getCurrentUser();
      dispatch(signin(result.data, { isLogged: true }));
      setVisible(true);
    } catch (error) {
      console.error(error);
      setVisible(true);
    }
  };

  useEffect(() => {
    reloadStore();
  }, []);

  return visible ? (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/monprofil"
            element={
              <PrivateRoute>
                <MonProfil />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/suiviprojet"
            element={
              <PrivateRoute>
                <SuiviProjet />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/Guide"
            element={
              <PrivateRoute>
                <CreationGuide />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/forgotPassword"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/resetPassword"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/titleproject"
            element={
              <PrivateRoute>
                <TitleProject />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  ) : (
    ""
  );
}

const admins = [
  0, //  => User
  1, //  => Admin
];

const PrivateRoute = ({ children, admin = 1 }) => {
  const auth = useSelector((state) => state.auth);
  console.log("auth", auth);
  if (auth.isLogged) {
    console.log("auth.user", auth.user);
    console.log("kader noob");
    if (auth.user?.admin == admin || auth.user?.admin === 1) {
      console.log("toto");
      console.log("children", children);
      return children;
    } else {
      console.log("toto");
      return <Navigate to="/" />;
    }
  } else {
    console.log("tata", children);
    return <Navigate to="/login" />;
  }
  const location = useLocation();
  console.log("location", location.pathname);
  console.log(auth);
  console.log("auth.isLogged", auth.isLogged);
  if (auth.isLogged) {
    if (
      auth.user?.admin === admin ||
      admins.indexOf(auth.user?.admin) >= admins.indexOf(admin)
    ) {
      return children;
    }
    <Navigate to="/" />;
  }
  <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  if (!auth.isLogged || auth === undefined) {
    return children;
  }
  return <Navigate to="/" />;
};

export default App;
