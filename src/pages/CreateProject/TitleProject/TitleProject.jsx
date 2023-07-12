import { useNavigate } from "react-router-dom";


function TitleProject() {
  const clickMe = () => {
  };

  const navigate = useNavigate();

//   function handleClicktitleproject() {
//     navigate("/titleproject");
//   }
  return (
    <>
    <div className="toto">
      <h1 className="title_project">Titre du projet</h1>
      <input className="input_title_project" type="text" id="name" name="name" required
       minlength="4" maxlength="128"/>
  
      <p className="title_select_country">
        Mon pays de residence
      </p>
      <button type="button" onClick={clickMe} className="launch_button">
          DEMARRER
        </button>
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
