import PropTypes from "prop-types";

export default function ProjectInfluences({ post }) {
  return (
    <div id="container">
      <h4 className="c-blue">Personnes influencées</h4>
      <img alt="users photos" />
      <h4 className="c-blue">Personnes expertes</h4>
      <img alt="users photos" />
      <h3 className="c-blue">Impact sur l'organisation</h3>
      <p>{post.impact}</p>
    </div>
  );
}
ProjectInfluences.propTypes = {
  post: PropTypes.shape({
    impact: PropTypes.string,
  }).isRequired,
};
