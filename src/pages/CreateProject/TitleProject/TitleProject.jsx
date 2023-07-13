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
      value: "FRANCE",
      label: "FRANCE",
      icon: <img src="../../src/assets/france.png" alt="France" className="custom-icon" />,
    },
    {
      value: "ESPAGNE",
      label: "ESPAGNE",
      icon: <img src="../../src/assets/espagne.png" alt="Espagne" className="custom-icon" />,
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
    }),
  };

  const [selectedOption, setSelectedOption] = useState(options[0]);

  //   function handleClicktitleproject() {
  //     navigate("/titleproject");
  //   }
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
              value={selectedOption}
              components={{
                IndicatorSeparator: () => null,}}

              getOptionLabel={(option) => (
                <div className="icons">
                  {option.icon}
                  <span>{option.label}</span>
                </div>
              )}
              onChange={(option) => setSelectedOption(option)}
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
