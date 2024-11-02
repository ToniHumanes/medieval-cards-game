import imageWarrior from "/assets/images/characters/men_warriors/level_one.png";
import imageWarriorFemale from "/assets/images/characters/women_warriors/level_one.png";
import imageWizard from "/assets/images/characters/wizard_warriors/level_one.png";
import imageSamurai from "/assets/images/characters/samurai_warriors/level_one.png";
import { Attack } from "../../app/models/attack.model";
import * as menWarriorsJson from "../shared/localInfo/attacks/level_one/men-warrior.json";
import * as womenWarriorsJson from "../shared/localInfo/attacks/level_one/women-warrior.json";
import * as wizardWarriorsJson from "../shared/localInfo/attacks/level_one/wizard-warrior.json";
import * as samuraiWarriorsJson from "../shared/localInfo/attacks/level_one/samurai-warrior.json";
import { IBasicCharacter, ICharacter } from "../interfaces/character.interface";
import { IAttack } from "../interfaces/attack.interface";
import { IAvatarImage } from "../interfaces/avatarImage.interface";
import { WarriorTypes } from "../enums/warriorTypes";

export class Character implements ICharacter {
  name: string;
  type: string;
  level: number;
  image: string;
  attacks: IAttack[];

  constructor({ name, type }: IBasicCharacter) {
    this.name = name;
    this.type = type;
    this.level = 1;
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

  getImage(type: string, images: IAvatarImage) {
    const typeWarrior = {
      1: images.imageWarrior,
      2: images.imageWarriorFemale,
      3: images.imageWizard,
      4: images.imageSamurai,
    };
    return typeWarrior[type];
  }

  getAttacks(
    menWarriorsJson: IAttack[],
    womenWarriorsJson: IAttack[],
    wizardWarriorsJson: IAttack[],
    samuraiWarriorsJson: IAttack[]
  ) {
    const attackList = {
      "1": menWarriorsJson,
      "2": womenWarriorsJson,
      "3": wizardWarriorsJson,
      "4": samuraiWarriorsJson,
    };
    return this.mapAttacks(attackList[this.type].default);
  }

  mapAttacks(attacks: IAttack[]): Attack[] {
    return attacks.map((attack) => new Attack(attack));
  }

  transformLiteralsTypes() {
    const warriorTypes = {
      1: WarriorTypes.WARRIOR,
      2: WarriorTypes.FEMALE_WARRIOR,
      3: WarriorTypes.WIZARD,
      4: WarriorTypes.SAMURAI,
    };
    this.type = warriorTypes[this.type];
  }
}
