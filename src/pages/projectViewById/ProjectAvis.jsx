import PropTypes from "prop-types";

export default function ProjectAvis({ avis }) {
  return (
    <div id="container">
      <div className="avisContainer">
        {avis.map((data) => (
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
            </div>
            <p className="c-blue avisByUserText">{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

ProjectAvis.propTypes = {
  avis: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    photo: PropTypes.string,
    text: PropTypes.string,
    map: PropTypes.func,
  }).isRequired,
};
