import React, { useEffect, useState } from "react";
import FormPost from "../../../components/FormPost/FormPost";
import Select from "react-select";
import { getAllUsers } from "../../../services/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setExpertImpacted,
  setImpactOrganisation,
} from "../../../store/projectSlice";
import CustomToast from "../../../components/CustomToast/CustomToast";

function ImpactProject() {
  const [data, setdata] = useState([]);
  const [dataImpacted, setDataImpacted] = useState([]);
  const [dataExpert, setDataExpert] = useState([]);
  const [impact, setImpact] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const projectRedux = useSelector((state) => state.project);
  const { showAlert } = CustomToast();

  const handleclickPrecedent = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/descriptionproject");
  };

  const handleInputChange = (e) => {
    setImpact(e);
  };
  const searchData = async () => {
    try {
      const userData = await getAllUsers();
      const listUser = userData.data;
      for (let i = 0; i < listUser.length; i++) {
        (listUser[i].label = (
          <div>
            <img
              className="selectorImg"
              src={listUser[i].avatar}
              alt="Image 1"
            />
            <span className="selectorSpan">
              {listUser[i].firstname} {listUser[i].lastname}
            </span>
          </div>
        )),
          (listUser[
            i
          ].value = `${listUser[i].firstname} ${listUser[i].lastname}`);
        listUser[i].avatar = `${listUser[i].avatar}`;
      }
      setdata(listUser);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    searchData();
    setImpact(projectRedux.impactOrganisation);
  }, []);

  useEffect(() => {
    const newDataExpert = [];
    const newDataImpacted = [];

    if (projectRedux?.expertImpacted !== "") {
      for (let i = 0; i < projectRedux.expertImpacted.length; i++) {
        const element = projectRedux.expertImpacted[i];
        const targetId = element.user_id;
        const objDataUser = data.find((item) => item.id === targetId);

        if (element.expert && !newDataExpert.includes(objDataUser)) {
          newDataExpert.push(objDataUser);
        }
        if (element.impacted && !newDataImpacted.includes(objDataUser)) {
          newDataImpacted.push(objDataUser);
        }
      }
    }

    setDataExpert(newDataExpert);
    setDataImpacted(newDataImpacted);
  }, [data]);

  const handleUserSelectInpact = (setSelectedOptions) => {
    setDataImpacted(setSelectedOptions);
  };
  const handleUserSelectExpert = (setSelectedOptions) => {
    setDataExpert(setSelectedOptions);
  };
  const handleclick = () => {
    if (dataImpacted.length === 0 || dataExpert.length === 0 || impact === "") {
      showAlert("error", "Veuillez remplir tous les champs pour continuer ! ");
    } else {
      dispatch(setImpactOrganisation(impact));
      navigate("/settingsproject");
      window.scrollTo({ top: 0, behavior: "smooth" });
      const tabData = [];
      for (let i = 0; i < dataImpacted.length; i++) {
        tabData.push({
          post_id: null,
          user_id: dataImpacted[i].id,
          expert: false,
          impacted: true,
        });
      }
      for (let i = 0; i < dataExpert.length; i++) {
        let hasImpact = tabData.some((obj) => obj.user_id === dataExpert[i].id);
        if (!hasImpact) {
          tabData.push({
            post_id: null,
            user_id: dataExpert[i].id,
            expert: true,
            impacted: false,
          });
        } else {
          const index = tabData.findIndex(
            (obj) => obj.user_id === dataExpert[i].id
          );
          tabData[index].expert = true;
        }
      }
      dispatch(setExpertImpacted(tabData));
    }
  };
  return (
    <>
      <div className="header">
        <h1 className="headerTitle">Mon projet</h1>
        <ul>
          <li className="notCurrentLi">Description</li>
          <img src="src/assets/Arrow01.png" alt="arrow"></img>
          <li className="currentLi">Impacts</li>
          <img src="src/assets/Arrow01.png" alt="arrow"></img>
          <li className="notCurrentLi">Réglages</li>
        </ul>
      </div>
      <article>
        <div className="articleText">
          <h2 className="c-blue">Son Impact</h2>
          <p className="c-blue">
            Votre projet peut avoir une influence sur de multiples profils
            d'invividu, il est temps de définir lesquels et pourquoi.
          </p>
        </div>
        <hr />
      </article>
      <div className="selector">
        <p className="c-blue">Personnes impactées</p>
        <Select
          options={data}
          onChange={handleUserSelectInpact}
          value={dataImpacted}
          isMulti
        />
      </div>
      <div className="selector">
        <p className="c-blue">Personnes expertes</p>
        <Select
          options={data}
          onChange={handleUserSelectExpert}
          value={dataExpert}
          isMulti
        />
      </div>
      <div className="editor-container">
        <p className="c-blue">Impact sur l'organisation</p>
        <FormPost value={impact} onChange={(e) => handleInputChange(e)} />
      </div>
      <div className="nextPreviousButtons">
        <button className="blueButtonMulti" onClick={handleclickPrecedent}>
          PRECEDENT
        </button>
        <button className="blueButtonMulti" onClick={handleclick}>
          SUIVANT
        </button>
      </div>
    </>
  );
}
export default ImpactProject;
