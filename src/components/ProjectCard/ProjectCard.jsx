import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removePost } from "../../store/posts";
import { deletePost } from "../../services/post";

export default function ProjectCard({ post, edit }) {
  const navigate = useNavigate();
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
      await deletePost(post.id);
      dispatch(removePost(post.id));
      setvisibleModal(!visibleModal);
    } catch (err) {
      console.error("err", err);
      setErrMessage(
        "Nous rencontrons un problème. Veuillez réessayer plus tard.",
      );
    }
  };

  const handleClickShow = () => {
    navigate(`/projectview/${post.id}`);
  };

  return edit ? (
    <figure>
      <div className="card_actions_admin_post">
        <span
          className="action_delete_admin_post"
          title="Supprimer"
          onClick={() => handleClickDelete()}
        >
          &#x2716;
        </span>
      </div>
      <img src={post.avatar} className="backgroundProject" alt="projet" />
      <figcaption>
        <h3 className="c-blue ">{post.title}</h3>
        <div className="tagsProject">
          <p className="tag-blue">{post.status}</p>
          <p className="tag-red">{post.location}</p>
        </div>
        <div className="userInfos">
          <div className="userProjectInfos">
            <img
              src={post.photo}
              alt="profil utilisateur"
              className="avatarProject"
            />
            <p className="c-blue ">
              par
              <span className="c-blue ">
                {" "}
                {post.firstname} {post.lastname}
              </span>
            </p>
          </div>
          <div className="calendar">
            <strong>7</strong>
          </div>
          {visibleModal ? (
            <div id="modal_delete" className="modal">
              <div className="modal_content">
                {errMessage && <p className="p_error_modal">{errMessage}</p>}
                <h2>Confirmation de suppression</h2>
                <p>
                  Voulez-vous vraiment supprimer le post : {post?.firstname} ?
                </p>
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
      </figcaption>
    </figure>
  ) : (
    <figure onClick={handleClickShow}>
      <img src={post.avatar} className="backgroundProject" alt="projet" />
      <figcaption>
        <h3 className="c-blue ">{post.title}</h3>
        <div className="tagsProject">
          <p className="tag-blue">{post.status}</p>
          <p className="tag-red">{post.location}</p>
        </div>
        <div className="userInfos">
          <div className="userProjectInfos">
            <img
              src={post.photo}
              alt="profil utilisateur"
              className="avatarProject"
            />
            <p className="c-blue ">
              par
              <span className="c-blue ">
                {" "}
                {post.firstname} {post.lastname}
              </span>
            </p>
          </div>
          <div className="calendar">
            <strong>7</strong>
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

ProjectCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    avatar: PropTypes.string,
    photo: PropTypes.string,
    title: PropTypes.string,
    status: PropTypes.string,
    location: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
  }).isRequired,
};
