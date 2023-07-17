import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { signin } from "../../../store/auth";
import authService from "../../../services/auth";
import { Link } from "react-router-dom";

function Register() {
  const [register, setRegister] = useState({
    email: "",
    password: "",
  });

  const [password, setPassword] = useState(false);
  const [error, setError] = useState(null);

  const showpassword = () => {
    setPassword(!password);
  };

  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

  };

  return (
    <div className="box">
      <div className="containers">
        <h1 className="title2_register">
          Enregistrez un nouveau utilisateur !
        </h1>
        {error && <p className="p_error_register">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="button_courriel">
            <input
              className="courriel_icon"
              type="email"
              name="email"
              id="email"
              placeholder="Courriel"
              value={register.email}
              onChange={(e) =>
                setRegister({ ...register, email: e.target.value })
              }
            />
          </div>

          <div>

          </div>

          <div className="checkbox">
            <input type="checkbox" id="scales" name="scales" />
            <label for="scales">Se souvenir de moi</label>
          </div>

          <div className="button_connexion">
            <button type="submit" className="connexion">
              se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
