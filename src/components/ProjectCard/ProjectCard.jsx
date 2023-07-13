import PropTypes from "prop-types";
import Avatar from "../../assets/default_user.png";
import Background from "../../assets/default_background_project.jpg";

export default function ProjectCard({ post }) {
  return (
    <figure>
      <img
        src={post.image ? post.image : Background}
        className="backgroundProject"
        alt="projet"
      />
      <figcaption>
        <h3 className="c-blue ">{post.title}</h3>
        <div className="tagsProject">
          <p className="tag-blue">{post.status}</p>
          <p className="tag-red">{post.location}</p>
        </div>
        <div className="userInfosDate">
          <div className="userProjectInfos">
            <img
              src={Avatar}
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
    image: PropTypes.string,
    title: PropTypes.string,
    status: PropTypes.string,
    location: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
  }).isRequired,
};
