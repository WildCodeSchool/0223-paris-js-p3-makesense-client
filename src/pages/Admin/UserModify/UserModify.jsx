import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllJobs } from "../../../services/jobs";
import { getAllRoles } from "../../../services/roles";
import { modifyAccountAdmin, getUser } from "../../../services/users";
import CustomToast from "../../../components/CustomToast/CustomToast";

function UserModify() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();
  const { showAlert } = CustomToast();
  const fileInputRef = useRef(null);

  const [modify, setModify] = useState({
    email: "",
    firstname: "",
    lastname: "",
    role_id: "",
    job_id: "",
    admin: "",
    avatar: "",
  });

  const [roles, setRoles] = useState([]);
  const [jobs, setJobs] = useState([]);

  const searchData = async () => {
    try {
      const userData = await getUser(id);
      const rolesData = await getAllRoles();
      const jobsData = await getAllJobs();
      setModify({
        email: userData?.data[0].email,
        firstname: userData?.data[0].firstname,
        lastname: userData?.data[0].lastname,
        role_id: userData?.data[0].role_id,
        job_id: userData?.data[0].job_id,
        admin: userData?.data[0].admin,
        avatar: userData?.data[0].avatar,
      });
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const newProfileImage = reader.result;
      setModify({ ...modify, avatar: newProfileImage });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfile = () => {
    fileInputRef.current.click();
  };

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
      showAlert("error", "Veuillez remplir tous les champs !");
    } else {
      try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("role_id", role_id);
        formData.append("job_id", job_id);
        formData.append("admin", admin);
        if (fileInputRef?.current?.files[0]) {
          formData.append("avatar", fileInputRef.current.files[0]);
        }

        await modifyAccountAdmin(formData, id);
        navigate("/admin/users", { state: { userModified: true } });
      } catch (err) {
        console.error("err", err);
        if (err.response.status === 400) {
          showAlert(
            "error",
            "L'adresse e-mail est déjà utilisée par un autre utilisateur."
          );
        } else if (err.response.status === 403) {
          showAlert(
            "error",
            "Impossible d'upload cette image sur notre serveur ! "
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
        <h1 className="title2_register">Modifier l'utilisateur !</h1>
        <form onSubmit={handleSubmit}>
          <div className="profile-file-admin">
            <img
              src={modify.avatar}
              alt="userprofile"
              className="profile-image-admin"
              onClick={handleEditProfile}
            />
            <img
              className="crayonimg-admin"
              src="../../src/assets/crayon.png"
              alt="editprofile"
              onClick={handleEditProfile}
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
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
