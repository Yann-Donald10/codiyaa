import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'

const SignupStudentForm = ({ onAdd, onCancel }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onAdd(firstname, lastname);
  };

  return (
    <form onSubmit={submit}>
      <label>Nom</label>
      <input value={lastname} onChange={(e) => setLastname(e.target.value)} required />
      <br/>

      <label>Prénom</label>
      <input value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
      <br/>

      <button type="submit">Ajouter</button>
      <button type="button" onClick={onCancel}>Annuler</button>
    </form>
  );
};

export default SignupStudentForm;
