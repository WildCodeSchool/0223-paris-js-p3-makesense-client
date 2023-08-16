import React from "react";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { editUser, getCurrentUser } from "../../services/users";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../../store/auth";
import CustomToast from "../../components/CustomToast/CustomToast";

const MonProfil = () => {
  const [profileImage, setProfileImage] = useState(
    "../../src/assets/default_user.png"
  );
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const { showAlert } = CustomToast();

  const [isEditMode, setIsEditMode] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("France");

  const searchData = async () => {
    try {
      const userData = await getCurrentUser();
      setFirstName(userData?.data?.firstname);
      setName(userData?.data?.lastname);
      setEmail(userData?.data?.email);
      setPhone(userData?.data?.tel);
      setProfileImage(userData?.data?.avatar);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    searchData();
  }, []);

  const handleEditProfile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const newProfileImage = reader.result;
      setProfileImage(newProfileImage);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancelClick = () => {
    console.log(auth);
    setFirstName(auth?.user?.firstname);
    setName(auth?.user?.lastname);
    setEmail(auth?.user?.email);
    setPhone(auth?.user?.tel);
    setIsEditMode(false);
  };

  const handleSaveClick = async () => {
    if (
      firstname === "" ||
      name === "" ||
      email === "" ||
      phone === "" ||
      country === ""
    ) {
      showAlert("error", "Veuillez remplir tous les champs !");
    } else {
      try {
        const formData = new FormData();
        formData.append("firstname", firstname);
        formData.append("lastname", name);
        formData.append("email", email);
        formData.append("tel", phone);
        formData.append("affiliated_site", country);
        if (fileInputRef?.current?.files[0]) {
          formData.append("avatar", fileInputRef.current.files[0]);
        }

        const result = await editUser(formData);
        dispatch(signin(result.data));
        setIsEditMode(false);
        showAlert("success", "Votre profil a été sauvegardé avec succès !");
      } catch (err) {
        console.error(err);
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
    <>
      <h1 className="titreprofil">Mon Profil</h1>
      <div className="profile-form">
        <div className="profile-file">
          <img src={profileImage} alt="userprofile" className="profile-image" />
          {isEditMode ? (
            <>
              <img
                className="crayonimg"
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
            </>
          ) : (
            ""
          )}
        </div>
        <form className="formProfile">
          <div className="label-input">
            <label htmlFor="">Prénom</label>
            {isEditMode ? (
              <div>
                <input
                  className="profile-input"
                  type="text"
                  value={firstname}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  required
                />
              </div>
            ) : (
              <input
                className="profile-input"
                type="text"
                value={firstname}
                readOnly
              />
            )}
          </div>
          <div className="label-input">
            <label htmlFor="">Nom</label>
            {isEditMode ? (
              <div>
                <input
                  className="profile-input"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                />
              </div>
            ) : (
              <input
                className="profile-input"
                type="text"
                value={name}
                readOnly
              />
            )}
          </div>
          <div className="label-input">
            <label htmlFor="">Email</label>
            {isEditMode ? (
              <div>
                <input
                  className="profile-input"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>
            ) : (
              <input
                className="profile-input"
                type="email"
                value={email}
                readOnly
              />
            )}
          </div>
          <div className="label-input">
            <label htmlFor="">Téléphone</label>
            {isEditMode ? (
              <div>
                <input
                  className="profile-input"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  required
                />
              </div>
            ) : (
              <input
                className="profile-input"
                type="tel"
                value={phone}
                readOnly
              />
            )}
          </div>
          <div className="label-input">
            <label htmlFor="">Pays</label>
            {isEditMode ? (
              <div>
                <input
                  className="profile-input"
                  type="text"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                  required
                />
              </div>
            ) : (
              <input
                className="profile-input"
                type="text"
                value={country}
                readOnly
              />
            )}
          </div>
        </form>
      </div>
      {isEditMode ? (
        <div className="boutonAS">
          <button
            className="annuler"
            id="cancel-button"
            onClick={handleCancelClick}
          >
            Annuler
          </button>
          <button
            className="sauvegarder"
            id="save-button"
            onClick={handleSaveClick}
          >
            Sauvegarder
          </button>
        </div>
      ) : (
        <button className="editer" id="edit-button" onClick={handleEditClick}>
          Éditer
        </button>
      )}
      <div className="notifs">
        <p className="notifcourriel">Notifications par courriel</p>

        <div className="toggle-container">
          <input
            type="checkbox"
            id="notification-toggle"
            className="toggle-checkbox"
          />
          <label for="notification-toggle" className="toggle-label">
            <span className="toggle-inner"></span>

            <span className="toggle-switch"></span>
          </label>
        </div>
      </div>
    </>
  );
};

export default MonProfil;
