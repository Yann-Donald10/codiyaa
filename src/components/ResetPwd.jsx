import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import pattern from "../assets/images/pattern-codiyaa.png";
import "../css/AuthForm.css";


const ResetPwd = ({onSubmitSuccess}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.resetPasswordForEmail('testy@example.com', {
      RedirectTo: "http://localhost:3000/update-password"  
    });

    if (error) {
      alert("Une erreur est survenue : " + error.message);
      return;
    }
    onSubmitSuccess();
    console.log("Si un compte existe pour cet email, un lien de réinitialisation a été envoyé.");
  };



  return (
    <div className="auth-container">
      <img src={pattern} alt="" className="decor decor-top" />

      <h2 className="auth-title">Mot de passe oublié</h2>
      <p className="auth-title">Veuillez entrer l'adresse mail de votre compte. Nous vous enverrons un e-mail contenant les instructions afin de créer un nouveau mot de passe</p>

      <form onSubmit={handleSubmit} className="auth-form">
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" className="btn-submit">Envoyer</button>
      </form>

      <img src={pattern} alt="" className="decor decor-bottom" />
    </div>
  );
};

export default ResetPwd;
