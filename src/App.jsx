import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./sass/style.scss";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/login/Login";
import Home from "./pages/home";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "./services/users";
import { signin } from "./store/auth";

const App = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const reloadStore = async () => {
    try {
      const result = await getCurrentUser();
      console.log("result", result);
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
        </Routes>
      </div>
    </Router>
  ) : (
    ""
  );
};

const admins = [
  0, //  => User
  1, //  => Admin
];

const PrivateRoute = ({ children, admin = 1 }) => {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  console.log("location", location.pathname);
  console.log(auth);
  console.log("auth.isLogged", auth.isLogged);
  if (auth.isLogged) {
    console.log("auth.user new", auth);
    if (
      auth.user?.admin == admin ||
      admins.indexOf(auth.user?.admin) >= admins.indexOf(admin)
    ) {
      return children;
    } else return <Navigate to="/" />;
  } else return <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  if (!auth.isLogged) {
    return children;
  } else return <Navigate to="/" />;
};

export default App;
