import { IAttack } from "./attack.interface";

export interface IBasicCharacter {
  name: string;
  type?: string;
}

export interface ICharacter extends IBasicCharacter {
  level: number;
  attacks: Array<IAttack>;
  image: string;
}
