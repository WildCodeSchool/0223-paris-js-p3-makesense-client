import { useState, useEffect } from "react";
import { resetPassword } from "../../services/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomToast from "../../components/CustomToast/CustomToast";
import { verifyToken } from "../../services/users";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [params, setParams] = useSearchParams();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const token = params.get("token");

  const navigate = useNavigate();
  const { showAlert } = CustomToast();

  const checkTokenValidity = async () => {
    try {
      await verifyToken({ token: `${token}` });
    } catch (err) {
      navigate("/login", { state: { usertokenInvalid: true } });
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login", { state: { usertokenInvalid: true } });
    }
    checkTokenValidity();
  }, []);

  const showpassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkPassword !== "" || password !== "") {
      if (checkPassword === password) {
        try {
          await resetPassword(password, token);
          navigate("/login", { state: { userResetPassword: true } });
        } catch (err) {
          console.error(err);
          if (err.response?.status === 400) {
            showAlert(
              "error",
              "Impossible de changer le mot de passe. Le nouveau mot de passe ne peut pas être identique à l'ancien. Veuillez choisir un mot de passe différent et réessayer."
            );
          } else {
            showAlert(
              "error",
              "Nous rencontrons un problème, en espérant très vite(.js) chez MAKESENSE !"
            );
          }
        }
      } else {
        showAlert(
          "error",
          "Oups ! Quelque chose s'est mal passé. Le mot de passe et sa confirmation ne concordent pas. Veuillez vérifier et réessayer."
        );
      }
    } else {
      showAlert("error", "Veuillez remplir tous les champs !");
    }
  };

  return (
    <div className="box">
      <div className="containers">
        <h3 className="title_new_password">Votre nouveau mot de passe</h3>
        <form onSubmit={handleSubmit}>
          <input
            className="new_password password_icon"
            type={visiblePassword ? "text" : "password"}
            name="Password"
            id="Password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="new_password password_icon"
            type={visiblePassword ? "text" : "password"}
            name="Password"
            id="Password"
            placeholder="Confirmez le mot de passe"
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
          />
          <div>
            <img
              onClick={showpassword}
              className="oeil_resetpassword"
              src="../../src/assets/Oeil.svg"
            />
            <p
              className="p_visiblePassword_resetpassword"
              onClick={showpassword}
            >
              {visiblePassword
                ? "Cacher le mot de passe"
                : "Voir le mot de passe"}
            </p>
          </div>
          <button type="submit" className="button_forgot_password">
            Je valide
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
