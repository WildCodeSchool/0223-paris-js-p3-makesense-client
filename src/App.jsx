import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./sass/style.scss";
import Navbar from "./components/Navbar/Navbar";
import Monprofil from "./pages/monprofil/monprofil";
// import Navbar from "./components/Navbar/Navbar";
import CreationGuide from "./pages/CreationGuide/CreationGuide";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { getCurrentUser } from "./services/users";
import { signin } from "./store/auth";

const App = () => {
  const dispatch = useDispatch();

  const reloadStore = async () => {
    try {
      const result = await getCurrentUser();
      dispatch(signin(result.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    reloadStore();
  }, []);

  return (
    <Router>
      <div>
        <Routes>
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
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/monprofil"
            element={
              <PrivateRoute>
                <Monprofil />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

const admins = [
  0, //  => User
  1, //  => Admin
];

const PrivateRoute = ({ children, admin = 0 }) => {
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
};

const PublicRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  if (!auth.isLogged) {
    return children;
  } else return <Navigate to="/" />;
};

export default App;
