import React from "react";
import "../css/Navbar.css"
const Navbar = () => {
  return (
    <nav className="flex flex-col md:flex-row md:items-center md:justify-between px-6 py-4 bg-white shadow-sm">
      <a href="/" className="flex items-center space-x-2">
        <img src="favicon.png" alt="Logo Codiyaa" className="h-8 w-8" />
        <h1 className="text-xl font-bold text-orange-800">Codiyaa</h1>
      </a>
       <ul class="menunav">
            <li> <a href="#apropos">A propos</a></li>
            <li> <a href="#services">Services</a></li>
            <li> <a href="#contact">Contact</a></li>
        </ul>
     

      <button>
        Se connecter
      </button>
    </nav>
  );
};

export default Navbar;
