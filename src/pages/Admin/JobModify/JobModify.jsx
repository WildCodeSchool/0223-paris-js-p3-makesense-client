import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { editJob, getJob } from "../../../services/jobs";
import CustomToast from "../../../components/CustomToast/CustomToast";

function JobModify() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();

  const [name, setName] = useState("");
  const { showAlert } = CustomToast();

  const searchData = async () => {
    try {
      const jobData = await getJob(id);
      await setName(jobData?.data[0]?.name);
    } catch (err) {
      console.log("err", err);
      if (name === "") {
        navigate("/admin/jobs");
      } else {
        showAlert(
          "error",
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
        await editJob(id, { name });
        navigate("/admin/jobs", { state: { jobModified: true } });
      } catch (err) {
        console.log("err", err);
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
        <h1 className="title2_register">Modifier le poste !</h1>
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

export default JobModify;
