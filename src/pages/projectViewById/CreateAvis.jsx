import { useState } from "react";
import { addAvis } from "../../services/avis";
import { useSelector, useDispatch } from "react-redux";
import {createAvis} from "../../store/avis"
import React from "react";

export default function CreateAvis({ post, text , setText }) {
  const [actif, setActif] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const avis = useSelector((state) => state.avis);

  const handleActif = () => {
    setActif(!actif);
};
const sendText = async ( ) => {
    
    try {
        const avisData = {user_id: auth.user.id, post_id: post.id, text: text }
        const addNewAvis = await addAvis(avisData)
        const newDataAvis = { date: addNewAvis.data.date, firstname: addNewAvis.data.user[0].firstname, lastname:addNewAvis.data.user[0].lastname, photo: addNewAvis.data.user[0].avatar, user_id: auth.user.id, id: addNewAvis.data.addAlertByUser.id, post_id: post.id, text: text }
        dispatch(createAvis(newDataAvis))
        setActif(false)
        setText("")
    } catch (err) {
        console.error("err", err);
    }
  }
  return (
    <div>
      <button type="button" onClick={handleActif} className="createAvis">
        create
      </button>
      {actif ? (
        <>
          <input
            className="createAvisText"
            type="
          text"
            placeholder="Rédigez votre avis ici."
            onChange={(e) => setText(e.target.value)}
            defaultValue={text}
          ></input>
          <button type="button" className="createAvis" onClick={sendText}>Envoyer</button>
        </>
      ) : null}
    </div>
  );
}
