import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../../components/ImageUpload/imageUpload";
import FormPost from "../../../components/FormPost/FormPost";
import { useDispatch, useSelector } from "react-redux";
import {
  setDescription,
  setImage,
  setBenefits,
  setRisks,
} from "../../../store/projectSlice";

function DescriptionProject() {
  const [data, setData] = useState({
    avatar: "",
    description: "",
    impact: "",
    profit: "",
    risk: "",
  });

  const auth = useSelector((state) => state.auth);
  const projectRedux = useSelector((state) => state.project);

  const handleclickPrecedent = () => {
    navigate("/titleproject");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInputChange = (filename, value) => {
    setData((prevState) => ({
      ...prevState,
      [filename]: value,
    }));

    if (filename === "avatar" && value instanceof File) {
      const reader = new FileReader();
      reader.onload = (event) => {
        dispatch(setImage(event.target.result));
      };
      reader.readAsDataURL(value);
    }
  };

  const dispatch = useDispatch();
  const [isMissing, setIsMissing] = useState(false);
  const navigate = useNavigate();

  const handleNextClick = () => {
    if (
      data.description === "" ||
      data.profit === "" ||
      data.risk === "" ||
      data.avatar === ""
    ) {
      setIsMissing(true);
    } else {
      dispatch(setDescription(data.description));
      dispatch(setImage(data.avatar));
      dispatch(setBenefits(data.profit));
      dispatch(setRisks(data.risk));
      navigate("/impactproject");

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    }
    console.log("projectRedux", projectRedux);
    handleInputChange("avatar", projectRedux.image);
    handleInputChange("description", projectRedux.description);
    handleInputChange("profit", projectRedux.benefits);
    handleInputChange("risk", projectRedux.risks);
  }, []);

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
            C'est le moment d'être créatif. Parlez de votre mission, donnez le
            plus de détails possible, des jalons que vous avez déjà atteints.
          </p>
        </div>
        <hr />
      </article>
      <div className="bloc-image">
        <p className="c-blue">Commençons par une image</p>
        <ImageUpload
          imageFromRedux={projectRedux.image}
          onChange={(value) => handleInputChange("avatar", value)}
        />
      </div>
      <div className="editor-container">
        <p className="c-blue">Description du projet</p>
        <FormPost
          value={data.description}
          onChange={(value) => handleInputChange("description", value)}
        />
      </div>
      <div className="editor-container">
        <p className="c-blue">Les bénéfices</p>
        <FormPost
          value={data.profit}
          onChange={(value) => handleInputChange("profit", value)}
        />
      </div>
      <div className="editor-container">
        <p className="c-blue">Les risques</p>
        <FormPost
          value={data.risk}
          onChange={(value) => handleInputChange("risk", value)}
        />
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
          className="blueButtonMultiDescription"
          onClick={handleclickPrecedent}
        >
          PRECEDENT
        </button>
        <button
          className="blueButtonMultiDescription"
          onClick={handleNextClick}
        >
          SUIVANT
        </button>
      </div>
    </>
  );
}
export default DescriptionProject;
