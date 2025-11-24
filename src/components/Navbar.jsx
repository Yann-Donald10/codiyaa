import React, { useEffect, useState } from "react";
import "../css/Navbar.css";
import logo from "../assets/images/logo-codiyaa.png";
import pattern from "../assets/images/pattern-codiyaa.png";


<img
  src={logo}
  alt="Logo Codiyaa"
  className="navbar-logo-image"
/>

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar-inner">
        {/* Logo + texte */}
        <div className="navbar-left">
          <img
            src="/logo-codiyaa.png"
            alt="Logo Codiyaa"
            className="navbar-logo-image"
          />
        </div>

        {/* Liens de navigation */}
        <nav className="navbar-nav">
          <a href="#overview" className="navbar-link">
            Accueil
          </a>
          <a href="#about" className="navbar-link">
            À propos
          </a>
          <a href="#services" className="navbar-link">
            Pour qui ?
          </a>
          <a href="#contact" className="navbar-link">
            Contact
          </a>
        </nav>

        {/* Boutons à droite */}
        <div className="navbar-actions">
          <button className="navbar-btn navbar-btn--primary">
            Se connecter
          </button>
          <button className="navbar-btn navbar-btn--ghost">
            Rejoindre une session
          </button>
        </div>
      </div>

      {/* Bande motifs africains */}
      <div className="navbar-pattern-strip" />
    </header>
  );
};

export default Navbar;
