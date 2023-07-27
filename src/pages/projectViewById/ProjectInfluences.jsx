import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExpertFromPost, getImpactedFromPost } from "../../services/post";

export default function ProjectInfluences({ post }) {
  const [impacted, setImpacted] = useState([]);
  const [expert, setExpert] = useState([]);
  const [countExpert, setCountExpert] = useState(0);
  const [countImpacted, setCountImpacted] = useState(0);
  const { id } = useParams();

  const searchData = async () => {
    try {
      const impactedData = await getImpactedFromPost(id);
      const expertData = await getExpertFromPost(id);
      setImpacted(impactedData?.data);
      setExpert(expertData?.data);
    } catch (err) {
      console.error("err", err);
    }
  };
  useEffect(() => {
    searchData();
  }, []);

  useEffect(() => {
    if (impacted.length > 5) {
      setCountImpacted(impacted.length - 5);
    }
    if (expert.length > 5) {
      setCountExpert(expert.length - 5);
    }
  }, [impacted, expert]);

  return (
    <div id="container">
      <h4 className="c-blue">Personnes influencées</h4>
      <div className="participantsAvatar">
        {impacted?.length > 0 ? (
          impacted.map((data, index) => {
            if (index < 5) {
              return <img alt="users photos" src={data?.avatar} />;
            }
          })
        ) : (
          <p className="c-blue"> Personne assignée à ce rôle</p>
        )}
        {countImpacted != 0 ? (
          <div className="CountImpactedExpert">
            <p>{countImpacted}</p>
          </div>
        ) : (
          ""
        )}
      </div>
      <h4 className="c-blue">Personnes expertes</h4>
      <div className="participantsAvatar">
        {expert?.length > 0 ? (
          expert.map((data, index) => {
            if (index < 5) {
              return <img alt="users photos" src={data?.avatar} />;
            }
          })
        ) : (
          <p className="c-blue"> Personne assignée à ce rôle</p>
        )}
        {countExpert != 0 ? (
          <div className="CountImpactedExpert">
            <p>{countExpert}</p>
          </div>
        ) : (
          ""
        )}
      </div>
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
