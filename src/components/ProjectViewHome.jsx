import FetchPosts from "./FetchPosts/FetchPosts";

export default function ProjectViewHome() {
  return (
    <section id="projectView">
      <p className="c-blue">
        <strong>Projet en cours </strong>
        trier par: <strong> A la une</strong>
      </p>
      <FetchPosts />;
    </section>
  );
}
