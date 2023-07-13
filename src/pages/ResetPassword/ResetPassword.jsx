import { useState, useEffect } from "react";
import { resetPassword } from "../../services/auth";
import { useNavigate, useSearchParams } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [error, setError] = useState(null);
  const [params, setParams] = useSearchParams();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const token = params.get("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
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
          navigate("/login");
        } catch (error) {
          console.error(error);
          setError(
            "Nous rencontrons un problème, en espérant très vite(.js) chez MAKESENSE !"
          );
        }
      } else {
        setError(
          "Oups ! Quelque chose s'est mal passé. Le mot de passe et sa confirmation ne concordent pas. Veuillez vérifier et réessayer."
        );
      }
    } else {
      setError("Veuillez remplir tous les champs !");
    }
  };

  return (
    <div className="box">
      <div className="containers">
        <h3 className="title_new_password">Votre nouveau mot de passe</h3>
        {error && <p className="p_error_resetpassword">{error}</p>}
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
          <img
            onClick={showpassword}
            className="oeil_resetpassword"
            src="src/assets/Oeil.png"
          />
          <p className="p_visiblePassword_resetpassword" onClick={showpassword}>
            {visiblePassword ? "Cacher le mot de passe" : "Voir le mot de passe."}
          </p>
          <button type="submit" className="button_forgot_password">
            Je valide
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
