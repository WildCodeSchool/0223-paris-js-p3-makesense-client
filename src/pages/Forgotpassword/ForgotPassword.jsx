import { useState } from "react";
import { sendResetPassword } from "../../services/auth";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendResetPassword(email);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
      <h3 className="title_password_request">Réinitialisation de votre mot de passe</h3>
        <input className="email_forgot_password"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" className="forgot_password_request">
        Envoyer votre demande !
        </button>
      </div>
    </>
  );
}

export default ForgotPassword;