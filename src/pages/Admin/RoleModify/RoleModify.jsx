import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { editRole, getRole } from "../../../services/roles";

function RoleModify() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();

  const [name, setName] = useState("");

  const [error, setError] = useState(null);

  const searchData = async () => {
    try {
      const roleData = await getRole(id);
      await setName(roleData?.data[0]?.name);
    } catch (err) {
      console.log("err", err);
      if (name === "") {
        navigate("/admin/roles");
      } else if (err.response.status === 403) {
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
          const translatedField = fieldTranslations[error.field] || error.field;
          errorMessage += `${translatedField}, `;
        });
        errorMessage = errorMessage.slice(0, -2);
        setMessage(null);
        setError(errorMessage);
      } else {
        setError(
          "Nous rencontrons un problème, en espérant très vite(.js) chez MAKESENSE !"
        );
      }
    }
  };

  useEffect(() => {
    if (!auth.user) return navigate("/login");
    searchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "") {
      return setError("Veuillez remplir tous les champs !");
    } else {
      try {
        await editRole(id, { name });
        navigate("/admin/roles");
      } catch (err) {
        console.log("err", err);
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
        <h1 className="title2_register">Modifier le poste !</h1>
        {error && <p className="p_error_register">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="button_admin">
            <input
              className="input_admin"
              type="text"
              name="name"
              id="name"
              placeholder="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="button_admin">
            <button type="submit" className="connexion">
              Modifier le poste
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoleModify;
