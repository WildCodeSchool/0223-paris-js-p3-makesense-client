import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeJob } from "../../store/jobs";
import { deleteJob } from "../../services/jobs";
import { Link } from "react-router-dom";

function JobsRolesCard({ JobRole, edit }) {
  const dispatch = useDispatch();
  const [visibleModal, setvisibleModal] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleClickDelete = () => {
    setvisibleModal(!visibleModal);
  };

  const handleClickCancel = () => {
    setvisibleModal(!visibleModal);
  };

  const handleClickFetch = async () => {
    try {
      await deleteJob(JobRole.id);
      dispatch(removeJob(JobRole.id));
      setvisibleModal(!visibleModal);
    } catch (err) {
      if (err.response.status === 401) {
        setErrMessage(
          "Impossible de supprimer ce poste. Des utilisateurs sont encore liés à ce poste."
        );
      } else {
        setErrMessage(
          "Nous rencontrons un problème, en espérant très vite(.js) chez MAKESENSE !"
        );
      }
    }
  };

  return (
    <div key={JobRole?.id} className="card_admin_job">
      <h3>{JobRole?.name}</h3>
      {edit ? (
        <div className="card_actions_admin_job">
          <Link to={`/admin/jobs/${JobRole.id}`}>
            <span className="action_edit_admin_job" title="Modifier">
              &#x270E;
            </span>
          </Link>
          <span
            className="action_delete_admin_job"
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
        <div id="modal_delete" class="modal">
          <div class="modal_content">
            {errMessage && <p className="p_error_modal">{errMessage}</p>}
            <h2>Confirmation de suppression</h2>
            <p>Voulez-vous vraiment supprimer le poste : {JobRole?.name}?</p>
            <div class="modal_buttons">
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

export default JobsRolesCard;
