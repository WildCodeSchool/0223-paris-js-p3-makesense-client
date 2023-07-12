import Fetch from "../ProjectCard/FetchPosts";

export default function ProjectViewHome() {
  return (
    <>
      <p className="">
        <strong>Projet en cours </strong>
        trier par: <strong> A la une</strong>
      </p>
      <Fetch />;
    </>
  );
}
