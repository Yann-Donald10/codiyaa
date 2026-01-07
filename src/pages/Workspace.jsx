import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useEducator } from "../context/EducatorContext";
import AssemblyArea from "../components/AssemblyArea";
import ExecutionArea from "../components/ExecutionArea";
import AssetList from "../components/AssetList";
import "../css/Workspace.css";
import NavBarStudent from '../components/NavbarStudent';
import NavBarproject from "../components/Navbarproject";
import start from "../assets/images/start.png";
import stop from "../assets/images/stop.png";
import { toolboxJson } from "../components/Blockly/ToolBox";
import * as DecorAssets from '../assets/images/decors';
import * as IconAssets from '../assets/images/icones';
import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import BlocklyInterpreter from "../components/engine/interpreter";
import runtimeApi from "../components/engine/runtimeApi";


export default function WorkspacePage() {
  const assemblyRef = useRef(null);
  const { session_status, rangeType, handleChangeStatus } = useEducator();
  const { studentId, projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fromEducator = location.state?.fromEducator || false;

  const [loading, setLoading] = useState(true);
  const [projectData, setProjectData] = useState(null);
  const [student, setStudent] = useState(null);
  const interpreterRef = useRef(null);
  
  const executionRef = useRef(null);

  useEffect(() => {
    if (executionRef.current) {
      runtimeApi.bindSprite(executionRef.current);
    }
  }, [executionRef.current]);



  const [visualState, setVisualState] = useState({
    sprite: "Homme",
    background: "Default",
    x: null,
    y: null,
  });

  const spritePositionRef = useRef({ x: null, y: null });

  // ----------------- Sauvegarde -----------------
  const saveProjectData = async (dataToSave) => {
    if (!projectId || !dataToSave) return;
    try {
      const { error } = await supabase
        .from("student_project")
        .update({ project_data: dataToSave, updated_at: new Date() })
        .eq("id_project", projectId);
      if (error) throw error;
      console.log("Project data auto-saved.");
    } catch (err) {
      console.error("Error during project auto-save:", err.message);
    }
  };

  const saveAssetProject = async (assetData) => {
    if (!projectId || !assetData) return;
    try {
      const { error } = await supabase
        .from("student_project")
        .update({ asset_project: assetData, updated_at: new Date() })
        .eq("id_project", projectId);
      console.log(assetData)
      if (error) throw error;
      console.log("Asset project saved.");
    } catch (err) {
      console.error("Error saving asset project:", err.message);
    }
  };

  const autoSave = useCallback((stateOverride = null) => {
    const jsonString = assemblyRef.current?.saveWorkspace();
    if (jsonString) saveProjectData(jsonString);
    saveAssetProject(stateOverride || visualState);
  }, [visualState]);

  // ----------------- Handlers -----------------
  const handleSpriteSelect = (name) => {
    setVisualState(prev => {
      const updated = { ...prev, sprite: name };
      autoSave(updated); // Sauvegarde immédiate
      return updated;
    });
  };

  const handleBackgroundSelect = (name) => {
    setVisualState(prev => {
      const updated = { ...prev, background: name };
      autoSave(updated); // Sauvegarde immédiate
      return updated;
    });
  };

  const handleSpritePositionChange = (x, y) => {
    spritePositionRef.current = { x, y };
    setVisualState(prev => {
      const updated = { ...prev, x, y };
      autoSave(updated); // Sauvegarde immédiate
      return updated;
    });
  };

  console.log(visualState)
  // ----------------- Initialisation -----------------
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: studentData, error: studentError } = await supabase
          .from("student")
          .select("id_student, student_firstname, student_lastname, id_educator")
          .eq("id_student", studentId)
          .single();
        if (studentError || !studentData) return navigate("/");

        setStudent(studentData);

        if (!fromEducator) {
          const { data: educator, error: educatorError } = await supabase
            .from("educator")
            .select("session_status")
            .eq("id_educator", studentData.id_educator)
            .single();
          if (educatorError || !educator?.session_status) return navigate("/");
        }

        // Récupération des données du projet
        const { data: projectList, error: projectError } = await supabase
          .from("student_project")
          .select("*")
          .eq("id_project", projectId);

        if (projectError || !projectList || projectList.length === 0) return navigate("/");

        const project = projectList[0];
        setProjectData(project);

        // Charger asset_project
        let assetData = { sprite: "Homme", background: "Default", x: null, y: null };
        if (project.asset_project) {
          try {
            assetData = typeof project.asset_project === "string"
              ? JSON.parse(project.asset_project)
              : project.asset_project;
          } catch (e) {
            console.error("Error parsing asset_project:", e);
          }
        }

        setVisualState({
          sprite: assetData.sprite || "Homme",
          background: assetData.background || "Default",
          x: assetData.x?? 5,
          y: assetData.y?? 120,
        });

        setLoading(false);

      } catch (err) {
        console.error(err);
        navigate("/");
      }
    };

    checkSession();
  }, [studentId, projectId, navigate, fromEducator]);

  // ----------------- Auto-save périodique -----------------
  useEffect(() => {
    if (loading) return;
    const interval = setInterval(autoSave, 10000);
    const handleBeforeUnload = () => autoSave();
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      autoSave();
    };
  }, [autoSave, loading]);

  const handleStart = () => {
  if (!executionRef.current) {
    console.warn("Sprite not ready");
    return;
  }

  executionRef.current.reset();
  runtimeApi.bindSprite(executionRef.current); // 🔥 ICI
  runtimeApi.bindInterpreter(interpreterRef.current);

  interpreterRef.current?.stop();

  const workspace = assemblyRef.current?.getWorkspace();
  if (!workspace) return;

  javascriptGenerator.init(workspace);

  const startBlock = workspace
    .getTopBlocks(true)
    .find(b => b.type === "event_start");

  if (!startBlock) return;

  const first = startBlock.getNextBlock();
  if (!first) return;

  const code = javascriptGenerator.blockToCode(first);
  console.log("Generated code:\n", code);

  interpreterRef.current = new BlocklyInterpreter(runtimeApi);
  interpreterRef.current.run(code);
};





  const handleStop = () => {
    runtimeApi.stopProgram();
  };



  if (loading) return <div className="loading">Chargement...</div>;

  // ----------------- Rendu -----------------
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
          <strong>
            {projectData?.project_title} - {student?.student_firstname} {student?.student_lastname}
          </strong>
        </p>

        <button
          className="back-button"
          onClick={() => {
            autoSave();
            navigate(`/projects/${student?.id_student}`, { state: { fromEducator } });
          }}
        >
          retour à liste
        </button>
      </div>

      <div className="workspace-page">
        <div className="exec-controls">
          <img src={start} onClick={handleStart} alt="start button" className="exec-btn-start" />
          <img src={stop} alt="stop button" onClick={handleStop} className="exec-btn-stop" />
        </div>

        <main className="workspace-main">
          <section className="left-column">
            <AssemblyArea
              ref={assemblyRef}
              toolbox={toolboxJson}
              initialWorkspaceData={projectData?.project_data}
            />
          </section>

          <aside className="right-column">
            <ExecutionArea
            ref={executionRef}
              selectedSprite={visualState.sprite}
              spritePath={IconAssets[visualState.sprite]}
              backgroundPath={DecorAssets[visualState.background]}
              spriteX={visualState.x}
              spriteY={visualState.y}
              onSpritePositionChange={handleSpritePositionChange}
            />

            <AssetList
              selectedSprite={visualState.sprite}
              selectedBackground={visualState.background}
              onSpriteSelect={handleSpriteSelect}
              onBackgroundSelect={handleBackgroundSelect}
              allIconAssets={Object.keys(IconAssets)}
              allDecorAssets={Object.keys(DecorAssets)}
              iconAssetMap={IconAssets}
              decorAssetMap={DecorAssets}
            />
          </aside>
        </main>
      </div>
    </div>
  );
}
