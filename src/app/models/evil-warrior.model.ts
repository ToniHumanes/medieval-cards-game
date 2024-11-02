import { Character } from "./character.model";
import imageEvilWarrior from "/assets/images/characters/evil_warriors/level_one.png";
import * as evilWarriorsJson from "../shared/localInfo/attacks/evil-warrior/evil-warrior.json";
import { IBasicCharacter } from "../interfaces/character.interface";
import { WarriorTypes } from "../enums/warriorTypes";

export class EvilWarrior extends Character {
  constructor(character: IBasicCharacter) {
    super(character);
    this.name = character.name;
    this.type = WarriorTypes.DEMON;
    this.level = 5;
    this.attacks = this.getAttacks(evilWarriorsJson);
    this.image = this.getImage(imageEvilWarrior);
  }

  getAttacks(evilWarriorsJson) {
    return this.mapAttacks(evilWarriorsJson.default);
  }

  getImage(imageEvilWarrior: string) {
    return imageEvilWarrior;
  }
}
