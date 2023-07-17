import React, { useState } from "react";
import { DecisionTiming } from "./decision_timing";

function SettingsProject() {
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
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="column">
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
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="button">
              <button type="button" className="launch_button next_button" >
                PRECEDENT
              </button>
              <button type="button" className="launch_button back_button">
                ENVOYER
              </button>
            </div>
      </div>
    </>
  );
}

export default SettingsProject;
