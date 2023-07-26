import React, { useState } from "react";
import { DecisionTiming } from "./decision_timing";
import { useDispatch, useSelector } from 'react-redux';
import { setDecisionDelay, setConflictDelay, setDecisionEndDelay } from '../../../store/projectSlice';
import { useNavigate } from "react-router-dom";

function SettingsProject() {
  const [data, setData] = useState({ makeDecisionDate : "", conflitDate : "", deadLineDate : "" })
  const { title, description, benefits, risks, image, impacted, expert, impactOrganisation } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMissing, setIsMissing] = useState(false)
  const handleClick = () => {
  //   const decisionDate = new Date( Date.now() + (6.048e+8 * data.makeDecisionDate) )
  // const confliDate =  new Date( Date.now() + (6.048e+8 * (data.conflitDate + data.makeDecisionDate )))
  // const deadDate = new Date( Date.now() + (6.048e+8 * (data.conflitDate + data.makeDecisionDate + data.deadLineDate)))
  // console.log("date1", decisionDate)
  // console.log("date2", confliDate)
  // console.log("date", deadDate)
    if ( data.makeDecisionDate === "" || data.conflictDate === "" || data.deadLineDate === "") {
      setIsMissing(true)
    } else {
      dispatch(setDecisionDelay(data.makeDecisionDate));
      dispatch(setConflictDelay(data.conflitDate));
      dispatch(setDecisionEndDelay(data.deadLineDate));
      navigate("/");
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
                      onClick={e => setData({ ...data, makeDecisionDate : (index+1)})}
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
                      onClick={e => setData({ ...data, conflitDate : (index+1)})}
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
                      onClick={e => setData({ ...data, deadLineDate : (index+1)})}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        {isMissing ?
      <p class="missingFields">* Veuillez remplir tous les champs pour continuer</p> :
      <div></div>
    }
        <div className="button_settings_project">
              <button type="button" className="launch_button next_button" >
                PRECEDENT
              </button>
              <button type="button"  onClick={handleClick} className="launch_button back_button">
                ENVOYER
              </button>
            </div>
      </div>
    </>
  );
}

export default SettingsProject;
