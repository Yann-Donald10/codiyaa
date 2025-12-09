import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useEducator } from "../context/EducatorContext";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AssemblyArea from "../components/AssemblyArea";
import ExecutionArea from "../components/ExecutionArea";
import BlockType from "../components/BlockType";
import BlockList from "../components/BlockList";
import AssetList from "../components/AssetList";
import "../css/Workspace.css";
import NavBarStudent from '../components/NavbarStudent'
import NavBarproject from "../components/Navbarproject"
import start from "../assets/images/start.png"
import stop from "../assets/images/stop.png"

export default function WorkspacePage() {
  // selected block type id/name
  const { session_status, rangeType, handleChangeStatus, handleLogout } = useEducator();
  const [selectedType, setSelectedType] = useState(null);
  const { studentId, projectId } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState();
  const [student, setStudent] = useState(null);
  const location = useLocation();
  const fromEducator = location.state?.fromEducator || false;
  
  console.log(fromEducator)

  const mockBlocks = {
    motion: ["Move 10", "Turn 90", "Jump"],
    looks: ["Say hello", "Change color", "Hide"],
    sound: ["Play note", "Play drum", "Stop sound"],
  };

  const types = [
    { id: "motion", label: "Motion", color: "#fd9301" },
    { id: "looks", label: "Looks", color: "#ffac28" },
    { id: "sound", label: "Sound", color: "#ffd589" },
    { id: "control", label: "Control", color: "#ffebcd" },
  ];

  const handleTypeClick = (typeId) => {
    setSelectedType((prev) => (prev === typeId ? null : typeId));
  };

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

  console.log(student)

  useEffect(() => {
      const fetchProjectData = async () => {
        try {
          const { data, error } = await supabase
            .from("student_project")
            .select("*")
            .eq("id_project", projectId);
          if (error) throw error;
          setProjectData(data || []);
        } catch (err) {
          console.error(err);
        }
      };
      fetchProjectData();
    }, [projectId]);

  const blocksForSelected = selectedType ? (mockBlocks[selectedType] || []) : [];
  console.log(projectData)

  return (
    <div>
      {fromEducator? (
        <NavBarproject 
        session_status={session_status}
        handleChangeStatus={handleChangeStatus}
        rangeType={rangeType} />) : 
        (<NavBarStudent />)
      }
      <div className="header-line">
      <p className="welcome-text">
        <strong>{projectData?.[0].project_title} - {student?.student_firstname} {student?.student_lastname}</strong>
      </p>
      <button
        className="back-button"
        onClick={() =>
          navigate(`/projects/${student.id_student}`, {
            state: { fromEducator: !!fromEducator }
          })
        }
      >
        retour à liste
      </button>
    </div>
    <div className="workspace-page">
      <div className="exec-controls">
        <img
            src={start}
            alt="start button"
            className="exec-btn-start"
          />
          <img
            src={stop}
            alt="stop button"
            className="exec-btn-stop"
          />
      </div>
      <main className="workspace-main">
        <section className="left-column">
          <AssemblyArea />
          <BlockType
            types={types}
            selectedType={selectedType}
            onTypeClick={handleTypeClick}
          />
          <BlockList
            blocks={blocksForSelected}
            visible={!!selectedType}
          />
        </section>

        <aside className="right-column">
          <ExecutionArea />
          <AssetList />
        </aside>
      </main>
    </div>
    </div>
  );
}