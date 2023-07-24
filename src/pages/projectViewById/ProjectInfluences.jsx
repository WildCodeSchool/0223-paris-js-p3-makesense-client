import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExpertFromPost, getImpactedFromPost } from "../../services/post";

export default function ProjectInfluences({ post }) {
  const [impacted, setImpacted] = useState([]);
  const [expert, setExpert] = useState();
  const { id } = useParams();

  const searchData = async () => {
    try {
      const impactedData = await getExpertFromPost(id);
      const expertData = await getImpactedFromPost(id);
      setImpacted(impactedData?.data);
      setExpert(expertData?.data);
    } catch (err) {
      console.error("err", err);
    }


  };
  useEffect(() => {
    searchData();
  }, []);
  
  
  return (
    <div id="container">
      <h4 className="c-blue">Personnes influencées</h4>
      <div className="participantsAvatar">
      {impacted?.length > 0 ? (
        impacted.map((data) => <img alt="users photos" src={data?.avatar} />)
      ) : (
        <p className="c-blue"> Personne assignée à ce rôle</p>
      )}
      </div>
      <h4 className="c-blue">Personnes expertes</h4>
      <div className="participantsAvatar">
      {expert?.length > 0 ? (
        expert.map((data) => <img alt="users photos" src={data?.avatar} />)
      ) : (
        <p className="c-blue"> Personne assignée à ce rôle</p>
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
