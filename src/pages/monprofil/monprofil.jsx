import React from "react";
import { useState, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect } from "react";
import { editUser, getCurrentUser } from "../../services/users";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../../store/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MonProfil = () => {
  const [profileImage, setProfileImage] = useState(
    "../../src/assets/default_user.png"
  );
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [isEditMode, setIsEditMode] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("France");
  const [error, setError] = useState({
    firstname: "",
    lastname: "",
    email: "",
    tel: "",
    country: "",
  });

  useEffect(() => {
    console.log(auth);
    setFirstName(auth?.user?.firstname);
    setName(auth?.user?.lastname);
    setEmail(auth?.user?.email);
    setPhone(auth?.user?.tel);
    setProfileImage(auth?.user?.avatar);
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
    try {
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", name);
      formData.append("email", email);
      formData.append("tel", phone);
      formData.append("affiliated_site", country);
      formData.append("avatar", fileInputRef.current.files[0]);

      const result = await editUser(formData);
      dispatch(signin(result.data));
    } catch (error) {
      console.error(error);
    }
    setIsEditMode(false);
  };

  const handleFirstNameChange = (e) => {
    const inputValue = e.target.value;
    const lettersAndSpacesOnlyRegex = /^[-,a-zA-ZÀ-ÿ ']*$/;

    if (inputValue.match(lettersAndSpacesOnlyRegex) || inputValue === "") {
      setFirstName(inputValue);
      setError("");
    } else {
      toast.error("Le prénom ne doit contenir que des lettres !", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleLastNameChange = (e) => {
    const phoneValue = e.target.value;
    const cleanedPhoneValue = phoneValue.replace(/\s/g, "");
    const phoneRegex = /^\d{10}$/;

    if (cleanedPhoneValue.match(phoneRegex) || cleanedPhoneValue === "") {
      const formattedPhoneValue = cleanedPhoneValue.replace(
        /(\d{2})(?=\d)/g,
        "$1 "
      );
      setPhone(formattedPhoneValue);
      setError("");
    } else {
      toast.error("Le nom ne doit contenir que des lettres !", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handlePhoneChange = (e) => {
    const phoneValue = e.target.value;
    const cleanedPhoneValue = phoneValue.replace(/\s/g, "");
    const phoneRegex = /^\d{10}$/;

    if (cleanedPhoneValue.match(phoneRegex) || cleanedPhoneValue === "") {
      const formattedPhoneValue = cleanedPhoneValue.replace(
        /(\d{2})(?=\d)/g,
        "$1 "
      );
      setPhone(formattedPhoneValue);
      setError("");
    } else {
      toast.error(
        "Le numéro de téléphone ne doit comporter que des chiffres !",
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  };

  const handleCountryChange = (e) => {
    const inputValue = e.target.value;
    const lettersAndSpacesOnlyRegex = /^[A-Za-z\s]*$/;

    if (inputValue.match(lettersAndSpacesOnlyRegex) || inputValue === "") {
      setCountry(inputValue);
      setError("");
    } else {
      toast.error("Le pays ne doit contenir que des lettres !", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <h1 className="titreprofil">Mon Profil</h1>
      <ToastContainer />
      <div className="profile-form">
        <div className="profile-file">
          <img src={profileImage} alt="userprofile" className="profile-image" />
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
                    handleFirstNameChange(e);
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
                    handleLastNameChange(e);
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
                  readOnly
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
                    handlePhoneChange(e);
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
                    handleCountryChange(e);
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
