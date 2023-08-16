import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const [save, setSave] = useState(false);
  const { showAlert } = CustomToast();

  const showpassword = () => {
    setPassword(!password);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const dataJSON = localStorage.getItem("userloginSave");
    if (dataJSON) {
      const objectData = JSON.parse(dataJSON);
      setLogin(objectData);
      setSave(true);
    }
  }, []);

  useEffect(() => {
    if (location.state && location.state.userForgotPassword) {
      showAlert(
        "success",
        "Si l'adresse e-mail est enregistrée dans notre base de données, vous recevrez bientôt un e-mail contenant les instructions pour réinitialiser votre mot de passe."
      );
      navigate("/login", { replace: true, state: undefined });
    } else if (location.state && location.state.userResetPassword) {
      showAlert(
        "success",
        "Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe."
      );
      navigate("/login", { replace: true, state: undefined });
    } else if (location.state && location.state.usertokenInvalid) {
      showAlert(
        "error",
        "Le lien de réinitialisation du mot de passe n'est plus valide. Veuillez demander une nouvelle réinitialisation de mot de passe."
      );
      navigate("/login", { replace: true, state: undefined });
    }
  }, [location.state, showAlert]);

  useEffect(() => {
    const userlogin = localStorage.getItem("userlogin");
    if (userlogin === "false") {
      showAlert("success", "Vous êtes maintenant déconnecté !");
      localStorage.removeItem("userlogin");
    }
  }, [showAlert]);

  const handleClickSave = async () => {
    setSave(!save);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = login;
    if (email === "" || password === "") {
      showAlert("error", "Veuillez remplir tous les champs !");
    } else {
      try {
        const result = await authService.login(email, password);
        dispatch(signin(result.data));
        if (save) {
          const dataSatve = JSON.stringify(login);
          localStorage.setItem("userloginSave", dataSatve);
        } else {
          localStorage.removeItem("userloginSave");
        }
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
            <input
              type="checkbox"
              id="cbtest"
              onClick={handleClickSave}
              checked={save ? true : false}
            />
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
