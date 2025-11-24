import React from "react";

const About = () => {
  return (
    <section className="section section-light section--centered" id="about">
      <div className="section-inner">
        <h2 className="section-title">Pourquoi Codiyaa existe ?</h2>
        <p className="section-text">
          Codiyaa propose une approche culturelle et accessible pour développer la pensée
          informatique dès le primaire.
        </p>

        <div className="section-grid section-grid--three">
          <div className="section-card">
            <h3 className="section-card-title">Langues maternelles</h3>
            <p className="section-card-text">
              L’apprentissage commence dans la langue que l’enfant maîtrise déjà, pour
              renforcer compréhension, confiance et engagement.
            </p>
          </div>

          <div className="section-card">
            <h3 className="section-card-title">Logique intuitive & créativité</h3>
            <p className="section-card-text">
              Des activités simples et progressives, inspirées de jeux et de situations
              familières, pour développer la logique, l’initiative et l’imagination.
            </p>
          </div>

          <div className="section-card">
            <h3 className="section-card-title">Adapté aux réalités africaines</h3>
            <p className="section-card-text">
              Pensé pour fonctionner dans des contextes à faible connectivité, avec des
              classes multi-niveaux et un matériel limité.
            </p>
          </div>
        </div>
      </div>
    </section>


  );
};

export default About;
