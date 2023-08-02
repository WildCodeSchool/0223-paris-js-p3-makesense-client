import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../../store/auth";
import authService from "../../services/auth";
import { Link } from "react-router-dom";
import CustomToast from "../../components/CustomToast/CustomToast";

function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [password, setPassword] = useState(false);
  const { showAlert } = CustomToast();

  const showpassword = () => {
    setPassword(!password);
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const userlogin = localStorage.getItem("userlogin");
    if (userlogin === "false") {
      showAlert("success", "Vous êtes maintenant déconnecté !");
      localStorage.removeItem("userlogin");
    }
  }, [showAlert]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = login;
    if (email === "" || password === "") {
      showAlert("error", "Veuillez remplir tous les champs !");
    } else {
      try {
        const result = await authService.login(email, password);
        dispatch(signin(result.data));
        localStorage.setItem("userlogin", "true");
        navigate("/");
      } catch (err) {
        if (err.response?.status === 400) {
          showAlert("error", "Email ou mot de passe incorrect !");
        } else {
          showAlert(
            "error",
            "Nous rencontrons un problème, en espérant très vite(.js) chez MAKESENSE !"
          );
        }
      }
    }
  };

  return (
    <div className="box_login">
      <div className="containers_login">
        <p className="title1_login c-blue">Pour acceder au site</p>
        <h1 className="title2_login">Connectez-vous</h1>
        <form className="form_login" onSubmit={handleSubmit}>
          <div className="input_courriel_login">
            <input
              className="icon_login courriel"
              type="email"
              name="email"
              id="email"
              placeholder="Courriel"
              value={login.email}
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />
          </div>

          <div className="input_password_login">
            <input
              className=" icon_login  password password_eye_login"
              type={password ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Mot de passe"
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
            <img
              onClick={showpassword}
              className="oeil_login pointer"
              src="src/assets/Oeil.svg"
            />
          </div>
          <div className="checkbox_login">
            <input type="checkbox" id="cbtest" />
            <label for="cbtest" class="check-box" />
            <p className="c-blue">Se souvenir de moi</p>
          </div>
          <button type="submit" className="connexion_login pointer">
            se connecter
          </button>
          <Link to="/forgotpassword" className="c-blue forgotPassword">
            Mot de passe oublié
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
