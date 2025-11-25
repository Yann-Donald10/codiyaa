import { useNavigate } from "react-router-dom";

export default function SignupSuccess() {
    const navigate = useNavigate();
  return (
    <div >
      <h1>Votre message a bien été transmis à l'équipe.</h1>
      <p>Nous prendrons contact avec vous dans les plus bref delais.</p>
      <p>L'équipe Codiyaa</p>
      <button onClick={() => navigate("/")}>
      retour
    </button>
    </div>
  );
}
