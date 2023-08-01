import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeJob } from "../../store/jobs";
import { deleteJob } from "../../services/jobs";
import { removeRole } from "../../store/roles";
import { deleteRole } from "../../services/roles";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CustomToast from "../CustomToast/CustomToast";

function JobsRolesCard({
  JobRole,
  edit,
  role,
  onSuccessDeleteRole,
  onSuccessDeleteJob,
}) {
  const dispatch = useDispatch();
  const [visibleModal, setvisibleModal] = useState(false);
  const { showAlert } = CustomToast();

  const handleClickDelete = () => {
    setvisibleModal(!visibleModal);
  };

  const handleClickCancel = () => {
    setvisibleModal(!visibleModal);
  };

  const handleClickFetchRole = async () => {
    try {
      await deleteRole(JobRole.id);
      dispatch(removeRole(JobRole.id));
      setvisibleModal(!visibleModal);
      onSuccessDeleteRole();
    } catch (err) {
      if (err.response.status === 401) {
        showAlert(
          "error",
          "Impossible de supprimer ce rôle. Des utilisateurs sont encore liés à ce rôle."
        );
      } else {
        showAlert(
          "error",
          "Nous rencontrons un problème, en espérant très vite(.js) chez MAKESENSE !"
        );
      }
    }
  };

  const handleClickFetchJob = async () => {
    try {
      await deleteJob(JobRole.id);
      dispatch(removeJob(JobRole.id));
      setvisibleModal(!visibleModal);
      onSuccessDeleteJob();
    } catch (err) {
      if (err.response.status === 401) {
        showAlert(
          "error",
          "Impossible de supprimer ce poste. Des utilisateurs sont encore liés à ce poste."
        );
      } else {
        showAlert(
          "error",
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
          {role ? (
            <Link to={`/admin/roles/${JobRole.id}`}>
              <span className="action_edit_admin_job" title="Modifier">
                &#x270E;
              </span>
            </Link>
          ) : (
            <Link to={`/admin/jobs/${JobRole.id}`}>
              <span className="action_edit_admin_job" title="Modifier">
                &#x270E;
              </span>
            </Link>
          )}
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
          <ToastContainer />
          <div class="modal_content">
            <h2>Confirmation de suppression</h2>
            <p>Voulez-vous vraiment supprimer le poste : {JobRole?.name}?</p>
            <div class="modal_buttons">
              <button id="btn_cancel" onClick={handleClickCancel}>
                Annuler
              </button>
              {role ? (
                <button id="btn_confirm" onClick={handleClickFetchRole}>
                  Confirmer
                </button>
              ) : (
                <button id="btn_confirm" onClick={handleClickFetchJob}>
                  Confirmer
                </button>
              )}
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
