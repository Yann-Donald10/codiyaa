import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import pattern from "../assets/images/pattern-codiyaa.png";
import "../css/AuthForm.css";


const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
       alert(error.message);
       console.log(error.message)
      }
      else{
        console.log("Connexion réussie !");
        
      }
    };

  return (
    <div className="auth-container">
      <img src={pattern} alt="" className="decor decor-top" />

      <h2 className="auth-title">Login</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="forgot">Mot de passe oublié ?</p>

        <button type="submit" className="btn-submit">Se connecter</button>
      </form>

      <div className="toggle-text">
      <p>Pas de compte ?</p>
      <p><Link to= "/signup">Création de compte</Link></p>
      </div>

      <img src={pattern} alt="" className="decor decor-bottom" />
    </div>
  );
};

export default AuthForm;
