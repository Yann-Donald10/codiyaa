import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import Navbarproject from "../components/Navbarproject";
import ProjectList from "../components/ProjectList";

import "../css/ProjectListPage.css"; 

const ProjectListPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [session_status, set_session_status] = useState();
  const [educator_range, set_educator_range] = useState();
  const [rangelist, set_rangelist] = useState([]);
  const [rangeType, set_rangeType] = useState();

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
    if (user) fetchProjects();
  }, [user, session_status]);

  useEffect(() => {
    const fetchSessionStatus = async () => {
      try {
        const { data, error } = await supabase
          .from("educator")
          .select("session_status, id_range")
          .eq("id_educator", user.id)
          .single();

        if (error) throw error;
        set_session_status(data?.session_status || false);
        set_educator_range(data.id_range);
      } catch (err) {
        setError(err.message);
      }
    };

    if (user) fetchSessionStatus();
  }, [user]);

  useEffect(() => {
    const fetchRange = async () => {
      try {
        const { data, error } = await supabase
          .from("range")
          .select("id_range, range_name");

        if (error) throw error;
        set_rangelist(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (user) fetchRange();
  }, [user]);

  useEffect(() => {
    if (!educator_range || rangelist.length === 0) return;
    const range = rangelist.find((r) => r.id_range === educator_range);
    set_rangeType(range?.range_name);
  }, [educator_range, rangelist]);

  const handleChangeStatus = async (newStatus) => {
    const { error: updateError } = await supabase
      .from("educator")
      .update({ session_status: newStatus })
      .eq("id_educator", user.id);

    if (updateError) {
      console.error(updateError);
      return;
    }

    if (newStatus === true) {
      const { data: students, error: studentError } = await supabase
        .from("student")
        .select("id_student")
        .eq("id_educator", user.id);

      if (studentError) {
        console.error(studentError);
        return;
      }

      const updates = students.map((student) => ({
        id_student: student.id_student,
        student_code: Math.floor(1000 + Math.random() * 9000).toString(),
      }));

      const { error: batchError } = await supabase
        .from("student")
        .upsert(updates, { onConflict: "id_student" });

      if (batchError) {
        console.error(batchError);
        return;
      }

      console.log("Codes générés :", updates);
    }

    await fetchProjects();
    set_session_status(newStatus);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Erreur logout :", error);
    else navigate("/home");
  };

  if (!user) return <p className="project-page-loading">Chargement...</p>;

  return (
    <div className="project-page">
      <Navbarproject
        session_status={session_status}
        handleLogout={handleLogout}
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
