import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Navbarproject.css";
import logo from "../assets/images/logo-codiyaa.png";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from '../context/AuthContext'
import logouser from "../assets/images/user-logo.png"
import iconparam from "../assets/images/parametres.png"
import iconhelp from "../assets/images/question.png"
import icontuto from "../assets/images/ampoule.png"


const Navbar = (props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#");
  const { user } = useAuth();
  const [educator_profile, setEducator_profile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const session_status = props.session_status
  const handleChangeStatus = props.handleChangeStatus

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
    const sections = ["Paramètres", "aide", "tutoriel"];

    const onScroll = () => {
      const scrollPos = window.scrollY; // marge visuelle

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
    if (user) 
      fetchProfile();
  }, [user]);

  const handleLogout = async () => { 
    const { error } = await supabase.auth.signOut(); 
    if (error) 
      console.log("Erreur logout :", error); 
    else 
      navigate("/home")
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  console.log(educator_profile)

  return (
    <header className="navbarproject navbar--scrolled-project">
      <div className="navbar-inner-project">
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
          <img src={iconparam} width="20px" height="20px" alt="icon"/>
          <a
            href="#"
            className={`navbar-link ${
              activeSection === "overview" ? "active" : ""
            }`}
          >
            Paramètres
          </a>
          <img src={iconhelp} width="20px" height="20px" alt="icon"/>
          <a
            href="#"
            className={`navbar-link ${
              activeSection === "about" ? "active" : ""
            }`}
          >
            Aide
          </a>
          <img src={icontuto} width="20px" height="20px" alt="icon"/>
          <a
            href="#"
            className={`navbar-link ${
              activeSection === "services" ? "active" : ""
            }`}
          >
            Tutoriels
          </a>
        </nav>

        {/* Boutons à droite */}
        <div className="navbar-actions">
          <img
              src={logouser} width="40px" height="40px"
              alt="avatar"
            />
          <div style={{ position: "relative" }}>
            <button className="navbar-btn navbar-btn--ghost" onClick={toggleDropdown}>
              {educator_profile[0]?.educator_firstname} {educator_profile[0]?.educator_lastname}
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu" style={{
                position: "absolute",
                right: 0,
                top: "100%",
                backgroundColor: "#fff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                borderRadius: "8px",
                padding: "10px",
                zIndex: 100
              }}>
                {session_status ? (
                  <button 
                    onClick={() => handleChangeStatus(false)}
                    style={{ display: "block", width: "100%", marginBottom: "5px" }}>
                    Terminer la session
                  </button>
                ) : (
                  <button 
                    onClick={() => handleChangeStatus(true)}
                    style={{ display: "block", width: "100%", marginBottom: "5px" }}>
                    Activer la session
                  </button>
                )}

                <button onClick={() => handleLogout()} style={{ display: "block", width: "100%" }}>
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




