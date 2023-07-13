import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Select from "react-select";

function TitleProject() {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const clickMe = () => {};

  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    }
  }, []);

  const options = [
    {
      value: "france",
      label: "France",
      icon: (
        <img
          src="../../src/assets/france.png"
          alt="France"
          className="custom-icon"
        />
      ),
    },
    {
      value: "espagne",
      label: "Espagne",
      icon: (
        <img
          src="../../src/assets/espagne.png"
          alt="Espagne"
          className="custom-icon"
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
    }),
  };

  return (
    <>
      <div className="background-project">
        <div className="launch_project_containers">
          <h1 className="title_project">Titre du projet</h1>
          <input
            className="input_title_project"
            type="text"
            id="name"
            name="name"
            required
            minlength="4"
            maxlength="128"
          />
          <div>
            <Select
              options={options}
              styles={customStyles}
              getOptionLabel={(option) => (
                <div>
                  {option.icon}
                  <span>{option.label}</span>
                </div>
              )}
              getOptionValue={(option) => option.value}
            />
          </div>
        </div>
        <div className="button">
          <button type="button" onClick={clickMe} className="launch_button">
            DEMARRER
          </button>
        </div>
      </div>
    </>
  );
}

export default TitleProject;
