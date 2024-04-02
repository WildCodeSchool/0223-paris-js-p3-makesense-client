import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateAvis from "./CreateAvis";
import { removeAvis, editAvisData } from "../../store/avis";
import { deleteAvis, editAvis } from "../../services/avis";
import CustomToast from "../../components/CustomToast/CustomToast";
import { ToastContainer } from "react-toastify";

export default function ProjectAvis({ avis, post }) {
  const [visibleModal, setvisibleModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [avisIdDelete, setAvisIdDelete] = useState(0);

  const dispatch = useDispatch();
  const { showAlert } = CustomToast();
  const auth = useSelector((state) => state.auth);

  const handleModalDelter = async (avis_id) => {
    setAvisIdDelete(avis_id);
    setvisibleModal(!visibleModal);
  };

  const handleClickDelete = async () => {
    try {
      const avisToDelete = avis.find((avis) => avis.id === avisIdDelete);
      if (avisToDelete) {
        await deleteAvis(avisIdDelete);
        dispatch(removeAvis(avisIdDelete));
        setvisibleModal(!visibleModal);
        showAlert("success", "L'avis a été supprimé avec succès !");
      }
    } catch (err) {
      console.error("err", err);
      showAlert(
        "error",
        "Nous rencontrons un problème, en espérant très vite(.js) chez MAKESENSE !"
      );
    }
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
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditedText("");
  };

  const validEdit = async (id) => {
    if (editedText === "") {
      showAlert("error", "Veuillez remplir tous les champs !");
    } else {
      try {
        await editAvis(id, { text: editedText });
        dispatch(editAvisData({ id, newText: editedText }));
        setEditedText("");
        setEditingIndex(null);
        showAlert("success", "L'avis a été modifié avec succès !");
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
    <div id="container">
      <CreateAvis post={post} />
      <div className="avisContainer">
        {avis.map((data, index) => (
          <div className="avisByUser" key={data.date}>
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
              {auth.user.admin === 1 || auth.user.id === data.user_id ? (
                <div className="editButtons">
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
                    onClick={() => handleModalDelter(data.id)}
                  >
                    &#x2716;
                  </span>
                </div>
              ) : null}
            </div>
            {editingIndex === index ? (
              <div className="editButtons">
                <textarea
                  type="text"
                  onChange={handleInputChange}
                  value={editedText}
                  className="c-blue avisByUserText"
                />
                <button
                  type="button"
                  className=" annuler pointer"
                  onClick={cancelEdit}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className=" sauvegarder pointer"
                  onClick={() => validEdit(data.id)}
                >
                  Confirmer
                </button>
              </div>
            ) : (
              <p
                className="c-blue avisByUserText"
                onClick={() => changeEdit(index, data.text)}
              >
                {data.text}
              </p>
            )}
          </div>
        ))}
      </div>
      {visibleModal ? (
        <div id="modal_delete" className="modal">
          <ToastContainer />
          <div className="modal_content">
            <h2>Confirmation de suppression</h2>
            <p>Voulez-vous vraiment supprimer cet avis ?</p>
            <div className="modal_buttons">
              <button type="button" id="btn_cancel" onClick={handleClickCancel}>
                Annuler
              </button>
              <button
                type="button"
                id="btn_confirm"
                onClick={handleClickDelete}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

ProjectAvis.propTypes = {
  avis: PropTypes.arrayOf(
    PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      photo: PropTypes.string,
      text: PropTypes.string,
      user_id: PropTypes.number,
      id: PropTypes.number,
      date: PropTypes.string,
    })
  ).isRequired,
  post: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};
