import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Navbarproject.css";
import logo from "../assets/images/logo-codiyaa.png";




const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const navigate = useNavigate();

  // 1) Effet pour réduire la navbar au scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <header className="navbarstudent navbar--scrolled-student">
      <div className="navbar-inner-student">
        {/* Logo */}
        <div className="navbar-left">
          <img
            src={logo}
            alt="Logo Codiyaa"
            className="navbar-logo-image"
          />
        </div>
      </div>

      {/* Bande motifs africains */}
      <div className="navbar-pattern-strip" />
    </header>
  );
};

export default Navbar;




