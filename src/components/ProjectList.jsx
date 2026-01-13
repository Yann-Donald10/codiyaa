import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import SignupStudentForm from "../components/SignStudent";

import "../css/SignupStudent.css";     
import "../css/ProjectList.css";       

import studentIllustration from "../assets/images/logo-codiyaa.png"; 
// ou une image dédiée si tu en as une

const ProjectList = (props) => {
  const { projects, loading, error, fetchProjects, session_status } = props;
  const [showAddModal, setShowAddModal] = useState(false);
  const { user } = useAuth();

  const handleAddStudent = async (student_firstname, student_lastname) => {
    const student_code = 1000;

    const folderName = `${student_firstname}_${student_lastname}`
      .replace(/\s+/g, "_")
      .toLowerCase();

    const folderPath = `Project/${folderName}/`;
    const url_project = folderPath;

    const { error } = await supabase
      .from("student")
      .insert([
        {
          student_firstname,
          student_lastname,
          student_code,
          id_educator: user.id,
          url_project,
        },
      ])
      .select()
      .single();

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
    <section className="student-section">
      <div className="student-section-header">
        <h2 className="student-section-title">Dossiers</h2>
        <button
          className="student-add-btn"
          onClick={() => setShowAddModal(true)}
        >
          + Ajouter un élève
        </button>
      </div>

      <div className="student-grid">
        {[...projects]
          .sort((a, b) =>
            a.student_lastname.localeCompare(b.student_lastname, "fr", {
              sensitivity: "base",
            })
          )
          .map((student) => (
          <article
            key={student.id_student}
            className="student-card"
          >
            <Link
              to={`/projects/${student.id_student}`}
              state={{ fromEducator: true }}
              className="student-card-link"
            >
              <div className="student-card-illustration">
                <img src={studentIllustration} alt="" />
              </div>

              <div className="student-card-body">
                <h3 className="student-name">
                  {student.student_lastname} {student.student_firstname}
                </h3>

                {session_status && (
                  <p className="student-code">
                    Code élève : <span>{student.student_code}</span>
                  </p>
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>

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
    </section>
  );
};

export default ProjectList;
