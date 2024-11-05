import { Character } from "./character.model";
import imageWarrior from "/assets/images/characters/men_warriors/level_four.png";
import imageWarriorFemale from "/assets/images/characters/women_warriors/level_four.png";
import imageWizard from "/assets/images/characters/wizard_warriors/level_four.png";
import imageSamurai from "/assets/images/characters/samurai_warriors/level_four.png";
import * as menWarriorsJson from "../shared/localInfo/attacks/level_four/men-warrior.json";
import * as womenWarriorsJson from "../shared/localInfo/attacks/level_four/women-warrior.json";
import * as wizardWarriorsJson from "../shared/localInfo/attacks/level_four/wizard-warrior.json";
import * as samuraiWarriorsJson from "../shared/localInfo/attacks/level_four/samurai-warrior.json";
import { IBasicCharacter } from "../interfaces/character.interface";

export class Captain extends Character {
  constructor(character: IBasicCharacter) {
    super(character);
    this.name = character.name;
    this.type = character.type;
    this.level = 4;
    this.attacks = this.getAttacks(
      menWarriorsJson,
      womenWarriorsJson,
      wizardWarriorsJson,
      samuraiWarriorsJson
    );
    this.image = this.getImage(this.type, {
      imageWarrior,
      imageWarriorFemale,
      imageWizard,
      imageSamurai,
    });
    this.transformLiteralsTypes();
  }
}
