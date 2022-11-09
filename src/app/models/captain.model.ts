
import { Soldier } from "./soldier.model";
import imageWarrior from '/assets/images/characters/men_warriors/level_four.png';
import imageWarriorFemale from '/assets/images/characters/women_warriors/level_four.png';
import imageWizard from '/assets/images/characters/wizard_warriors/level_four.png';

export class Captain extends Soldier{
    constructor(character) { 
        super(character);
        this.name = character.name;
        this.type = character.type;
        this.level = 4;
        this.attackList = this.getAttacks([
            {
                "name": "Corte tornado de fuego",
                "types": ["mele", "fire", 'twister'],
                "points": "600"
            },
            {
                "name": "Veneno aterrador",
                "types": ["poison"],
                "points": "300"
            },
            {
                "name": "Espadon del oceano",
                "types": ["mele", "water", "twister"],
                "points": "1000"
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