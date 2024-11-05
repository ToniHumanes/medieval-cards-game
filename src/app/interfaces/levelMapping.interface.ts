import { Character } from "../models/character.model";

export interface LevelMapping {
  methodClass: typeof Character;
  eventEmitNumber: number;
}
