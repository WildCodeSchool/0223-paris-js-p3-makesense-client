import React from "react";
import { useState, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect } from "react";
import { editUser, getCurrentUser } from "../../services/users";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../../store/auth";

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
      const result = await editUser({
        firstname,
        lastname: name,
        email,
        tel: phone,
      });
      dispatch(signin(result.data));
    } catch (error) {
      console.error(error);
    }
    setIsEditMode(false);
  };

  const handleFirstNameChange = (e) => {
    const inputValue = e.target.value;
    const lettersOnlyRegex = /^[A-Za-z]+$/;

    if (inputValue.match(lettersOnlyRegex) || inputValue === "") {
      setFirstName(inputValue);
      setError("");
    } else {
      setError({
        ...error,
        firstname: "Le prénom ne doit contenir que des lettres.",
      });
    }
  };

  const handleLastNameChange = (e) => {
    const inputValue = e.target.value;
    const lettersOnlyRegex = /^[A-Za-z]+$/;

    if (inputValue.match(lettersOnlyRegex) || inputValue === "") {
      setName(inputValue);
      setError("");
    } else {
      setError({
        ...error,
        lastname: "Le nom ne doit contenir que des lettres.",
      });
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    const emailRegex = /@makesense\.org$/;

    if (emailValue.match(emailRegex) || emailValue === "") {
      setEmail(emailValue);
      setEmailError("");
    } else {
      setError({
        ...error,
        email: "L'email doit être au format '@makesense.org'",
      });
    }
  };

  const handlePhoneChange = (e) => {
    const phoneValue = e.target.value;
    const phoneRegex = /^\d{10}$/;

    if (phoneValue.match(phoneRegex) || phoneValue === "") {
      setPhone(phoneValue);
      setError("");
    } else {
      setError({
        ...error,
        tel: "Le pays ne doit contenir que des lettres.", // changer
      });
    }
  };

  const handleCountryChange = (e) => {
    const inputValue = e.target.value;
    const lettersOnlyRegex = /^[A-Za-z]+$/;

    if (inputValue.match(lettersOnlyRegex) || inputValue === "") {
      setCountry(inputValue);
      setError("");
    } else {
      setError({
        ...error,
        country: "Le pays ne doit contenir que des lettres.",
      });
    }
  };

  return (
    <>
      <h1 className="titreprofil">Mon Profil</h1>
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
        <div className="inputerror">
          {error.firstname && (
            <div className="error-message">{error.firstname}</div>
          )}
          {error.lastname && (
            <div className="error-message">
              <p>{error.lastname}</p>
            </div>
          )}
          {error.email && (
            <div className="error-message">
              <p>{error.email}</p>
            </div>
          )}
          {error.tel && (
            <div className="error-message">
              <p>{error.tel}</p>
            </div>
          )}
          {error.country && (
            <div className="error-message">{error.country}</div>
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleEmailChange(e);
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
