import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Workspace() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

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

      // 2️⃣ Vérifier le session_status
      const { data: educator, error: educatorError } = await supabase
        .from("educator")
        .select("session_status")
        .eq("id_educator", studentData.id_educator)
        .single();

      if (educatorError || !educator) {
        navigate("/");
        return;
      }

      // 3️⃣ Si la session est fermée → redirect Home
      if (!educator.session_status) {
        navigate("/");
      }
    };

    checkSession();
  }, [studentId, navigate]);

  if (!student) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Espace de travail</h1>
      <p>Étudiant : {student.student_firstname} {student.student_lastname}</p>
    </div>
  );
}