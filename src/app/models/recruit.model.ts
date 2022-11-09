

import { Character } from "./character.model";
import imageWarrior from '/assets/images/characters/men_warriors/level_two.png';
import imageWarriorFemale from '/assets/images/characters/women_warriors/level_two.png';
import imageWizard from '/assets/images/characters/wizard_warriors/level_two.png';

export class Recruit extends Character{
    constructor(character) { 
        super(character);
        this.name = character.name;
        this.type = character.type;
        this.level = 2;
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