import React, { useState } from "react";
import { DecisionTiming } from "./decision_timing";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../../services/post";
import { addUserParticipant } from "../../../services/post";
import {
  setDecisionDelay,
  setConflictDelay,
  setDecisionEndDelay,
} from "../../../store/projectSlice";

function SettingsProject() {
  const [decisiondata, setDecisionData] = useState({
    makeDecisionDate: "",
    conflitDate: "",
    deadLineDate: "",
  });

  const {
    title,
    description,
    benefits,
    risks,
    image,
    expertImpacted,
    impactOrganisation,
    country,
  } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMissing, setIsMissing] = useState(false);
  const handleclickPrecedent = () => {
    navigate("/impactproject");
  };
  const handleClick = async () => {
    const decisionDate = new Date(
      Date.now() + 6.048e8 * decisiondata.makeDecisionDate
    );
    const confliDate = new Date(
      Date.now() +
        6.048e8 * (decisiondata.conflitDate + decisiondata.makeDecisionDate)
    );
    const deadDate = new Date(
      Date.now() +
        6.048e8 *
          (decisiondata.conflitDate +
            decisiondata.makeDecisionDate +
            decisiondata.deadLineDate)
    );
    dispatch(setDecisionDelay(decisionDate));
    dispatch(setConflictDelay(confliDate));
    dispatch(setDecisionEndDelay(deadDate));
    if (
      decisiondata.makeDecisionDate === "" ||
      decisiondata.conflitDate === "" ||
      decisiondata.deadLineDate === ""
    ) {
      setIsMissing(true);
    } else {
      try {
        let data = {
          title: title,
          description: description,
          profit: benefits,
          risk: risks,
          avatar: image,
          impact: impactOrganisation,
          deadlineDate: deadDate,
          makeDecisionDate: decisionDate,
          conflitDate: confliDate,
          location: country.value,
        };
        const form = new FormData();
        for (const key in data) {
          form.append(key, data[key]);
        }

        const dataCreatePost = await createPost(form);
        const newTab = expertImpacted.map((obj) => ({
          ...obj,
          post_id: dataCreatePost.data.id,
        }));

        let userdata = { users: newTab };
        await addUserParticipant(userdata);
        navigate("/");
      } catch (err) {
        console.log("err", err);
      }
    }
  };
  return (
    <>
      <div className="header">
        <h1 className="headerTitle">Mon projet</h1>
        <ul>
          <li className="notCurrentLi">Description</li>
          <img src="src/assets/Arrow01.png" alt="arrow"></img>
          <li className="notCurrentLi">Impacts</li>
          <img src="src/assets/Arrow01.png" alt="arrow"></img>
          <li className="currentLi">Réglages</li>
        </ul>
      </div>
      <article>
        <div className="articleText">
          <h2 className="c-blue">Réglages</h2>
          <p className="c-blue">
            Pour terminer, il vous faut définir le temps aloué à chaque étape de
            votre projet. Prenez votre temps
          </p>
        </div>
        <hr />
      </article>
      <h1 className="require">Les champs avec * sont obligatoire</h1>
      <div className="checkbox">
        <h2 className="title_section">Combien de semaine pour :</h2>
        <div className="column">
          <h2 className="decision_timing_title">La prise de décisions *</h2>
          <ul className="decision">
            {DecisionTiming.map(({ number }, index) => {
              return (
                <li key={index}>
                  <div className="button_checkbox">
                    <div className="checkbox_css">
                      <p>{number}</p>
                    </div>
                    <input
                      type="radio"
                      id={`custom-checkbox-${index}`}
                      name="decisionPrise"
                      value={number.number}
                      onClick={(e) =>
                        setDecisionData({
                          ...decisiondata,
                          makeDecisionDate: index + 1,
                        })
                      }
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="column_input">
          <h2 className="decision_timing_title">Le conflit *</h2>
          <ul className="decision">
            {DecisionTiming.map(({ number }, index) => {
              return (
                <li key={index}>
                  <div className="button_checkbox">
                    <div className="checkbox_css">
                      <p>{number}</p>
                    </div>
                    <input
                      type="radio"
                      id={`custom-checkbox-${index}`}
                      name="decisionConflit"
                      value={number.number}
                      onClick={(e) =>
                        setDecisionData({
                          ...decisiondata,
                          conflitDate: index + 1,
                        })
                      }
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="column">
          <h2 className="decision_timing_title">Décision définitive*</h2>
          <ul className="decision">
            {DecisionTiming.map(({ number }, index) => {
              return (
                <li key={index}>
                  <div className="button_checkbox">
                    <div className="checkbox_css">
                      <p>{number}</p>
                    </div>
                    <input
                      type="radio"
                      id={`custom-checkbox-${index}`}
                      name="decisionDefinitive"
                      value={number.number}
                      onClick={(e) =>
                        setDecisionData({
                          ...decisiondata,
                          deadLineDate: index + 1,
                        })
                      }
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        {isMissing ? (
          <p class="missingFields">
            * Veuillez remplir tous les champs pour continuer
          </p>
        ) : (
          <div></div>
        )}
        <div className="nextPreviousButtons">
          <button
            type="button"
            className="blueButtonMulti"
            onClick={handleclickPrecedent}
          >
            PRECEDENT
          </button>
          <button
            type="button"
            onClick={handleClick}
            className="blueButtonMulti"
          >
            ENVOYER
          </button>
        </div>
      </div>
    </>
  );
}

export default SettingsProject;
