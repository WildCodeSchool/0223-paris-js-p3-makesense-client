import PropTypes from "prop-types";

export default function ProjectDescription({ post }) {
  console.log(post);
  return (
    <div id="container">
      <h3 className="c-blue">Description</h3>
      <p className="containprojet c-blue">{post.description}</p>
      <h3 className="c-blue">Bénéfices</h3>
      <p className="containprojet c-blue">{post.profit}</p>
      <h3 className="c-blue">Risques</h3>
      <p className="containprojet c-blue">{post.risk}</p>
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
