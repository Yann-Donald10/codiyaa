import * as Blockly from "blockly/core";
import eventIcon from "../../assets/images/Evenements.png";
import moveIcon from "../../assets/images/Mouvement.png";
import opIcon from "../../assets/images/Operations.png";
import soundIcon from "../../assets/images/Son.png";
import conditionIcon from "../../assets/images/Conditions.png";
import logo from "../../assets/images/default.png";

const CATEGORY_ICONS = {
  event: eventIcon,
  movement: moveIcon,
  operation: opIcon,
  sound: soundIcon,
  condition: conditionIcon,
};

export class CustomCategory extends Blockly.ToolboxCategory {
  constructor(categoryDef, toolbox, opt_parent) {
    super(categoryDef, toolbox, opt_parent);
    this.iconKey_ = categoryDef.icon;
  }

  /** Cache le texte */
  createLabelDom_(name) {
    const label = super.createLabelDom_(name);
    label.style.display = "none"; 
    return label;
  }

  /** Icône personnalisée */
  createIconDom_() {
    const iconImg = document.createElement("img");

    iconImg.src =
      CATEGORY_ICONS[this.iconKey_] || CATEGORY_ICONS.event;

    iconImg.alt = this.iconKey_;
    iconImg.width = 100;
    iconImg.height = 70;
    iconImg.style.pointerEvents = "none";

    return iconImg;
  }

  /** Gestion sélection */
  setSelected(isSelected) {
    this.rowDiv_.style.backgroundColor = isSelected
      ? "white"
      : this.colour_;

    Blockly.utils.aria.setState(
      this.htmlDiv_,
      Blockly.utils.aria.State.SELECTED,
      isSelected
    );
  }
}