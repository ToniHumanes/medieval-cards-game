
import imageWarrior from '/assets/images/characters/men_warriors/level_one.png';
import imageWarriorFemale from '/assets/images/characters/women_warriors/level_one.png';
import imageWizard from '/assets/images/characters/wizard_warriors/level_one.png';

import { Attack } from '../../app/models/attack.model';

export class Character {
    name: string;
    type: string;
    level: number;
    attackList: any;
    image: string;

    constructor({
        name,
        type
    }) {
        this.name = name;
        this.type = type;
        this.level = 1;
        this.attackList = this.getAttacks();
        this.image = this.getImage(this.type);
        this.transformLiteralsTypes();

    }

    private getImage(type: string) {
        const typeWarrior = {
            1: imageWarrior,
            2: imageWarriorFemale,
            3: imageWizard
        }
        return typeWarrior[type];
    }

    private getAttacks() {
        const attackItem = new Attack({
            "name": "Corte de la espada de fuego",
            "types": ["mele", "fire"],
            "points": "100"
        });
        return [attackItem];
    }

    private transformLiteralsTypes(){
        const typeWarrior = {
            1: 'Guerrero',
            2: 'Guerrera',
            3: 'Mago'
        }
        this.type = typeWarrior[this.type];
    }


}