import { useState } from "react";
import { sendResetPassword } from "../../services/auth";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendResetPassword(email);
      setMessage(
        "Une demande à étai envoyée à votre adresse mail, vous serez redirigé sur la page de connexion dans 5 secondes."
      );
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      setMessage(
        "Une demande à étai envoyée à votre adresse mail, vous serez redirigé sur la page de connexion dans 5 secondes."
      );
      setTimeout(() => {
        navigate("/login");
      }, 5000);
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
