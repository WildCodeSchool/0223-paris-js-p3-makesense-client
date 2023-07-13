import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllJobs } from "../../../services/jobs";
import { getAllRoles } from "../../../services/roles";
import { createAccount } from "../../../services/users";

function Register() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [register, setRegister] = useState({
    email: "",
    firstname: "",
    lastname: "",
    role_id: "",
    job_id: "",
  });
  const [error, setError] = useState(null);
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
      setError(
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
    console.log("register --->", register);
    const { email, firstname, lastname, role_id, job_id } = register;
    if (
      email === "" ||
      firstname === "" ||
      lastname === "" ||
      role_id === "" ||
      job_id === ""
    ) {
      return setError("Veuillez remplir tous les champs !");
    } else {
      try {
        const registerBDD = await createAccount(register);
        console.log("registerBDD", registerBDD);
      } catch (err) {
        console.log("err", err);
      }
    }
  };

  return (
    <div className="box">
      <div className="containers">
        <h1 className="title2_register">
          Enregistrez un nouveau utilisateur !
        </h1>
        {error && <p className="p_error_register">{error}</p>}
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
              id="cupcake-select"
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
              id="cupcake-select"
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
