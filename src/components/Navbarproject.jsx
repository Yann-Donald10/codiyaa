import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Navbarproject.css";
import logo from "../assets/images/logo-codiyaa.png";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import logouser from "../assets/images/user-logo.png";
import iconparam from "../assets/images/parametres.png";
import iconhelp from "../assets/images/question.png";
import icontuto from "../assets/images/ampoule.png";

const Navbar = (props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [educator_profile, setEducator_profile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  const session_status = props.session_status;
  const handleChangeStatus = props.handleChangeStatus;

  // Réduction navbar au scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Récup profil enseignant
  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("educator")
        .select("educator_firstname, educator_lastname")
        .eq("id_educator", user.id);

      if (error) throw error;
      setEducator_profile(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Erreur logout :", error);
    else navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);


  const educatorName =
    educator_profile[0]
      ? `${educator_profile[0].educator_firstname} ${educator_profile[0].educator_lastname}`
      : "";

  return (
    <header
      className={`navbarproject ${
        isScrolled ? "navbar--scrolled-project" : ""
      }`}
    >
      <div className="navbar-inner-project">
        {/* Logo Codiyaa */}
        <div className="navbar-left">
          <img
            src={logo}
            alt="Logo Codiyaa"
            className="navbar-logo-image"
          />
        </div>

        {/* Liens de navigation */}
        <nav className="navbar-nav">
          <button className="navbar-icon-link">
            <img src={iconparam} alt="" />
            <span>Paramètres</span>
          </button>
          <button className="navbar-icon-link">
            <img src={iconhelp} alt="" />
            <span>Aide</span>
          </button>
          <button className="navbar-icon-link">
            <img src={icontuto} alt="" />
            <span>Tutoriels</span>
          </button>
        </nav>

        {/* Zone utilisateur */}
        <div className="navbar-actions">
          {/* Badge statut session */}
          <span
            className={`navbar-session-badge ${
              session_status ? "navbar-session-badge--on" : "navbar-session-badge--off"
            }`}
          >
            {session_status ? "Session ouverte" : "Session fermée"}
          </span>

          <div className="navbar-user-wrapper" ref={dropdownRef}>
            <img
              src={logouser}
              className="navbar-user-avatar"
              alt="avatar"
            />
            <button
              className="navbar-btn navbar-btn--ghost"
              onClick={toggleDropdown}
            >
              {educatorName}
            </button>

            {dropdownOpen && (
              <div className="navbar-dropdown">
                {session_status ? (
                  <button
                    className="navbar-dropdown-item"
                    onClick={() => handleChangeStatus(false)}
                  >
                    Terminer la session
                  </button>
                ) : (
                  <button
                    className="navbar-dropdown-item"
                    onClick={() => handleChangeStatus(true)}
                  >
                    Activer la session
                  </button>
                )}

                <button
                  className="navbar-dropdown-item navbar-dropdown-item--danger"
                  onClick={() => handleLogout()}
                >
                  Se déconnecter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bande motifs africains */}
      <div className="navbar-pattern-strip" />
    </header>
  );
};

export default Navbar;
