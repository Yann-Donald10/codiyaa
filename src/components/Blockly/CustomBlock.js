// src/components/Blockly/CustomBlockDefinitions.js

import * as Blockly from 'blockly/core';

import { javascriptGenerator } from 'blockly/javascript';
import 'blockly/blocks'; // S'assurer que les blocs de base sont chargés si nécessaires



const myBlocks = [
  {
    "name": "mon_bloc",
    "text": "image",
    "imageUrl": "",
    "color": "#eb7b0c",
    "output": "Male"
  },
   {
    "name": "mon_bloc1",
    "text": "BONJOUR",
    "imageUrl": "",
    "color": "#eb7b0c",
    "output": "Female"
  },
  // mon_bloc3
  {
    "name": "mon_bloc3",
    "text": "",
    // ... base64 data de l'image ...
    "imageUrl": "data:image/png;base64,iVBORw0KGgoAAAA...",
    "color": "#eb7b0c",
    "output": "Female"
  }
];

// Boucle pour définir l'apparence et le code JavaScript
myBlocks.forEach(b => {
  
  // Définition de l'Apparence (Blockly.Blocks) - Reste inchangée
  Blockly.Blocks[b.name] = {
    init: function() {
      const input = this.appendDummyInput();
      if (b.imageUrl) {
        // 
        input.appendField(new Blockly.FieldImage(b.imageUrl, 40, 40, "*"));
      } else {
        input.appendField(b.text);
      }
      // Logique pour l'output (valeur) ou les statements (connexion)
      if (["String", "Number", "Boolean", "Array", "Colour", "Male"].includes(b.output)) {
        this.setOutput(true, b.output);
      } else if (b.output === "Female") {
        this.appendValueInput("INPUT").setCheck("Male");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
      } else {
        this.setPreviousStatement(true);
        this.setNextStatement(true);
      }
      this.setColour(b.color);
    }
  };

  // Définition de la Génération de Code (Blockly.JavaScript)
  // 🛑 CORRECTION : Utilisation de javascriptGenerator
  javascriptGenerator.forBlock[b.name] = (block) => {
    
    // Si c'est un bloc qui retourne une valeur (output)
    if (b.output && b.output !== 'Female') {
        // 
        return [`'${b.text}'`, javascriptGenerator.ORDER_ATOMIC];
    }
    
    // Pour les blocs de type Statement (connexion précédente/suivante)
    // 
    return `// Code pour ${b.name} s'exécute ici;\n`;
  };
});

// Ce fichier DOIT exporter quelque chose (même vide) pour être importé
export const CustomBlocksReady = true;