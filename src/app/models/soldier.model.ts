import { Recruit } from "./recruit.model";
import imageWarrior from "/assets/images/characters/men_warriors/level_three.png";
import imageWarriorFemale from "/assets/images/characters/women_warriors/level_three.png";
import imageWizard from "/assets/images/characters/wizard_warriors/level_three.png";
import imageSamurai from "/assets/images/characters/samurai_warriors/level_three.png";
import * as menWarriorsJson from "../shared/localInfo/attacks/level_three/men-warrior.json";
import * as womenWarriorsJson from "../shared/localInfo/attacks/level_three/women-warrior.json";
import * as wizardWarriorsJson from "../shared/localInfo/attacks/level_three/wizard-warrior.json";
import * as samuraiWarriorsJson from "../shared/localInfo/attacks/level_three/samurai-warrior.json";
import { IBasicCharacter } from "../interfaces/character.interface";

export class Soldier extends Recruit {
  constructor(character: IBasicCharacter) {
    super(character);
    this.name = character.name;
    this.type = character.type;
    this.level = 3;
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
