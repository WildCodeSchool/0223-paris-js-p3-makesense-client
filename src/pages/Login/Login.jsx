import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../../store/auth";
import authService from "../../services/auth";
import { Link } from "react-router-dom";

function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [password, setPassword] = useState(false);
  const [error, setError] = useState(null);

  const showpassword = () => {
    setPassword(!password);
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await authService.login(login.email, login.password);
      dispatch(signin(result.data));

      navigate("/");
    } catch (err) {
      if (err.response?.status === 400) {
        setError("email ou mot de passe incorrect");
      } else {
        setError(
          "Nous rencontrons un problème, en espérant très vite(.js) chez MAKESENSE !"
        );
      }
    }
  };

  return (
    <div className="box">
      <div className="containers">
        <p className="title1_login">Pour acceder au site</p>
        <h1 className="title2_login">Connectez-vous</h1>
        {error && <p className="p_error_login">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="button_courriel">
            <input
              className="courriel_icon"
              type="email"
              name="email"
              id="email"
              placeholder="Courriel"
              value={login.email}
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />
          </div>

          <div className="button_password">
            <input
              className="password_icon password_eye"
              type={password ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Mot de passe"
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
            <img
              onClick={showpassword}
              className="oeil"
              src="src/assets/Oeil.png"
            />
          </div>

          <div className="checkbox">
            <input type="checkbox" id="scales" name="scales" />
            <label for="scales">Se souvenir de moi</label>
          </div>

          <div className="button_connexion">
            <button type="submit" className="connexion">
              se connecter
            </button>
            <p className="forgot_password">
              <Link to="/forgotpassword">Mot de passe oublié</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
