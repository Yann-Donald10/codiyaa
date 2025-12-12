import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useEducator } from "../context/EducatorContext";
import AssemblyArea from "../components/AssemblyArea";
import ExecutionArea from "../components/ExecutionArea";
import AssetList from "../components/AssetList";
import "../css/Workspace.css";
import NavBarStudent from '../components/NavbarStudent'
import NavBarproject from "../components/Navbarproject"
import start from "../assets/images/start.png";
import stop from "../assets/images/stop.png";
import { toolboxJson } from "../components/Blockly/ToolBox";
import * as DecorAssets from '../assets/images/decors'; // Assurez-vous d'avoir un index.js qui exporte toutes les images
import * as IconAssets from '../assets/images/icones';


export default function WorkspacePage() {

  const assemblyRef = useRef(null);

  const { session_status, rangeType, handleChangeStatus } = useEducator();
  const { studentId, projectId } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState();
  const [student, setStudent] = useState(null);
  const location = useLocation();
  const fromEducator = location.state?.fromEducator || false;
  const [selectedSprite, setSelectedSprite] = useState('Homme'); // Default: Person.png
  const [selectedBackground, setSelectedBackground] = useState('Cours'); // Default: Beach.png
    
    // Fonctions de sélection passées à AssetList
    const handleSpriteSelect = (name) => setSelectedSprite(name);
    const handleBackgroundSelect = (name) => setSelectedBackground(name);

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
    const saveInterval = setInterval(autoSave, 30000); // 30 secondes
    const handleBeforeUnload = (event) => {
        // Exécuter une sauvegarde synchrone de dernière minute
        autoSave();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // 3. Cleanup: Nettoyer l'intervalle et l'écouteur d'événement au démontage
    return () => {
        clearInterval(saveInterval);
        window.removeEventListener('beforeunload', handleBeforeUnload);
        
        // Sauvegarde finale lors de la navigation (avant le démontage du composant)
        autoSave();
    };
  }, [projectId]);

// ------------------------------------------------------------------

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const { data, error } = await supabase
        .from("student_project")
        .select("*")
        .eq("id_project", projectId);
        if (error) throw error;
        if (data && data.length > 0) {
          setProjectData(data[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjectData();
  }, [projectId]);

  console.log(projectData)

  // Fonction pour sauvegarder les données du projet dans Supabase
  const saveProjectData = async (dataToSave) => {
    if (!projectId || !dataToSave) return;
      try {
          const { error } = await supabase
              .from("student_project")
              .update({ project_data: dataToSave, updated_at: new Date() })
              .eq("id_project", projectId);

          if (error) throw error;
          console.log("Auto-save successful.");
      } catch (err) {
          console.error("Error during auto-save:", err.message);
      }
  };

  const autoSave = () => {
    const jsonString = assemblyRef.current?.saveWorkspace();
    if (jsonString) {
        saveProjectData(jsonString);
    }
  };


 
  return (
    <div>
      {fromEducator ? (
        <NavBarproject
          session_status={session_status}
          handleChangeStatus={handleChangeStatus}
          rangeType={rangeType}
        />
      ) : (
        <NavBarStudent />
      )}

      <div className="header-line">
        <p className="welcome-text">
        <strong>{projectData?.project_title} - {student?.student_firstname} {student?.student_lastname}</strong>
      </p>

        <button
          className="back-button"
          onClick={() =>
            navigate(`/projects/${student?.id_student}`, {
              state: { fromEducator }
            })
          }
        >
          retour à liste
        </button>
      </div>

      <div className="workspace-page">
        <div className="exec-controls">
          <img src={start} alt="start button" className="exec-btn-start" />
          <img src={stop} alt="stop button" className="exec-btn-stop" />
        </div>

        <main className="workspace-main">
          <section className="left-column">

            <AssemblyArea ref={assemblyRef} toolbox={toolboxJson} initialWorkspaceData={projectData?.project_data}/>
          </section>

          <aside className="right-column">
            <ExecutionArea
              selectedSprite={selectedSprite} 
              selectedBackground={selectedBackground}
              // Vous devrez passer les objets d'assets réels ici
              spritePath={IconAssets[selectedSprite]} 
              backgroundPath={DecorAssets[selectedBackground]}
            />
                
            {/* 🚀 Passer les gestionnaires d'événements à AssetList */}
            <AssetList 
              selectedSprite={selectedSprite}
              selectedBackground={selectedBackground}
              onSpriteSelect={handleSpriteSelect}
              onBackgroundSelect={handleBackgroundSelect}
              allIconAssets={Object.keys(IconAssets)} // Liste des noms
              allDecorAssets={Object.keys(DecorAssets)} // Liste des noms
              iconAssetMap={IconAssets} 
              decorAssetMap={DecorAssets}
            />
          </aside>
        </main>
      </div>
    </div>
  );
}
