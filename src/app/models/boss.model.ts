
import { Captain } from "./captain.model";
import imageWarrior from '/assets/images/characters/men_warriors/level_five.png';
import imageWarriorFemale from '/assets/images/characters/women_warriors/level_five.png';
import imageWizard from '/assets/images/characters/wizard_warriors/level_five.png';

export class Boss extends Captain{
    constructor(character) { 
        super(character);
        this.name = character.name;
        this.type = character.type;
        this.level = 5;
        this.attackList = this.getAttacks([
            {
                "name": "Segador de almas",
                "types": ["mele", "fire", "twister", "magic", "ice", "water", "ray", "poison"],
                "points": "600"
            },
        ]);
        this.image = this.getImage(this.type, {
            imageWarrior,
            imageWarriorFemale,
            imageWizard
        });
        this.transformLiteralsTypes();
    }
}