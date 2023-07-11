import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./sass/style.scss";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import CreationGuide from "./pages/CreationGuide/CreationGuide";
import Login from "./pages/login/Login";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { getCurrentUser } from "./services/users";
import { signin } from "./store/auth";
import ForgotPassword from "./pages/Forgotpassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";


function App() {
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
    <Router>
      <div>
      <Navbar/>
        <Routes>
          <Route
            exact
            path="/"
            element={(
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            )}
          />
          <Route
            exact
            path="/Guide"
            element={(
              <PrivateRoute>
                <CreationGuide />
              </PrivateRoute>
            )}
          />
          <Route
            exact
            path="/login"
            element={(
              <PublicRoute>
                <Login />
              </PublicRoute>
            )}
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
        </Routes>
      </div>
    </Router>
    <Footer/>
    </>
  );
}

const admins = [
  0, //  => User
  1, //  => Admin
];

const PrivateRoute = ({ children, admin = 0 }) => {
  const auth = useSelector((state) => state.auth);
  if (auth.isLogged) {
    if (
      auth.user?.admin === admin
      || admins.indexOf(auth.user?.admin) >= admins.indexOf(admin)
    ) {
      return children;
    }
      <Navigate to="/" />;
  }
    <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  if (!auth.isLogged) {
    return children;
  }
    <Navigate to="/" />;
};

export default App;
