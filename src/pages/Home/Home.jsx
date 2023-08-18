import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProjectViewHome from "../../components/ProjectViewHome";
import CustomToast from "../../components/CustomToast/CustomToast";

export default function Home() {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { showAlert } = CustomToast();

  const clickMe = () => {};

  useEffect(() => {
    const userlogin = localStorage.getItem("userlogin");
    const createPost = localStorage.getItem("createPost");
    if (userlogin === "true") {
      showAlert("success", "Vous êtes maintenant connecté !");
      localStorage.removeItem("userlogin");
    } else if (createPost === "true") {
      showAlert(
        "success",
        "Votre proposition de création de projet a été ajoutée avec succès."
      );
      localStorage.removeItem("createPost");
    }
  }, [showAlert]);

  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    }
  }, []);

  function handleClickGuide() {
    navigate("/Guide");
  }

  function handleClickTitleproject() {
    navigate("/titleproject");
  }

  return (
    <>
      <section id="home">
        <h1 className="c-white">
          <span className="c-yellow ">Donner vie </span> <br />
          aux bonnes idées
        </h1>
        <p className="c-white">
          Parce que nous croyons en celles et ceux qui agissent. Makesense vous
          accompagne dans vos projets.
        </p>
        <div className="homeInputs">
          <a href="#projectView" onClick={clickMe} className="button-bg-orange">
            décourvrir les projets
          </a>
          <button
            type="button"
            onClick={handleClickTitleproject}
            className="button-bg-a0"
          >
            lancer mon projet
          </button>
          <button
            type="button"
            onClick={handleClickGuide}
            className="button-bg-a0"
          >
            comment se lancer ?
          </button>
        </div>
      </section>
      <ProjectViewHome />
    </>
  );
}
