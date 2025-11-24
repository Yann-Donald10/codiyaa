import React from "react";

const Services = () => {
  return (
    <section className="section section-cream section--centered" id="services">
      <div className="section-inner">
        <h2 className="section-title">Pour qui ?</h2>
        <p className="section-text">
          Codiyaa accompagne des acteurs éducatifs qui souhaitent initier les enfants à la
          pensée informatique dans un cadre adapté à leurs réalités.
        </p>

        <div className="section-grid section-grid--three">
          <div className="section-card">
            <h3 className="section-card-title">ONG & fondations</h3>
            <p className="section-card-text">
              Pour des programmes éducatifs en milieu rural ou périurbain, avec une
              approche ancrée dans la culture locale.
            </p>
            <p className="section-card-text">
              Ateliers modulables, formation de facilitateurs, suivi simple des progrès des
              groupes.
            </p>
          </div>

          <div className="section-card">
            <h3 className="section-card-title">Ministères & programmes nationaux</h3>
            <p className="section-card-text">
              Pour intégrer la pensée informatique au primaire, sans dépendre uniquement de
              l’anglais ou de ressources coûteuses.
            </p>
            <p className="section-card-text">
              Accompagnement au déploiement, alignement avec les programmes scolaires,
              montée en compétence des encadrants.
            </p>
          </div>

          <div className="section-card">
            <h3 className="section-card-title">Écoles & centres éducatifs</h3>
            <p className="section-card-text">
              Pour des clubs de code, ateliers hebdomadaires ou projets ponctuels, faciles
              à mettre en place même sans expertise numérique avancée.
            </p>
            <p className="section-card-text">
              Contenus adaptés aux enfants débutants, progression claire et activités
              ludiques.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
