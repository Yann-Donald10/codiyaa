import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import logo from "../assets/images/logo-codiyaa.png";


/*
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

    window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);
  
  
  */

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  // 1) Effet pour réduire la navbar au scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2) Effet pour détecter la section active
  useEffect(() => {
    const sections = ["overview", "about", "services", "contact"];

    const onScroll = () => {
      const scrollPos = window.scrollY + 150; // marge visuelle

      for (const id of sections) {
        const el = document.getElementById(id);
        if (
          el &&
          el.offsetTop <= scrollPos &&
          el.offsetTop + el.offsetHeight > scrollPos
        ) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <div className="navbar-left">
          <img
            src={logo}
            alt="Logo Codiyaa"
            className="navbar-logo-image"
          />
        </div>

        {/* Liens de navigation */}
        <nav className="navbar-nav">
          <a
            href="#overview"
            className={`navbar-link ${
              activeSection === "overview" ? "active" : ""
            }`}
          >
            Accueil
          </a>
          <a
            href="#about"
            className={`navbar-link ${
              activeSection === "about" ? "active" : ""
            }`}
          >
            À propos
          </a>
          <a
            href="#services"
            className={`navbar-link ${
              activeSection === "services" ? "active" : ""
            }`}
          >
            Pour qui ?
          </a>
          <a
            href="#contact"
            className={`navbar-link ${
              activeSection === "contact" ? "active" : ""
            }`}
          >
            Contact
          </a>
        </nav>

        {/* Boutons à droite */}
        <div className="navbar-actions">
          <button className="navbar-btn navbar-btn--primary" onClick={() => navigate("/login")}>
            Se connecter
          </button>
          <button className="navbar-btn navbar-btn--ghost" onClick={() => navigate("/session")}>
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




