import { useState } from "react";

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
      <input
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        required
      />

      <label>Prénom</label>
      <input
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        required
      />

      <div className="modal-buttons-row">
        <button type="submit">Ajouter</button>
        <button type="button" onClick={onCancel}>Annuler</button>
      </div>
    </form>
  );
};

export default SignupStudentForm;
