import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Select from "react-select";
import CreationGuide from "../../CreationGuide/CreationGuide";

function TitleProject() {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const clickMe = () => {
    navigate("/descriptionproject");
  };

  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    }
  }, []);

  const options = [
    {
      value: "FRANCE",
      label: "FRANCE",
      icon: (
        <img
          src="../../src/assets/france.png"
          alt="France"
          className="custom_flag"
        />
      ),
    },
    {
      value: "ESPAGNE",
      label: "ESPAGNE",
      icon: (
        <img
          src="../../src/assets/espagne.png"
          alt="Espagne"
          className="custom_flag"
        />
      ),
    },
  ];

  const customStyles = {
    option: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
    singleValue: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
    control: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      backgroundColor: "rgba(217, 217, 217, 0.2)",
      fontFamily: "raleway",
    }),
  };

  //   function handleClicktitleproject() {
  //     navigate("/titleproject");
  //   }
  return (
    <>
      <div className="background_title_project">
        <div className="launch_project_containers">
          <h1 className="title_project">Titre du projet</h1>
          <input
            className="input_title_project"
            placeholder="Exemple : Du café gratuit pour tous !"
            color="white"
            type="text"
            id="name"
            name="name"
            required
            minlength="4"
            maxlength="128"
          />

          <div className="country_title_choise">
            <p className="title_css">Mon pays de résidence :</p>
          </div>
          <div className="selector_country">
            <Select
              options={options}
              styles={customStyles}
              components={{
                IndicatorSeparator: () => null,
              }}
              getOptionLabel={(option) => (
                <div className="icons_title">
                  {option.icon}
                  <span>{option.label}</span>
                </div>
              )}
              getOptionValue={(option) => option.value}
            />
          </div>

          <div className="button_launch_project">
            <button type="button" onClick={clickMe} className="launch_button">
              DEMARRER
            </button>
          </div>
        </div>
      </div>
      <CreationGuide />
    </>
  );
}

export default TitleProject;
