// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { removeUser } from "../../store/users";
// import { deleteUtilisateur } from "../../services/users";
// import { Link } from "react-router-dom";
// import CustomToast from "../CustomToast/CustomToast";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function UserCard({ user, edit, onSuccessDelete }) {
//   const dispatch = useDispatch();
//   const { showAlert } = CustomToast();
//   const [visibleModal, setvisibleModal] = useState(false);

//   const handleClickDelete = () => {
//     setvisibleModal(!visibleModal);
//   };

//   const handleClickCancel = () => {
//     setvisibleModal(!visibleModal);
//   };

//   const handleClickFetch = async () => {
//     try {
//       await deleteUtilisateur(user.id);
//       dispatch(removeUser(user.id));
//       setvisibleModal(!visibleModal);
//       onSuccessDelete();
//     } catch (err) {
//       console.log("err", err);
//       showAlert(
//         "error",
//         "Nous rencontrons un problème, en espérant très vite(.js) chez MAKESENSE !"
//       );
//     }
//   };

//   return (
//     <div className="card_admin_user">
//       {user?.admin === 1 ? (
//         <div className="admin_badge_admin_user">Adminstrateur</div>
//       ) : (
//         <div className="user_badge_admin_user">Utilisateur</div>
//       )}
//       <div className="avatar_container_admin_user">
//         <img
//           src={user?.avatar}
//           alt={`Image de ${user?.firstname} ${user?.lastname}`}
//           className="avatar_admin_user"
//         />
//       </div>
//       <div className="info_admin_user">
//         <h3 className="name_admin_user">
//           {user?.firstname} {user?.lastname}
//         </h3>
//         <div>
//           <p className="email_admin_user">Email: {user?.email}</p>
//           <p className="phone_admin_user">
//             Tel: {user?.tel ? user?.tel : "Aucune Information"}
//           </p>
//           <p className="country_admin_user">
//             Pays:{" "}
//             {user?.affiliated_site
//               ? user?.affiliated_site
//               : "Aucune Information"}
//           </p>
//         </div>
//         <div>
//           <p className="job_admin_user">
//             <span className="tag_job_admin_user">{user?.job}</span>
//           </p>
//           <p className="role_admin_user">
//             <span className="tag_role_admin_user">{user?.role}</span>
//           </p>
//         </div>
//       </div>
//       {edit ? (
//         <div className="card_actions_admin_user">
//           <Link to={`/admin/users/${user.id}`}>
//             <span className="action_edit_admin_user" title="Modifier">
//               &#x270E;
//             </span>
//           </Link>
//           <span
//             className="action_delete_admin_user"
//             title="Supprimer"
//             onClick={(e) => handleClickDelete()}
//           >
//             &#x2716;
//           </span>
//         </div>
//       ) : (
//         ""
//       )}
//       {visibleModal ? (
//         <div id="modal_delete" class="modal">
//           <ToastContainer />
//           <div class="modal_content">
//             <h2>Confirmation de suppression</h2>
//             <p>
//               Voulez-vous vraiment supprimer l'utilisateur : {user?.firstname}{" "}
//               {user?.lastname} ?
//             </p>
//             <div class="modal_buttons">
//               <button id="btn_cancel" onClick={handleClickCancel}>
//                 Annuler
//               </button>
//               <button id="btn_confirm" onClick={handleClickFetch}>
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

// export default UserCard;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/users";
import { deleteUtilisateur } from "../../services/users";
import { Link } from "react-router-dom";
import CustomToast from "../CustomToast/CustomToast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserCard({ user, edit, onSuccessDelete, searchTerm }) {
  const dispatch = useDispatch();
  const { showAlert } = CustomToast();
  const [visibleModal, setvisibleModal] = useState(false);

  const handleClickDelete = () => {
    setvisibleModal(!visibleModal);
  };

  const handleClickCancel = () => {
    setvisibleModal(!visibleModal);
  };

  const handleClickFetch = async () => {
    try {
      await deleteUtilisateur(user.id);
      dispatch(removeUser(user.id));
      setvisibleModal(!visibleModal);
      onSuccessDelete();
    } catch (err) {
      console.log("err", err);
      showAlert(
        "error",
        "Nous rencontrons un problème, en espérant très vite (.js) chez MAKESENSE !"
      );
    }
  };

  const removeDiacritics = (text) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const highlightText = (text) => {
    if (searchTerm) {
      const searchTermWithoutDiacritics = removeDiacritics(
        searchTerm.toLowerCase()
      );
      const textWithoutDiacritics = removeDiacritics(text);

      const regex = new RegExp(`(${searchTermWithoutDiacritics})`, "gi");
      return textWithoutDiacritics.split(regex).map((chunk, index) => (
        <span
          key={index}
          style={{ backgroundColor: index % 2 === 1 ? "orange" : "inherit" }}
        >
          {chunk}
        </span>
      ));
    } else {
      return text;
    }
  };

  return (
    <div className="card_admin_user">
      {user?.admin === 1 ? (
        <div className="admin_badge_admin_user">Adminstrateur</div>
      ) : (
        <div className="user_badge_admin_user">Utilisateur</div>
      )}
      <div className="avatar_container_admin_user">
        <img
          src={user?.avatar}
          alt={`Image de ${user?.firstname} ${user?.lastname}`}
          className="avatar_admin_user"
        />
      </div>
      <div className="info_admin_user">
        <h3 className="name_admin_user">
          {highlightText(`${user?.firstname} ${user?.lastname}`)}
        </h3>
        <div>
          <p className="email_admin_user">
            Email: {highlightText(user?.email)}
          </p>
          <p className="phone_admin_user">
            Tel: {user?.tel ? highlightText(user?.tel) : "Aucune Information"}
          </p>
          <p className="country_admin_user">
            Pays:{" "}
            {user?.affiliated_site
              ? highlightText(user?.affiliated_site)
              : "Aucune Information"}
          </p>
        </div>
        <div>
          <p className="job_admin_user">
            <span className="tag_job_admin_user">
              {highlightText(user?.job)}
            </span>
          </p>
          <p className="role_admin_user">
            <span className="tag_role_admin_user">
              {highlightText(user?.role)}
            </span>
          </p>
        </div>
      </div>
      {edit ? (
        <div className="card_actions_admin_user">
          <Link to={`/admin/users/${user.id}`}>
            <span className="action_edit_admin_user" title="Modifier">
              &#x270E;
            </span>
          </Link>
          <span
            className="action_delete_admin_user"
            title="Supprimer"
            onClick={(e) => handleClickDelete()}
          >
            &#x2716;
          </span>
        </div>
      ) : (
        ""
      )}
      {visibleModal ? (
        <div id="modal_delete" className="modal">
          <ToastContainer />
          <div className="modal_content">
            <h2>Confirmation de suppression</h2>
            <p>
              Voulez-vous vraiment supprimer l'utilisateur : {user?.firstname}{" "}
              {user?.lastname} ?
            </p>
            <div className="modal_buttons">
              <button id="btn_cancel" onClick={handleClickCancel}>
                Annuler
              </button>
              <button id="btn_confirm" onClick={handleClickFetch}>
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

export default UserCard;
