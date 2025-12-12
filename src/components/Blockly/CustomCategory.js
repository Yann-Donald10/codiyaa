import * as Blockly from "blockly/core";
import logo from "../../assets/images/default.png";

export class CustomCategory extends Blockly.ToolboxCategory {
    /**
       * Constructor for a custom category.
       * @override
       */
    constructor(categoryDef, toolbox, opt_parent) {
        super(categoryDef, toolbox, opt_parent);
    }

    addColourBorder_(colour){
        this.rowDiv_.style.backgroundColor = colour;
    }

    /**
       * Inverse les couleurs à la sélection/désélection.
       * @override
       */
      setSelected(isSelected) {
        const labelDom = this.rowDiv_.getElementsByClassName(
          'blocklyToolboxCategoryLabel',
        )[0];
        const iconDom = this.iconDom_ || this.rowDiv_.getElementsByClassName('blocklyTreeIcon')[0]; // Ciblage plus robuste de l'icône

        if (isSelected) {
          // État SÉLECTIONNÉ : Fond blanc, Texte et Icône colorés
          this.rowDiv_.style.backgroundColor = 'white';
          if (labelDom) labelDom.style.color = this.colour_;
        if (iconDom) iconDom.style.color = this.colour_;
        } else {
          // État DÉSÉLECTIONNÉ : Fond coloré, Texte et Icône blancs
          this.rowDiv_.style.backgroundColor = this.colour_;
          if (labelDom) labelDom.style.color = 'white';
        if (iconDom) iconDom.style.color = 'white';
        }
        Blockly.utils.aria.setState(
          /** @type {!Element} */ (this.htmlDiv_),
          Blockly.utils.aria.State.SELECTED,
          isSelected,
        );
      }

      /**
       * Crée l'élément DOM pour l'icône (si vous l'utilisez).
       * @override
       */
      createIconDom_() {
        const iconImg = document.createElement('img');
        iconImg.src = logo; // Assurez-vous que ce chemin est correct
        iconImg.alt = 'Blockly Logo';
        iconImg.width = '25';
        iconImg.height = '25';
        return iconImg;
      }
}