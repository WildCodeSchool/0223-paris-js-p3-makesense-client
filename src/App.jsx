import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./sass/style.scss";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/login/Login";
import Home from "./pages/home";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { getCurrentUser } from "./services/users";
import { signin } from "./store/auth";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    reloadStore();
  }, []);

  const reloadStore = async () => {
    try {
      const result = await getCurrentUser();
      dispatch(signin(result.data));
    } catch (error) {
      console.error(error);
    }
  };

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
  //0 = bolean donc un user
  const auth = useSelector((state) => state.auth);
  if (auth.isLogged) {
    console.log("auth.user", auth.user);
    if (
      auth.user?.admin == admin ||
      admins.indexOf(auth.user?.admin) >= admins.indexOf(admin)
    ) {
      console.log("toto");
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
