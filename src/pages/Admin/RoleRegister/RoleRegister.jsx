import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createRole } from "../../../services/roles";

function RoleRegister() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!auth.user) return navigate("/login");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "") {
      return setError("Veuillez remplir tous les champs !"), setMessage(null);
    } else {
      try {
        await createRole({ name });
        setError(null);
        setMessage("Création du poste réussi !");
      } catch (err) {
        if (err.response.status === 403) {
          setMessage(null);
          setError("Ce poste est déjà utiliser dans la base de donnée !");
        } else if (err.response.status === 422) {
          const validationErrors = err.response.data.validationErrors;
          let errorMessage = "Vérifiez les champs suivants : ";
          const fieldTranslations = {
            "name - FORMAT INCORECT": "Le format du nom du poste est invalide.",
            "name - FORMAT LIMIT":
              "Le format du nom dépasse la limite de caractères (45) autorisée. Veuillez raccourcir le nom.",
          };
          validationErrors.forEach((error) => {
            const translatedField =
              fieldTranslations[error.field] || error.field;
            errorMessage += `${translatedField}, `;
          });
          errorMessage = errorMessage.slice(0, -2);
          setMessage(null);
          setError(errorMessage);
        } else {
          setMessage(null);
          setError(
            "Nous rencontrons un problème, en espérant très vite(.js) chez MAKESENSE !"
          );
        }
      }
    }
  };

  return (
    <div className="box">
      <div className="containers">
        <h1 className="title2_register">Enregistrez un nouveau rôle !</h1>
        {error && <p className="p_error_register">{error}</p>}
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="button_admin">
            <input
              className="input_admin"
              type="text"
              name="role"
              id="role"
              placeholder="Nom du rôle"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="button_admin">
            <button type="submit" className="connexion">
              Créer le compte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoleRegister;
