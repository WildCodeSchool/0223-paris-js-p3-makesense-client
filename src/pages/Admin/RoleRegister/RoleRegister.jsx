import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createRole } from "../../../services/roles";
import CustomToast from "../../../components/CustomToast/CustomToast";

function RoleRegister() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { showAlert } = CustomToast();

  const [name, setName] = useState("");

  useEffect(() => {
    if (!auth.user) return navigate("/login");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "") {
      return showAlert("error", "Veuillez remplir tous les champs !");
    } else {
      try {
        await createRole({ name });
        showAlert("success", "Création du poste réussi !");
      } catch (err) {
        if (err.response.status === 403) {
          showAlert(
            "error",
            "Ce poste est déjà utiliser dans la base de donnée !"
          );
        } else if (err.response.status === 422) {
          const validationErrors = err.response.data.validationErrors;

          const fieldTranslations = {
            "name - FORMAT INCORECT": "Le format du nom du poste est invalide.",
            "name - FORMAT LIMIT":
              "Le format du nom dépasse la limite de caractères (45) autorisée. Veuillez raccourcir le nom.",
          };
          validationErrors.forEach((error) => {
            const translatedField =
              fieldTranslations[error.field] || error.field;
            showAlert("error", translatedField);
          });
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
    <div className="box">
      <div className="containers">
        <h1 className="title2_register">Enregistrez un nouveau rôle !</h1>
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
