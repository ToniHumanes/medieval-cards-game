
import imageWarrior from '/assets/images/characters/men_warriors/level_one.png';
import imageWarriorFemale from '/assets/images/characters/women_warriors/level_one.png';
import imageWizard from '/assets/images/characters/wizard_warriors/level_one.png';

import { Attack } from '../../app/models/attack.model';

import * as menWarriorsJson from '../shared/localInfo/attacks/level_one/men-warrior.json';
import * as womenWarriorsJson from '../shared/localInfo/attacks/level_one/women-warrior.json';
import * as wizardWarriorsJson from '../shared/localInfo/attacks/level_one/wizard-warrior.json';

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
        this.attackList = this.getAttacks(menWarriorsJson, womenWarriorsJson, wizardWarriorsJson);
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

    getAttacks(menWarriorsJson, womenWarriorsJson, wizardWarriorsJson){
        const attackLibrary = {
            "1": menWarriorsJson,
            "2": womenWarriorsJson,
            "3": wizardWarriorsJson
        };
       return this.mapAttacks(attackLibrary[this.type].default); 
    }

   private mapAttacks(attacks) {
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