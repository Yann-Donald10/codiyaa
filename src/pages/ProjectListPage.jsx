import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useEducator } from "../context/EducatorContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import Navbarproject from "../components/Navbarproject";
import ProjectList from "../components/ProjectList";
import "../css/ProjectListPage.css"; 

const ProjectListPage = () => {

  const { session_status, rangeType, handleChangeStatus} = useEducator();

  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("student")
        .select(
          "id_student, student_firstname, student_lastname, student_code, url_project"
        )
        .eq("id_educator", user.id);

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) 
      fetchProjects();
  }, [user, session_status]);
  
  if (!user) return <p className="project-page-loading">Chargement...</p>;

  return (
    <div className="project-page">
      <Navbarproject
        session_status={session_status}
        handleChangeStatus={handleChangeStatus}
        rangeType={rangeType}
      />

      <main className="project-page-main">
        <ProjectList
          loading={loading}
          error={error}
          projects={projects}
          fetchProjects={fetchProjects}
          session_status={session_status}
        />
      </main>
    </div>
  );
};

export default ProjectListPage;
