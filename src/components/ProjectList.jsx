import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from '../context/AuthContext'
import { Link } from "react-router-dom";
import SignupStudentForm from"../components/SignStudent"
import "../css/SignupStudent.css"


const ProjectList = (props) => {
  const projects = props.projects;
  const loading = props.loading;
  const error = props.error
  const fetchProjects = props.fetchProjects
  const session_status = props.session_status
  const [showAddModal, setShowAddModal] = useState(false);
  const { user } = useAuth()

  const handleAddStudent = async (student_firstname, student_lastname) => {

    const student_code = 1000;

    const folderName = `${student_firstname}_${student_lastname}`
    .replace(/\s+/g, "_")
    .toLowerCase();

    const folderPath = `Project/${folderName}/`;
    const url_project = folderPath;

    const { error } = await supabase.from("student").insert([{
      student_firstname,
      student_lastname,
      student_code,
      id_educator: user.id,
      url_project
    }
    ]).select().single();

    if (error) {
      console.log(error);
      return;
    }
    
    const { error: storageError } = await supabase.storage
    .from("Project")
    .upload(`${folderName}/.init`, new Blob([""]));

  if (storageError && storageError.message !== "The resource already exists") {
    console.log("Erreur storage:", storageError);
  }

    await fetchProjects();

    setShowAddModal(false);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  
  return (
    <div>
      <h2>Dossiers</h2>
      {projects.map((student, index) => (
        <div key={index}>
          <Link to={`/projects/${student.id_student}`} state={{ fromEducator: true }}>
            {student.student_firstname} {student.student_lastname}
          </Link>
          {session_status && (
            <span>
              - {student.student_code}
            </span>
          )}
        </div>
      ))}

      <button onClick={() => setShowAddModal(true)}>Ajouter un élève</button>

      {showAddModal && (
        <div className="modalStyle">
          <div className="modalContentStyle">

            <h3>Ajouter un élève</h3>

            <SignupStudentForm
              onAdd={handleAddStudent}
              onCancel={() => setShowAddModal(false)}
            />

          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
