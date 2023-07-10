import React from "react";
import { useState, useRef } from "react";

function Monprofil() {
  const [profileImage, setProfileImage] = useState(
    "../../src/assets/default_user.png"
  );
  const fileInputRef = useRef(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [firstName, setFirstName] = useState("Marc");
  const [name, setName] = useState("Lagarde");
  const [email, setEmail] = useState("marclagarde@makesense.org");
  const [phone, setPhone] = useState("1234567890");
  const [country, setCountry] = useState("France");

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
    setIsEditMode(false);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);

    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/api/users/:id`, {
        firstname,
        lastname,
        email,
        tel,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Modifications enregistrées avec succès.");
        } else {
          console.error("Erreur lors de la sauvegarde des modifications.");
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la communication avec le serveur.",
          error
        );
      });
  };

  return (
    <>
      <h1>Mon Profil</h1>
      <div>
        <img src={profileImage} alt="userprofile" className="profile-image" />
        <img
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
        <label htmlFor="">Prénom</label>
        {isEditMode ? (
          <input
            className="profile-input"
            placeholder="Marc"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        ) : (
          <input
            className="profile-input"
            type="text"
            value={firstName}
            readOnly
          />
        )}

        <label htmlFor="">Nom</label>
        {isEditMode ? (
          <input
            className="profile-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        ) : (
          <input className="profile-input" type="text" value={name} readOnly />
        )}

        <label htmlFor="">Courriel</label>
        {isEditMode ? (
          <input
            className="profile-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        ) : (
          <input
            className="profile-input"
            type="email"
            value={email}
            readOnly
          />
        )}
        <label htmlFor="">Téléphone</label>
        {isEditMode ? (
          <input
            className="profile-input"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        ) : (
          <input className="profile-input" type="tel" value={phone} readOnly />
        )}

        <label htmlFor="">Pays</label>
        {isEditMode ? (
          <input
            className="profile-input"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        ) : (
          <input
            className="profile-input"
            type="text"
            value={country}
            readOnly
          />
        )}

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
      </form>

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
    </>
  );
}

export default Monprofil;
