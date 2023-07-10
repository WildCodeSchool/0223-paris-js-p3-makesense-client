import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./sass/style.scss";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
// import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import CreationGuide from "./pages/CreationGuide/CreationGuide";
import Login from "./pages/login/Login";
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
    <>
      <Navbar/>
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
    <Footer/>
    </>
  );
};

const admins = [
  0, //  => User
  1, //  => Admin
];

const PrivateRoute = ({ children, admin = 0 }) => {
  const auth = useSelector((state) => state.auth);
  if (auth.isLogged) {
    console.log("auth.user", auth.user);
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
