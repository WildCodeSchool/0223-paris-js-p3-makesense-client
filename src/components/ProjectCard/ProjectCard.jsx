import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({ post }) {
  const navigate = useNavigate();

  const handleClickShow = () => {
    navigate(`/projectview/${post.id}`);
  };
  return (
    <figure onClick={handleClickShow}>
      <img src={post.avatar} className="backgroundProject" alt="projet" />
      <figcaption>
        <h3 className="c-blue ">{post.title}</h3>
        <div className="tagsProject">
          <p className="tag-blue">{post.status}</p>
          <p className="tag-red">{post.location}</p>
        </div>
        <div className="userInfosDate">
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
