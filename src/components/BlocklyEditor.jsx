import React, { useEffect, useRef } from "react";
import * as Blockly from "blockly";
import { toolbox } from "../blockly/toolbox";

// IMPORTANT: importer les définitions de blocs AVANT inject
import "../blockly/blocks/movement";

export default function BlocklyEditor() {
  const divRef = useRef(null);

  useEffect(() => {
    const workspace = Blockly.inject(divRef.current, {
      toolbox,
      trashcan: true,
      scrollbars: true,
    });

    return () => workspace.dispose();
  }, []);

  return <div ref={divRef} style={{ height: 600, width: "100%" }} />;
}
