import PropTypes from "prop-types";

export default function ProjectDescription({ post }) {
  return (
    <div id="container">
      <h4 className="c-blue">Description</h4>
      <p className="containprojet c-blue">{post.description}</p>
      <h4 className="c-blue">Bénéfices</h4>
      <p className="containprojet c-blue">{post.profit}</p>
      <h4 className="c-blue">Risques</h4>
      <p className="containprojet c-blue">{post.risk}</p>
      <h3 className="c-blue">Dâtes à retenir</h3>
    </div>
  );
}

ProjectDescription.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string,
    profit: PropTypes.string,
    risk: PropTypes.string,
  }).isRequired,
};
