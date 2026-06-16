import { IAttack } from "../interfaces/attack.interface";

export class Attack implements IAttack {
  name: string;
  points: number;
  types: string[];

  constructor({ name, points, types }: IAttack) {
    this.name = name;
    this.points = points;
    this.types = this._getTypes(types);
  }

  private _getTypes(typesList: Array<string>): Array<string> {
    const typesListBuilded = [];
    const listTypesAttacks = {
      mele: "🗡",
      fire: "🔥",
      twister: "🌪",
      magic: "✨",
      ice: "❄️",
      water: "💧",
      ray: "⚡️",
      poison: "🐍",
      distance: "🎯",
      terror: "😱",
      rock: "⛰",
      shield: "🛡",
      mindControl: "🧠",
      sun: "☀",
      dark: "👹",
      volcano: "🌋",
      purity: "👼",
    };
    for (const type of typesList) {
      if (listTypesAttacks[type]) {
        typesListBuilded.push(listTypesAttacks[type]);
      } else {
        throw Error("This type not exist");
      }
    }
    return typesListBuilded;
  }
}
