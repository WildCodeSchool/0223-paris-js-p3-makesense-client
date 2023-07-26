// import PropTypes from "prop-types";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import CreateAvis from "./CreateAvis";
// import { removeAvis } from "../../store/avis";
// import { deleteAvis, editAvis } from "../../services/avis";

// export default function ProjectAvis({ avis, post }) {
//   const [visibleModal, setvisibleModal] = useState(false);
//   const [errMessage, setErrMessage] = useState("");
//   const [avisId, setAvisId] = useState(0);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editedText, setEditedText] = useState("");

//   const dispatch = useDispatch();
//   const avisRedux = useSelector((state) => state.avis);
//   const auth = useSelector((state) => state.auth);

//   const handleClickDelete = (avis_id) => {
//     setvisibleModal(!visibleModal);
//     setAvisId(avis_id);
//   };

//   const handleInputChange = (e) => {
//     setEditedText(e.target.value);
//   };

//   const changeEDit = (text) => {};

//   const handleClickCancel = () => {
//     setvisibleModal(!visibleModal);
//     setAvisId(0);
//   };

//   const cancelEdit = (index, text) => {
//     setEditingIndex(index);
//     setEditedText(text);
//   };

//   const validEdit = async (id) => {
//     console.log("id", id);
//     // try {
//     //   await editAvis(id);
//     //   setEdit(false);
//     // } catch (err) {
//     //   console.error("err", err);
//     // }
//   };

//   const handleClickFetch = async () => {
//     try {
//       await deleteAvis(avisId);
//       dispatch(removeAvis(avisId));
//       setvisibleModal(!visibleModal);
//     } catch (err) {
//       console.error("err", err);
//       setErrMessage(
//         "Nous rencontrons un problème. Veuillez réessayer plus tard."
//       );
//     }
//   };

//   return (
//     <div id="container">
//       <CreateAvis post={post} />
//       <div className="avisContainer">
//         {avis.map((data, index) => (
//           <div className="avisByUser" key={data.date}>
//             {auth.user.admin === 1 || auth.user.id === data.user_id ? (
//               <>
//                 <span
//                   className="action_edit_admin_user"
//                   title="Modifier"
//                   onClick={() => changeEDit(index, data.text)}
//                 >
//                   &#x270E;
//                 </span>
//                 <span
//                   className="action_delete_admin_user"
//                   title="Supprimer"
//                   onClick={() => handleClickDelete(data.id)}
//                 >
//                   &#x2716;
//                 </span>
//               </>
//             ) : null}
//             <div className="userInfos">
//               <div className="userProjectInfos">
//                 <img
//                   src={data.photo}
//                   alt="profil utilisateur"
//                   className="avatarProject"
//                 />
//                 <p className="c-blue">
//                   <span className="c-blue ">
//                     {data.firstname} {data.lastname}
//                   </span>
//                   - le {data.date.slice(0, 10)}
//                 </p>
//               </div>
//             </div>
//             {editingIndex === index ? (
//               <>
//                 <input
//                   type="text"
//                   // onChange={(e) => setText(e.target.value)}
//                   onChange={(e) => handleInputChange(e)}
//                   value={text}
//                   className="c-blue avisByUserText"
//                 />
//                 <button
//                   type="button"
//                   className="createAvis"
//                   onClick={() => cancelEdit(data.text)}
//                 >
//                   Annuler
//                 </button>
//                 <button
//                   type="button"
//                   className="createAvis"
//                   onClick={() => validEdit(data.id)}
//                 >
//                   Confirmer
//                 </button>
//               </>
//             ) : (
//               <h1 className="c-blue avisByUserText">{data.text}</h1>
//             )}
//           </div>
//         ))}
//       </div>
//       {visibleModal ? (
//         <div id="modal_delete" className="modal">
//           <div className="modal_content">
//             {errMessage && <p className="p_error_modal">{errMessage}</p>}
//             <h2>Confirmation de suppression</h2>
//             <p>Voulez-vous vraiment cette avis ?</p>
//             <div className="modal_buttons">
//               <button type="button" id="btn_cancel" onClick={handleClickCancel}>
//                 Annuler
//               </button>
//               <button type="button" id="btn_confirm" onClick={handleClickFetch}>
//                 Confirmer
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// }

// ProjectAvis.propTypes = {
//   avis: PropTypes.shape({
//     firstname: PropTypes.string,
//     lastname: PropTypes.string,
//     photo: PropTypes.string,
//     text: PropTypes.string,
//     map: PropTypes.func,
//   }).isRequired,
// };

// import PropTypes from "prop-types";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import CreateAvis from "./CreateAvis";
// import { removeAvis, editAvisData } from "../../store/avis";
// import { deleteAvis, editAvis } from "../../services/avis";

// export default function ProjectAvis({ avis, post }) {
//   const [visibleModal, setvisibleModal] = useState(false);
//   const [errMessage, setErrMessage] = useState("");
//   const [avisId, setAvisId] = useState(0);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editedText, setEditedText] = useState("");

//   const dispatch = useDispatch();
//   const avisRedux = useSelector((state) => state.avis);
//   const auth = useSelector((state) => state.auth);

//   const handleClickDelete = (id_avis) => {
//     setvisibleModal(!visibleModal);
//     console.log("id_avis");
//     setAvisId(id_avis);
//   };

//   const handleInputChange = (e) => {
//     setEditedText(e.target.value);
//   };

//   const changeEdit = (index, text) => {
//     setEditingIndex(index);
//     setEditedText(text);
//   };

//   const handleClickCancel = () => {
//     setvisibleModal(!visibleModal);
//     setAvisId(0);
//   };

//   const cancelEdit = (index, text) => {
//     setEditingIndex(null);
//     setEditedText("");
//   };

//   const validEdit = async (id) => {
//     console.log("id", id);
//     try {
//       await editAvis(id, { text: editedText });
//       dispatch(editAvisData({ id, newText: editedText }));
//       setEditedText("");
//       setEditingIndex(null);
//     } catch (err) {
//       console.error("err", err);
//     }
//   };

//   const handleClickFetch = async () => {
//     try {
//       console.log("avisId", avisId);
//       await deleteAvis(avisId);
//       dispatch(removeAvis(avisId));
//       setvisibleModal(!visibleModal);
//     } catch (err) {
//       console.error("err", err);
//       setErrMessage(
//         "Nous rencontrons un problème. Veuillez réessayer plus tard."
//       );
//     }
//   };

//   return (
//     <div id="container">
//       <CreateAvis post={post} />
//       <div className="avisContainer">
//         {avis.map((data, index) => (
//           <div className="avisByUser" key={data.date}>
//             {auth.user.admin === 1 || auth.user.id === data.user_id ? (
//               <>
//                 <span
//                   className="action_edit_admin_user"
//                   title="Modifier"
//                   onClick={() => changeEdit(index, data.text)}
//                 >
//                   &#x270E;
//                 </span>
//                 <span
//                   className="action_delete_admin_user"
//                   title="Supprimer"
//                   onClick={() => handleClickDelete(data.id)}
//                 >
//                   &#x2716;
//                 </span>
//               </>
//             ) : null}
//             <div className="userInfos">
//               <div className="userProjectInfos">
//                 <img
//                   src={data.photo}
//                   alt="profil utilisateur"
//                   className="avatarProject"
//                 />
//                 <p className="c-blue">
//                   <span className="c-blue ">
//                     {data.firstname} {data.lastname}
//                   </span>
//                   - le {data.date.slice(0, 10)}
//                 </p>
//               </div>
//             </div>
//             {editingIndex === index ? (
//               <>
//                 <input
//                   type="text"
//                   onChange={handleInputChange}
//                   value={editedText}
//                   className="c-blue avisByUserText"
//                 />
//                 <button
//                   type="button"
//                   className="createAvis"
//                   onClick={() => cancelEdit(index, data.text)}
//                 >
//                   Annuler
//                 </button>
//                 <button
//                   type="button"
//                   className="createAvis"
//                   onClick={() => validEdit(data.id)}
//                 >
//                   Confirmer
//                 </button>
//               </>
//             ) : (
//               <h1
//                 className="c-blue avisByUserText"
//                 onClick={() => changeEdit(index, data.text)}
//               >
//                 {data.text}
//               </h1>
//             )}
//           </div>
//         ))}
//       </div>
//       {visibleModal ? (
//         <div id="modal_delete" className="modal">
//           <div className="modal_content">
//             {errMessage && <p className="p_error_modal">{errMessage}</p>}
//             <h2>Confirmation de suppression</h2>
//             <p>Voulez-vous vraiment cette avis ?</p>
//             <div className="modal_buttons">
//               <button type="button" id="btn_cancel" onClick={handleClickCancel}>
//                 Annuler
//               </button>
//               <button type="button" id="btn_confirm" onClick={handleClickFetch}>
//                 Confirmer
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// }

// ProjectAvis.propTypes = {
//   avis: PropTypes.arrayOf(
//     PropTypes.shape({
//       firstname: PropTypes.string,
//       lastname: PropTypes.string,
//       photo: PropTypes.string,
//       text: PropTypes.string,
//     })
//   ).isRequired,
// };

import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateAvis from "./CreateAvis";
import { removeAvis, editAvisData } from "../../store/avis";
import { deleteAvis, editAvis } from "../../services/avis";

export default function ProjectAvis({ avis, post }) {
  const [visibleModal, setvisibleModal] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [avisId, setAvisId] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  const dispatch = useDispatch();
  const avisRedux = useSelector((state) => state.avis);
  const auth = useSelector((state) => state.auth);

  const handleClickDelete = (avisToDelete) => {
    setvisibleModal(!visibleModal);
    setAvisId(avisToDelete.id);
  };

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

  const changeEdit = (index, text) => {
    setEditingIndex(index);
    setEditedText(text);
  };

  const handleClickCancel = () => {
    setvisibleModal(!visibleModal);
    setAvisId(0);
  };

  const cancelEdit = (index, text) => {
    setEditingIndex(null);
    setEditedText("");
  };

  const validEdit = async (id) => {
    console.log("id", id);
    try {
      await editAvis(id, { text: editedText });
      dispatch(editAvisData({ id, newText: editedText }));
      setEditedText("");
      setEditingIndex(null);
    } catch (err) {
      console.error("err", err);
    }
  };

  const handleClickFetch = async () => {
    try {
      // Vérifier si l'avis à supprimer existe toujours dans le state Redux
      const avisToDelete = avisRedux.find((avis) => avis.id === avisId);
      if (avisToDelete) {
        await deleteAvis(avisId);
        dispatch(removeAvis(avisId));
      }
      setvisibleModal(!visibleModal);
    } catch (err) {
      console.error("err", err);
      setErrMessage(
        "Nous rencontrons un problème. Veuillez réessayer plus tard."
      );
    }
  };

  return (
    <div id="container">
      <CreateAvis post={post} />
      <div className="avisContainer">
        {avis.map((data, index) => (
          <div className="avisByUser" key={data.date}>
            {auth.user.admin === 1 || auth.user.id === data.user_id ? (
              <>
                <span
                  className="action_edit_admin_user"
                  title="Modifier"
                  onClick={() => changeEdit(index, data.text)}
                >
                  &#x270E;
                </span>
                <span
                  className="action_delete_admin_user"
                  title="Supprimer"
                  onClick={() => handleClickDelete(data)}
                >
                  &#x2716;
                </span>
              </>
            ) : null}
            <div className="userInfos">
              <div className="userProjectInfos">
                <img
                  src={data.photo}
                  alt="profil utilisateur"
                  className="avatarProject"
                />
                <p className="c-blue">
                  <span className="c-blue ">
                    {data.firstname} {data.lastname}
                  </span>
                  - le {data.date.slice(0, 10)}
                </p>
              </div>
            </div>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  onChange={handleInputChange}
                  value={editedText}
                  className="c-blue avisByUserText"
                />
                <button
                  type="button"
                  className="createAvis"
                  onClick={() => cancelEdit(index, data.text)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="createAvis"
                  onClick={() => validEdit(data.id)}
                >
                  Confirmer
                </button>
              </>
            ) : (
              <h1
                className="c-blue avisByUserText"
                onClick={() => changeEdit(index, data.text)}
              >
                {data.text}
              </h1>
            )}
          </div>
        ))}
      </div>
      {visibleModal ? (
        <div id="modal_delete" className="modal">
          <div className="modal_content">
            {errMessage && <p className="p_error_modal">{errMessage}</p>}
            <h2>Confirmation de suppression</h2>
            <p>Voulez-vous vraiment cette avis ?</p>
            <div className="modal_buttons">
              <button type="button" id="btn_cancel" onClick={handleClickCancel}>
                Annuler
              </button>
              <button type="button" id="btn_confirm" onClick={handleClickFetch}>
                Confirmer
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
