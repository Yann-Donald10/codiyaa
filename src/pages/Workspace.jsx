import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AssemblyArea from "../components/AssemblyArea";
import ExecutionArea from "../components/ExecutionArea";
import BlockType from "../components/BlockType";
import BlockList from "../components/BlockList";
import AssetList from "../components/AssetList";
import "../css/Workspace.css";
import NavBarStudent from '../components/NavbarStudent'

export default function WorkspacePage() {
  // selected block type id/name
  const [selectedType, setSelectedType] = useState(null);
  const { studentId, projectId } = useParams();
  // example list of blocks for the selected type (simple mock)
  const mockBlocks = {
    motion: ["Move 10", "Turn 90", "Jump"],
    looks: ["Say hello", "Change color", "Hide"],
    sound: ["Play note", "Play drum", "Stop sound"],
  };

  const types = [
    { id: "motion", label: "Motion" },
    { id: "looks", label: "Looks" },
    { id: "sound", label: "Sound" },
    { id: "control", label: "Control" },
  ];

  const handleTypeClick = (typeId) => {
    setSelectedType((prev) => (prev === typeId ? null : typeId));
  };

  const blocksForSelected = selectedType ? (mockBlocks[selectedType] || []) : [];

  return (
    <div>
      <NavBarStudent />
      <p className="welcome-text"><strong>{projectId} </strong></p>
    <div className="workspace-page">
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