export interface IAttack {
  name: string;
  types: string[];
  points: number;
  default?: IAttack[];
}
