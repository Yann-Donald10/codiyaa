import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "../css/MyProjectList.css"
import defaultimage from "../assets/images/default.png"
import imageAddPorject from "../assets/images/addproject.png"
import { Navigate } from "react-router-dom";

export default function Workspace(props) {

    const student = props.student
    const fromEducator = props.fromEducator
    const studentId = props.studentId
    const [projectList, setProjectList] = useState();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedScenario, setSelectedScenario] = useState("");
    const [newProjectTitle, setNewProjectTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [scenarioList, setScenarioList] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
      const fetchProjectStudent = async () => {
        try {
            const { data, error } = await supabase
                .from("student_project")
                .select(`
                    id_project,
                    project_title,
                    project_status,
                    project_data,
                    created_at,
                    updated_at,
                    id_scenario,
                    scenario:scenarios (
                      scenario_title,
                      scenario_description,
                      scenario_image
                    )
                `)
                .eq("id_student", student.id_student);

            if (error) throw error;

            setProjectList(data || []);
        } catch (err) {
            setError(err.message);
        }
      };

    if (student) 
      fetchProjectStudent();
  }, [student]);

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const { data, error } = await supabase
          .from("scenarios")
          .select("*");
        if (error) throw error;
        setScenarioList(data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchScenarios();
  }, []);

  const handleCreateProject = async () => {
    if (!selectedScenario || !newProjectTitle) {
      alert("Veuillez sélectionner un scénario et entrer un titre.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("student_project")
        .insert([
          {
            project_title: newProjectTitle,
            id_student: student.id_student,
            id_scenario: selectedScenario,
            project_status: "En cours",
          },
        ])
        .select(`
          id_project,
          project_title,
          project_status,
          project_data,
          created_at,
          updated_at,
          id_scenario,
          scenario:scenarios (
            scenario_title,
            scenario_description,
            scenario_image
          )
        `);

      if (error) throw error;

      setProjectList([...projectList, data[0]]);
      setShowModal(false);
      setNewProjectTitle("");
      setSelectedScenario("");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (project) => {
    setProjectToDelete(project);
    setShowDeleteModal(true);
  };


  const handleDelete = async () => {
    if (!projectToDelete) return;

    try {
      setDeleteLoading(true);

      const { error } = await supabase
        .from("student_project")
        .delete()
        .eq("id_project", projectToDelete.id_project);

      if (error) throw error;

      // Retirer localement sans recharger
      setProjectList(prev => prev.filter(p => p.id_project !== projectToDelete.id_project));

      setShowDeleteModal(false);
      setProjectToDelete(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };  

  return (
    <div>
      {fromEducator ?
        (<div className="back-button-container">
          <button className="back-button" onClick={() => navigate("/ProjectPageList")}>
            retour à la classe
          </button>
        </div>) :
        ('')}
      <div className="projects-container">
      <h2>Vos projets</h2>
      {projectList?.length === 0 && <p>Aucun projet pour le moment.</p>}

      <div className="projects-grid">
        {projectList
        ?.slice()
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .map((project) => (
          <div key={project.id_project} className="project-card">
            <Link
              to={`/projects/${studentId}/workspace/${project.id_project}`}
              state={{ fromEducator }}
              className="project-link"
            >
              <img
                src={
                  project.scenario?.scenario_image
                    ? `/${project.scenario.scenario_image}`
                    : defaultimage
                }
                alt={project.scenario?.scenario_title || "Scénario"}
                className="project-image"
              />

              <h3>{project.project_title}</h3>
              <p>Scénario : {project.scenario?.scenario_title}</p>
              <p>Dernière modification : {formatDateTime(project.updated_at)}</p>
            </Link>

            {fromEducator && (
              <button
                className="delete-btn"
                onClick={() => confirmDelete(project)}
              >
                ✖
              </button>
            )}
          </div>
        ))}
        {fromEducator && (<div className="add-project-wrapper">
          <button className="btn-new-project" onClick={() => setShowModal(true)}>
            <img
              src={imageAddPorject}
            />
          </button>
        </div>)}
      </div>
      </div>
      {fromEducator ?
        (<div className="back-button-container">
          <button className="back-button" onClick={() => navigate("/ProjectPageList")}>
            retour à la classe
          </button>
        </div>) :
        ('')}

    {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Créer un nouveau projet</h3>

            <label>Scénario :</label>
            <select
              value={selectedScenario}
              onChange={(e) => setSelectedScenario(e.target.value)}
            >
              <option value="">-- Sélectionnez --</option>
              {scenarioList.map((scene) => (
                <option key={scene.id_scenario} value={scene.id_scenario}>
                  {scene.scenario_title}
                </option>
              ))}
            </select>

            <label>Titre du projet :</label>
            <input
              type="text"
              value={newProjectTitle}
              onChange={(e) => setNewProjectTitle(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Annuler</button>
              <button onClick={handleCreateProject} disabled={loading}>
                {loading ? "Création..." : "Créer"}
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Supprimer ce projet ?</h3>
            <p style={{ textAlign: "center" }}>
              Cette action est <strong>définitive</strong>.
            </p>

            <div className="modal-actions">
              <button onClick={() => setShowDeleteModal(false)}>
                Annuler
              </button>

              <button onClick={handleDelete} disabled={deleteLoading}>
                {deleteLoading ? "Suppression..." : "Supprimer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}