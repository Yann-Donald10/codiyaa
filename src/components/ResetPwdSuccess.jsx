import { useNavigate } from "react-router-dom";

export default function ResetPwdSuccess() {
    const navigate = useNavigate();
  return (
    <div >
      <h1>E-mail envoyé</h1>
      <p>Si cette adresse est liée à un compte existant, un e-mail de réinitialisation de mot de passe vous a été envoyé</p>
      <button onClick={() => navigate("/login")}>
      retour à la connexion
    </button>
    </div>
  );
}
