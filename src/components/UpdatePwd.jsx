import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import pattern from "../assets/images/pattern-codiyaa.png";
import "../css/AuthForm.css";

const UpdatePwd = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === "PASSWORD_RECOVERY") {
          console.log("Utilisateur en mode récupération de mot de passe");
        }
      }
    );
    return () => subscription.subscription.unsubscribe();
  }, []);
  
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMsg(null);

        if (newPassword !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        setLoading(true);

        // Mise à jour du mot de passe
        const { error } = await supabase.auth.updateUser({ password: newPassword });

        if (error) {
            setLoading(false);
            setError(error.message);
            return;
        }

        // Déconnexion après update
        const { error: signOutError } = await supabase.auth.signOut();
        setLoading(false);

        if (signOutError) {
            setError(signOutError.message);
        } else {
            setSuccessMsg("Mot de passe réinitialisé avec succès !");
            setNewPassword("");
            setConfirmPassword("");

            // Redirection vers login après 2 secondes
            setTimeout(() => navigate("/login"), 2000);
        }
    };

  return (
    <div className="auth-container">
      <img src={pattern} alt="" className="decor decor-top" />
      <h2 className="auth-title">Réinitialiser votre mot de passe</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Chargement..." : "Réinitialiser"}
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {successMsg && <p style={{ color: "green", marginTop: "10px" }}>{successMsg}</p>}

      <img src={pattern} alt="" className="decor decor-bottom" />
    </div>
  );
};

export default UpdatePwd;