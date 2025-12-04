import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import MyProjectList from '../components/MyProjectList'
import NavBarStudent from '../components/NavbarStudent'

export default function Workspace() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const location = useLocation();
  const fromEducator = location.state?.fromEducator || false;


  useEffect(() => {
    const checkSession = async () => {
      // 1️⃣ Récupérer l'étudiant
      const { data: studentData, error: studentError } = await supabase
        .from("student")
        .select("id_student, student_firstname, student_lastname, id_educator")
        .eq("id_student", studentId)
        .single();

      if (studentError || !studentData) {
        navigate("/"); // sécurité
        return;
      }

      setStudent(studentData);

      if (!fromEducator) {
        // Vérification pour l'élève seulement
        const { data: educator, error: educatorError } = await supabase
          .from("educator")
          .select("session_status")
          .eq("id_educator", studentData.id_educator)
          .single();

        if (educatorError || !educator || !educator.session_status) {
          navigate("/"); // session fermée ou erreur → on bloque l'accès
        }
      }
    };

    checkSession();
  }, [studentId, navigate]);

  if (!student) return <p>Chargement...</p>;

  return (
    <div>
      <NavBarStudent />
      <p className="welcome-text">Bienvenue sur votre espace, <strong>{student.student_firstname} {student.student_lastname}</strong></p>
      <MyProjectList student = {student} fromEducator={fromEducator} studentId={studentId}/>
    </div>
  );
}