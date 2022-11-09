
import { Recruit } from "./recruit.model";
import imageWarrior from '/assets/images/characters/men_warriors/level_three.png';
import imageWarriorFemale from '/assets/images/characters/women_warriors/level_three.png';
import imageWizard from '/assets/images/characters/wizard_warriors/level_three.png';

export class Soldier extends Recruit{
    constructor(character) { 
        super(character);
        this.name = character.name;
        this.type = character.type;
        this.level = 3;
        this.attackList = this.getAttacks([
            {
                "name": "Corte de la espada de fuego",
                "types": ["mele", "fire"],
                "points": "100"
            },
            {
                "name": "Corte de la espada de hielo",
                "types": ["mele", "ice"],
                "points": "200"
            },
            {
                "name": "Corte magico de la espada del trueno",
                "types": ["mele", "ray", "magic"],
                "points": "200"
            }
        ]);
        this.image = this.getImage(this.type, {
            imageWarrior,
            imageWarriorFemale,
            imageWizard
        });
        this.transformLiteralsTypes();
    }
}