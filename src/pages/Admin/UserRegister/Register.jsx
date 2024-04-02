import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllJobs } from "../../../services/jobs";
import { getAllRoles } from "../../../services/roles";
import { createAccount } from "../../../services/users";
import CustomToast from "../../../components/CustomToast/CustomToast";

function Register() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { showAlert } = CustomToast();

  const [register, setRegister] = useState({
    email: "",
    firstname: "",
    lastname: "",
    role_id: "",
    job_id: "",
    admin: "",
  });
  const [roles, setRoles] = useState([]);
  const [jobs, setJobs] = useState([]);

  const searchData = async () => {
    try {
      const rolesData = await getAllRoles();
      const jobsData = await getAllJobs();
      setRoles(rolesData.data);
      setJobs(jobsData.data);
    } catch (err) {
      console.log("err", err);
      showAlert(
        "error",
        "Nous rencontrons un problème, en espérant très vite(.js) chez MAKESENSE !"
      );
    }
  };

  useEffect(() => {
    if (!auth.user) return navigate("/login");
    searchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, firstname, lastname, role_id, job_id, admin } = register;
    if (
      email === "" ||
      firstname === "" ||
      lastname === "" ||
      role_id === "" ||
      job_id === "" ||
      admin === "" ||
      role_id === "null" ||
      job_id === "null" ||
      admin === "null"
    ) {
      showAlert("error", "Veuillez remplir tous les champs !");
    } else {
      try {
        await createAccount(register);
        showAlert("success", "Création du compte réussi !");
      } catch (err) {
        if (err.response.status === 400) {
          showAlert(
            "error",
            "L'adresse e-mail est déjà utilisée par un autre utilisateur."
          );
        } else if (err.response.status === 403) {
          showAlert(
            "error",
            "Impossible d'upload cette image sur notre serveur !"
          );
        } else if (err.response.status === 422) {
          const validationErrors = err.response.data.validationErrors;

          const fieldTranslations = {
            firstname: "Prénom",
            lastname: "Nom de famille",
            "firstname - FORMAT LIMIT":
              "Le format du nom dépasse la limite de caractères (45) autorisée. Veuillez raccourcir le prénom.",
            "lastname - FORMAT INCORRECT":
              "Le format du nom de famille est invalide.",
            "lastname - FORMAT LIMIT":
              "Le format du nom dépasse la limite de caractères (45) autorisée. Veuillez raccourcir le nom de famille.",
            "firstname - FORMAT INCORRECT": "Le format du prénom est invalide.",
            email: "Adresse e-mail",
            "email - FORMAT LIMIT":
              "Le format du nom dépasse la limite de caractères (45) autorisée. Veuillez raccourcir l'email",
            "affiliated_site - FORMAT LIMIT":
              "Le format du nom dépasse la limite de caractères (45) autorisée. Veuillez raccourcir la location.",
            "affiliated_siteRegex - FORMAT INCORRECT":
              "Le format de la location est invalide.",
            "tel - FORMAT LIMIT":
              "Le format du nom dépasse la limite de caractères (45) autorisée. Veuillez raccourcir le numéreau de téléphone.",
            "tel - FORMAT INCORRECT":
              "Le format du numéreau de téléphone est invalide.",
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
        <h1 className="title2_register">
          Enregistrez un nouveau utilisateur !
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="button_admin">
            <input
              className="input_admin"
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

          <div className="button_admin">
            <input
              className="input_admin"
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Nom"
              value={register.firstname}
              onChange={(e) =>
                setRegister({ ...register, firstname: e.target.value })
              }
            />
          </div>

          <div className="button_admin">
            <input
              className="input_admin"
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Prénom"
              value={register.lastname}
              onChange={(e) =>
                setRegister({ ...register, lastname: e.target.value })
              }
            />
          </div>
          <div style={{ color: "orange" }}>
            <select
              id="select"
              value={register.role_id}
              onChange={(e) =>
                setRegister({ ...register, role_id: e.target.value })
              }
            >
              <option value="null">---</option>
              {roles.map((role) => {
                return (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                );
              })}
            </select>
            <select
              id="select"
              value={register.job_id}
              onChange={(e) =>
                setRegister({ ...register, job_id: e.target.value })
              }
            >
              <option value="null">---</option>
              {jobs.map((job) => {
                return (
                  <option key={job.id} value={job.id}>
                    {job.name}
                  </option>
                );
              })}
            </select>
            <select
              id="select"
              value={register.admin}
              onChange={(e) =>
                setRegister({ ...register, admin: e.target.value })
              }
            >
              <option value="null">---</option>
              <option key="0" value="0">
                No Admin
              </option>
              <option key="1" value="1">
                Admin
              </option>
            </select>
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

export default Register;
