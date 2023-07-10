import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../../store/auth";
import authService from "../../services/auth";
import Input from "../../components/Input";

function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

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
      }
    }
  };

  return (
    <div className="color_back">
      {error && <p>{error}</p>}
      <div className="containers">
        <p>Pour acceder au site</p>
        <h1>Connectez-vous</h1>
        <form onSubmit={handleSubmit}>
          <div className="button_courriel">
            <input className="courriel_icon"
              type="email"
              name="email"
              id="email"
              placeholder="Courriel"
              value={login.email}
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />
            </div>
          
          <div className="button_password">
          <input className="password_icon password_eye"            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
          </div>
          
          <div className="checkbox">
            <input type="checkbox" id="scales" name="scales" />
            <label for="scales">Se souvenir de moi</label>
          </div>

          <div className="button_connexion">
          <button type="submit" className="connexion">se connecter</button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Login;
