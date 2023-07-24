import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCurrentPost, getPostVote, addVote } from "../../services/post";
import ProjectNav from "./ProjectNav";
import thumbUp from "../../assets/thumbUp.svg";

export default function ProjectResume() {
  const [post, setPost] = useState([]);
  const [votes, setVotes] = useState();
  const { id } = useParams();

  const searchData = async () => {
    try {
      const postsData = await getCurrentPost(id);
      const votesData = await getPostVote(id);
      setPost(postsData?.data[0]);
      setVotes(votesData?.data);
    } catch (err) {
      console.error("err", err);
    }
  };
  useEffect(() => {
    searchData();
  }, []);

  return (
    <section id="projectResume">
      <div className="globalContainer">
        <img
          src={post.avatar}
          alt="post illustration"
          className="projectPhoto"
        />
        <div className="projectInfo">
          <div className="titleCalendar">
            <h3 className="c-blue"> {post.title}</h3>
            <div className="calendar">
              <strong>7</strong>
            </div>
          </div>

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
            <div className="voteInfos">
              <button type="button" className="voteButton">
                VOTER
              </button>
              {/* <button type="button" className="vote yes">
                <img src={thumbUp} alt="pouce en l'air" />
              </button>
              <button type="button" className="vote no">
                <img src={thumbUp} alt="pouce en bas" />
              </button> */}

              <p className="c-blue">{votes?.length} votants</p>
            </div>
          </div>
        </div>
      </div>
      <ProjectNav post={post} />
    </section>
  );
}
