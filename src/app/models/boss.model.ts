
import { Captain } from "./captain.model";
import imageWarrior from '/assets/images/characters/men_warriors/level_five.png';
import imageWarriorFemale from '/assets/images/characters/women_warriors/level_five.png';
import imageWizard from '/assets/images/characters/wizard_warriors/level_five.png';

import * as menWarriorsJson from '../shared/localInfo/attacks/level_five/men-warrior.json';
import * as womenWarriorsJson from '../shared/localInfo/attacks/level_five/women-warrior.json';
import * as wizardWarriorsJson from '../shared/localInfo/attacks/level_five/wizard-warrior.json';


export class Boss extends Captain{
    constructor(character) { 
        super(character);
        this.name = character.name;
        this.type = character.type;
        this.level = 5;
        this.attackList = this.getAttacks(menWarriorsJson, womenWarriorsJson, wizardWarriorsJson);
        this.image = this.getImage(this.type, {
            imageWarrior,
            imageWarriorFemale,
            imageWizard
        });
        this.transformLiteralsTypes();
    }
}