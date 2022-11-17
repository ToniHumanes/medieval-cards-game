

import { Character } from "./character.model";
import imageWarrior from '/assets/images/characters/men_warriors/level_two.png';
import imageWarriorFemale from '/assets/images/characters/women_warriors/level_two.png';
import imageWizard from '/assets/images/characters/wizard_warriors/level_two.png';

import * as menWarriorsJson from '../shared/localInfo/attacks/level_two/men-warrior.json';
import * as womenWarriorsJson from '../shared/localInfo/attacks/level_two/women-warrior.json';
import * as wizardWarriorsJson from '../shared/localInfo/attacks/level_two/wizard-warrior.json';

export class Recruit extends Character{
    constructor(character) { 
        super(character);
        this.name = character.name;
        this.type = character.type;
        this.level = 2;
        this.attackList = this.getAttacks(menWarriorsJson, womenWarriorsJson, wizardWarriorsJson);
        this.image = this.getImage(this.type, {
            imageWarrior,
            imageWarriorFemale,
            imageWizard
        });
        this.transformLiteralsTypes();
    }
}