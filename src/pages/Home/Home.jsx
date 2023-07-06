import pills from "../../assets/pills/Pills_mobile_home.png";
// import Input from "../../components/Input";

export default function Home() {
  const clickMe = () => {
    console.log("JE SUIS UN GENTIL BOUTON :)");
  };
  return (
    <section
      id="home"
      style={{
        backgroundImage: `url(${pills})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <h1 className="c-white">
        <span className="c-yellow ">Donner vie </span> <br />
        aux bonnes idées
      </h1>
      <p className="c-white">
        Parce que nous croyons en celles et ceux qui agissent. Makesense vous
        accompagne dans vos projets.
      </p>
      <div className="homeInputs">
        <button type="button" onClick={clickMe} className="button-bg-orange">
          décourvrir les projets
        </button>
        <button type="button" onClick={clickMe} className="button-bg-a0">
          lancer mon projet
        </button>
        <button type="button" onClick={clickMe} className="button-bg-a0">
          comment se lancer ?
        </button>
      </div>
    </section>
  );
}
