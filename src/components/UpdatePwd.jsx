import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import pattern from "../assets/images/pattern-codiyaa.png";
import "../css/AuthForm.css";

const UpdatePwd = ({ onSuccess }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    // Mettre à jour le mot de passe de l'utilisateur courant
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccessMsg("Mot de passe réinitialisé avec succès !");
      setNewPassword("");
      setConfirmPassword("");
      if (onSuccess) onSuccess();
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
