import { useState } from "react";
import { sendResetPassword } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import CustomToast from "../../components/CustomToast/CustomToast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const { showAlert } = CustomToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      showAlert("error", "Veuillez remplir le champ e-mail !");
    } else {
      try {
        await sendResetPassword(email);
        navigate("/login", { state: { userForgotPassword: true } });
      } catch (error) {
        navigate("/login", { state: { userForgotPassword: true } });
      }
    }
  };

  return (
    <div className="box">
      <div className="containers">
        <h3 className="title_password_request">
          Réinitialisation de votre mot de passe
        </h3>
        {message && <p className="p_error_forgetPassword">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            className="email_forgot_password"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" className="forgot_password_request">
            Envoyer votre demande !
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
