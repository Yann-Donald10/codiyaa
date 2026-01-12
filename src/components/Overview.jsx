import React from "react";
import "../css/Overview.css";
import defaultIllustration from "../assets/images/default.png";

const Overview = () => {
  return (
    <section className="hero" id="overview">
      <div className="hero-inner">
        <div className="hero-text">

          <h1>
            Un bloc, une <span className="marker">idée</span>
            <br />
            La logique animée
          </h1>

          <p>
            Codiyaa est une plateforme intuitive pour initier les enfants de 5 à 12
            ans à la pensée informatique, avec des contenus adaptés à leur culture
            et à leur réalité.
          </p>

          <div className="hero-buttons">
            <a href="#contact" className="btn-primary">
              Nous contacter
            </a>
            <a href="#features" className="btn-secondary">
              Découvrir
            </a>
          </div>
        </div>

        <div className="hero-illustration">
          <img src={defaultIllustration} alt="Illustration Codiyaa" />
        </div>
      </div>
    </section>
  );
};

export default Overview;
