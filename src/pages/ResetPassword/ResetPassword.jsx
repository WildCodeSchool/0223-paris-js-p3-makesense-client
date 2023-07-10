import { useState } from "react";
import { resetPassword } from "../../services/auth";
import { useNavigate, useSearchParams } from "react-router-dom";


function ResetPassword() {

    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [params, setParams] = useSearchParams();
    const token = params.get("token");

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(password, token);
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
        <div>
        <h3 className="title_new_password">Votre nouveau mot de passe</h3>
          <input className="new_password"
            type="Password"
            name="Password"
            id="Password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="forgot_password_request">
          Je valide 
          </button>
        </div>
      </>
    );
}

export default ResetPassword;
