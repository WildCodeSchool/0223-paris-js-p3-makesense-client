import React, { useState } from 'react';
import ImageUpload from "../../../components/ImageUpload/imageUpload"
import FormPost from "../../../components/FormPost/FormPost"

function DescriptionProject() {
    return (
        <>
        <div className="header">
            <h1 className="headerTitle">Mon projet</h1>
            <ul>
            <li className="currentLi">Description</li>
            <img src="src/assets/Arrow01.png" alt="arrow"></img>
            <li className="notCurrentLi">Impacts</li>
            <img src="src/assets/Arrow01.png" alt="arrow"></img>
            <li className="notCurrentLi">Réglages</li>
        </ul>
        </div>
        <article>
        <div className="articleText">
          <h2 className="c-blue">La description</h2>
          <p className="c-blue">
            C'est le moment d'être créatif. Parlez 
            de votre mission, donnez le plus de 
            détails possible, des jalons que vous avez déjà atteints.
          </p>
        </div>
        <hr />
      </article>
      <div className="bloc-image">
      <p className="c-blue">Commençons par une image</p>
      <ImageUpload/>
      </div>
      <div className="editor-container">
      </div>
      <FormPost/>
        </>
    );
}

export default DescriptionProject;