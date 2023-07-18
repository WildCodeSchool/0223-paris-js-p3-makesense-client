import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllJobs } from "../../../services/jobs";
import { getAllRoles } from "../../../services/roles";
import { modifyAccount, getUser } from "../../../services/users";

function UserModify() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();

  const [modify, setModify] = useState({
    email: "",
    firstname: "",
    lastname: "",
    role_id: "",
    job_id: "",
    admin: "",
  });

  const [error, setError] = useState(null);
  const [roles, setRoles] = useState([]);
  const [jobs, setJobs] = useState([]);

  const searchData = async () => {
    try {
      const userData = await getUser(id);
      const rolesData = await getAllRoles();
      const jobsData = await getAllJobs();
      setModify(userData?.data[0]);
      setRoles(rolesData.data);
      setJobs(jobsData.data);
    } catch (err) {
      console.log("err", err);
      const { email, firstname, lastname, role_id, job_id } = modify;
      if (
        email === "" ||
        firstname === "" ||
        lastname === "" ||
        role_id === "" ||
        job_id === ""
      ) {
        navigate("/admin/users");
      } else {
        console.log("err", err);
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
    const { email, firstname, lastname, role_id, job_id, admin } = modify;
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
      return setError("Veuillez remplir tous les champs !");
    } else {
      try {
        await modifyAccount(modify, id);
        navigate("/admin/users");
      } catch (err) {
        console.log("err.reponse", err.reponse);
        if (err.response.status === 400) {
          setError(
            "L'adresse e-mail est déjà utilisée par un autre utilisateur."
          );
        } else if (err.response.status === 403) {
          setError("Impossible d'upload cette image sur notre serveur ! ");
        } else if (err.response.status === 422) {
          const validationErrors = err.response.data.validationErrors;
          let errorMessage = "Vérifiez les champs suivants : ";
          const fieldTranslations = {
            email: "Adresse e-mail",
            firstname: "Prénom",
            lastname: "Nom de famille",
          };
          validationErrors.forEach((error) => {
            console.log("error", error);
            const translatedField =
              fieldTranslations[error.field] || error.field;
            errorMessage += `${translatedField}, `;
          });
          errorMessage = errorMessage.slice(0, -2);
          setError(errorMessage);
        } else {
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
        <h1 className="title2_register">Modifier l'utilisateur !</h1>
        {error && <p className="p_error_register">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="button_admin">
            <input
              className="input_admin"
              type="email"
              name="email"
              id="email"
              placeholder="Courriel"
              value={modify.email}
              onChange={(e) => setModify({ ...modify, email: e.target.value })}
            />
          </div>

          <div className="button_admin">
            <input
              className="input_admin"
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Nom"
              value={modify.firstname}
              onChange={(e) =>
                setModify({ ...modify, firstname: e.target.value })
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
              value={modify.lastname}
              onChange={(e) =>
                setModify({ ...modify, lastname: e.target.value })
              }
            />
          </div>
          <div style={{ color: "orange" }}>
            <select
              id="select"
              value={modify.role_id}
              onChange={(e) =>
                setModify({ ...modify, role_id: e.target.value })
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
              value={modify.job_id}
              onChange={(e) => setModify({ ...modify, job_id: e.target.value })}
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
              value={modify.admin}
              onChange={(e) => setModify({ ...modify, admin: e.target.value })}
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
              Modifier le compte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserModify;
