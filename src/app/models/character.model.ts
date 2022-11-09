
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
        this.attackList = this.getAttacks([
            {
                "name": "Corte de la espada de fuego",
                "types": ["mele", "fire"],
                "points": "100"
            }
        ]);
        this.image = this.getImage(this.type, {
            imageWarrior,
            imageWarriorFemale,
            imageWizard
        });
        this.transformLiteralsTypes();
    }

    getImage(type: string, images) {
        const typeWarrior = {
            1: images.imageWarrior,
            2: images.imageWarriorFemale,
            3: images.imageWizard
        }
        return typeWarrior[type];
    }

    getAttacks(attacks) {
        const attacksList = [];
        attacks.map( attack => {
            const attackItem = new Attack(attack);
            attacksList.push(attackItem);
        });
        return attacksList;
    }

    transformLiteralsTypes(){
        const typeWarrior = {
            1: 'Guerrero',
            2: 'Guerrera',
            3: 'Mago'
        }
        this.type = typeWarrior[this.type];
    }


}