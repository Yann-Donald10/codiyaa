import React from "react";
import "../css/Overview.css";

const Overview = () => {
  return (
    <section className="hero" id="overview">
      <div className="hero-inner">
        <div className="hero-text">
          <h1> Un bloc, une idée <br /> La logique animée</h1>
          <p>
            Codiyaa est une plateforme intuitive pour initier les enfants de 5 à 12 ans à la
            pensée informatique, avec des contenus adaptés à leur culture et à leur réalité.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">
              Demander une démonstration
            </button>
            <button className="btn-secondary">
              Nous contacter
            </button>
          </div>
        </div>

        <div className="hero-illustration">
          {/* À adapter selon l’emplacement réel de ton illustration */}
          <img
            src="/hero-codiyaa.png"
            alt="Enfant qui assemble des blocs de code Codiyaa"
          />
        </div>
      </div>
    </section>
  );
};

export default Overview;
