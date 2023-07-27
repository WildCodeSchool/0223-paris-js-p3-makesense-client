import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAvis } from "../../services/avis";
import { createAvis } from "../../store/avis";

export default function CreateAvis({ post }) {
  const [actif, setActif] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const avis = useSelector((state) => state.avis);

  const handleActif = () => {
    setActif(!actif);
  };
  const sendText = async () => {
    try {
      const avisData = { user_id: auth.user.id, post_id: post.id, text: text };
      const addNewAvis = await addAvis(avisData);
      console.log("addNewAvis", addNewAvis);
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
    } catch (err) {
      console.error("err", err);
    }
  };
  return (
    <div className="createAvisButtons">
      <button
        type="button"
        onClick={handleActif}
        className={`${actif ? "annuler" : "sauvegarder"} pointer`}
      >
        {actif ? "Annuler" : "Ecrire un avis" }
      </button>
      {actif ? (
        <>
          <textarea
            className="createAvisText"
            type="text"
            placeholder="Rédigez votre avis ici."
            onChange={(e) => setText(e.target.value)}
            value={text}
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



// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addAvis } from "../../services/avis";
// import { createAvis } from "../../store/avis";

// export default function CreateAvis({ post }) {
//   const [actif, setActif] = useState(false);
//   const [text, setText] = useState("");
//   const dispatch = useDispatch();
//   const auth = useSelector((state) => state.auth);
//   const avis = useSelector((state) => state.avis);

//   const handleActif = () => {
//     setActif(!actif);
//   };

//   const sendText = async () => {
//     try {
//       const avisData = { user_id: auth.user.id, post_id: post.id, text: text };
//       const addNewAvis = await addAvis(avisData);
//       const newDataAvis = {
//         date: addNewAvis.data.date,
//         firstname: addNewAvis.data.user[0].firstname,
//         lastname: addNewAvis.data.user[0].lastname,
//         photo: addNewAvis.data.user[0].avatar,
//         user_id: auth.user.id,
//         id: addNewAvis.data.addAvisByUser.id,
//         post_id: post.id,
//         text: text,
//       };
//       dispatch(createAvis(newDataAvis));
//       setActif(false);
//       setText("");
//     } catch (err) {
//       console.error("err", err);
//     }
//   };

//   return (
//     <div className="createAvisButtons">
//       <button
//         type="button"
//         onClick={handleActif}
//         className={`${actif ? "annuler" : "sauvegarder"} pointer`}
//       >
//         {actif ? "Annuler" : "Ecrire un avis" }
//       </button>
//       {actif ? (
//         <>
//           <textarea
//             className="createAvisText"
//             type="text"
//             placeholder="Rédigez votre avis ici."
//             onChange={(e) => setText(e.target.value)}
//             value={text}
//           />
//           <button
//             type="button"
//             className="sauvegarder pointer"
//             onClick={sendText}
//           >
//             Envoyer
//           </button>
//         </>
//       ) : null}
//     </div>
//   );
// }
