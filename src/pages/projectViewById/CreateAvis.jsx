import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAvis } from "../../services/avis";
import { createAvis } from "../../store/avis";
import CustomToast from "../../components/CustomToast/CustomToast";

export default function CreateAvis({ post }) {
  const [actif, setActif] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { showAlert } = CustomToast();

  const handleActif = () => {
    setActif(!actif);
  };
  const sendText = async () => {
    if (text === "") {
      showAlert("error", "Veuillez remplir tous les champs !");
    } else {
      try {
        const avisData = {
          user_id: auth.user.id,
          post_id: post.id,
          text: text,
        };
        const addNewAvis = await addAvis(avisData);
        const newDataAvis = {
          date: addNewAvis.data.date,
          firstname: addNewAvis.data.user[0].firstname,
          lastname: addNewAvis.data.user[0].lastname,
          photo: addNewAvis.data.user[0].avatar,
          user_id: auth.user.id,
          id: addNewAvis.data.addAvisByUser.id,
          post_id: post.id,
          text: text,
        };
        dispatch(createAvis(newDataAvis));
        setActif(false);
        setText("");
        showAlert("success", "Merci ! Votre avis a été ajouté avec succès !");
      } catch (err) {
        console.error("err", err);
        showAlert(
          "error",
          "Nous rencontrons un problème, en espérant très vite(.js) chez MAKESENSE !"
        );
      }
    }
  };
  return (
    <div className="createAvisButtons">
      <button
        type="button"
        onClick={handleActif}
        className={`${actif ? "annuler" : "sauvegarder"} pointer`}
      >
        {actif ? "Annuler" : "Ecrire un avis"}
      </button>
      {actif ? (
        <>
          <textarea
            className="createAvisText"
            type="
          text"
            placeholder="Rédigez votre avis ici."
            onChange={(e) => setText(e.target.value)}
            defaultValue={text}
          />
          <button
            type="button"
            className="sauvegarder pointer"
            onClick={sendText}
          >
            Envoyer
          </button>
        </>
      ) : null}
    </div>
  );
}
