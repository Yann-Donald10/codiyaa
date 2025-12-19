import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as Blockly from "blockly/core";
import "blockly/blocks";
import "blockly/javascript";
import { CustomCategory } from "./Blockly/CustomCategory.js";
import * as Fr from 'blockly/msg/fr';
import {
  registerEventBlocks,
  registerMovementBlocks,
  registerOperationBlocks,
  registerSoundBlocks,
  registerConditionBlocks
} from "../components/Blockly/blocks";

const AssemblyArea = forwardRef(({ toolbox,  initialWorkspaceData }, ref) => {
  const blocklyDivRef = useRef(null);
  const workspaceRef = useRef(null);
  
  useEffect(() => {
    registerEventBlocks(Blockly);
    registerMovementBlocks(Blockly);
    registerOperationBlocks(Blockly);
    registerSoundBlocks(Blockly);
    registerConditionBlocks(Blockly);
  }, []);

  useImperativeHandle(ref, () => ({
    addBlock: (type, x = 50, y = 50) => {
      if (!workspaceRef.current) return;
      const block = workspaceRef.current.newBlock(type);
      block.initSvg();
      block.render();
      block.moveBy(x, y);
    },
    getWorkspace: () => workspaceRef.current,
    saveWorkspace: saveWorkspace,
    loadWorkspace: loadWorkspace,
  }));

  useEffect(() => {
    Blockly.registry.register(
    Blockly.registry.Type.TOOLBOX_ITEM,
    Blockly.ToolboxCategory.registrationName,
    CustomCategory, true);
    if (Fr) {
        Blockly.setLocale(Fr);
    }
    workspaceRef.current = Blockly.inject(blocklyDivRef.current, {
      toolbox: toolbox,
      trashcan: true,
      scrollbars: true,
      renderer: "geras",
      horizontalLayout: true, 
      toolboxPosition: Blockly.utils.toolbox.Position.BOTTOM,
      move: { scrollbars: true, drag: true, wheel: true },
      zoom: { controls: true, wheel: true }, 
    });

     if (initialWorkspaceData) {
            loadWorkspace(initialWorkspaceData);
            console.log("chargement du projet")
        }

    const resizeObserver = new ResizeObserver(() => {
      Blockly.svgResize(workspaceRef.current);
    });
    resizeObserver.observe(blocklyDivRef.current);

    return () => {
      resizeObserver.disconnect();
      workspaceRef.current?.dispose();
    };
  }, [toolbox,  initialWorkspaceData]);

  useEffect(() => {
    const resize = () => {
      if (workspaceRef.current) Blockly.svgResize(workspaceRef.current);
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const loadWorkspace = (jsonString) => {
        if (!workspaceRef.current || !jsonString) return;

        try {
            const state = JSON.parse(jsonString);
            Blockly.serialization.workspaces.load(state, workspaceRef.current);
            console.log("Workspace loaded successfully.");
        } catch (error) {
            console.error("Error loading Blockly state:", error);
            // Si le chargement échoue, on démarre avec un espace vide.
        }
    };

  const saveWorkspace = () => {
        if (!workspaceRef.current) return null;
        
        const state = Blockly.serialization.workspaces.save(workspaceRef.current);
        const jsonString = JSON.stringify(state);
        return jsonString; // Retourne le JSON string prêt à être stocké
    };

  return (
    <div className="workspace-area" style={{ flex: 1, height: "600px" }}>
      <div ref={blocklyDivRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
});

export default AssemblyArea;
