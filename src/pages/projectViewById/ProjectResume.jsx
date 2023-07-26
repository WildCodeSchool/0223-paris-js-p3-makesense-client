import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getCurrentPost,
  getPostVote,
  addVote,
  deleteVote,
  getVoteFromUserFromPostId,
} from "../../services/post";
import { getCurrentUser } from "../../services/users";
import ProjectNav from "./ProjectNav";
import thumbUp from "../../assets/thumbUp.svg";

export default function ProjectResume() {
  const [isVoted, setIsVoted] = useState(false);
  const [actif, setActif] = useState(null);
  const [post, setPost] = useState([]);
  const [user, setUser] = useState([]);
  const [votes, setVotes] = useState([]);
  const [vote, setVote] = useState();
  const { id } = useParams();

  const auth = useSelector((state) => state.auth);

  const searchData = async () => {
    try {
      const userData = await getCurrentUser();
      const postsData = await getCurrentPost(id);
      const votesData = await getPostVote(id);
      const voteData = await getVoteFromUserFromPostId(auth.user.id, post.id);
      setUser(userData?.data);
      setPost(postsData?.data[0]);
      setVotes(votesData?.data);
      setVote(voteData?.data);
      voteData.data.map((e) => {
        if (e.post_id == id) {
          setActif(e.vote);
          setIsVoted(true);
        }
      });
    } catch (err) {
      console.error("err", err);
    }
  };

  useEffect(() => {
    searchData();
  }, []);

const deleteMyVote = async () => {
  try {
    const reponse = await deleteVote(post.id)
    const filterDate = votes.filter((vote) => reponse.data.selectDataIdVote[0]?.id != vote.id)
    setVote(reponse.data)
    setActif(null);
    setVotes(filterDate);
    console.log(reponse.data, "DALPDALPDLA")
  } catch (err) {
    console.error("err", err);
  }
}
  const handleIsVoted = () => {
    setIsVoted(true);
  };

  const handlePositiveVote = async () => {
    const updatedVote = true;
    const addVoteData = {
      user_id: `${user.id}`,
      post_id: `${post.id}`,
      vote: updatedVote,
    };
    try {
      const voteData = await addVote(addVoteData);
      setVotes([...votes, voteData.data]);
      setActif(true);
    } catch (err) {
      console.error("err", err);
    }
  };
  const handleNegativeVote = async () => {
    const updatedVote = false;
    const addVoteData = {
      user_id: `${user.id}`,
      post_id: `${post.id}`,
      vote: updatedVote,
    };
    try {
      const voteData = await addVote(addVoteData);
      setVotes([...votes, voteData.data]);
      setActif(false);
    } catch (err) {
      console.error("err", err);
    }
  };

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
              {isVoted ? (
                actif === null ? (
                  <div className="thumbsUpButtons">
                    <button
                      type="button"
                      className="vote yes"
                      onClick={handlePositiveVote}
                    >
                      <img src={thumbUp} alt="pouce en l'air" />
                    </button>
                    <button
                      type="button"
                      className="vote no"
                      onClick={handleNegativeVote}
                    >
                      <img src={thumbUp} alt="pouce en bas" />
                    </button>
                  </div>
                ) : actif ? (
                  <div className="thumbsUpButtons">
                    <button
                      type="button"
                      className="vote yes selected"
                      onClick={deleteMyVote}
                    >
                      <img src={thumbUp} alt="pouce en l'air" />
                    </button>
                  </div>
                ) : (
                  <div className="thumbsUpButtons">
                    <button
                      type="button"
                      className="vote no selected"
                      onClick={deleteMyVote}
                    >
                      <img src={thumbUp} alt="pouce en l'air" />
                    </button>
                  </div>
                )
              ) : (
                <div className="voteInfos">
                  <button
                    type="button"
                    className="voteButton"
                    onClick={handleIsVoted}
                  >
                    VOTER
                  </button>
                </div>
              )}
              <p className="c-blue">{votes?.length} votant(s)</p>
            </div>
          </div>
        </div>
      </div>
      <ProjectNav post={post} />
    </section>
  );
}
