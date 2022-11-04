import { AttackInterface } from "./attack.interface";

export interface Character{
    name: string;
    type: string;
    level: number;
    attacks: Array<AttackInterface>
} 