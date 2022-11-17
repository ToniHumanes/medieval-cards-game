
import { Recruit } from "./recruit.model";
import imageWarrior from '/assets/images/characters/men_warriors/level_three.png';
import imageWarriorFemale from '/assets/images/characters/women_warriors/level_three.png';
import imageWizard from '/assets/images/characters/wizard_warriors/level_three.png';

import * as menWarriorsJson from '../shared/localInfo/attacks/level_three/men-warrior.json';
import * as womenWarriorsJson from '../shared/localInfo/attacks/level_three/women-warrior.json';
import * as wizardWarriorsJson from '../shared/localInfo/attacks/level_three/wizard-warrior.json';

export class Soldier extends Recruit{
    constructor(character) { 
        super(character);
        this.name = character.name;
        this.type = character.type;
        this.level = 3;
        this.attackList = this.getAttacks(menWarriorsJson, womenWarriorsJson, wizardWarriorsJson);
        this.image = this.getImage(this.type, {
            imageWarrior,
            imageWarriorFemale,
            imageWizard
        });
        this.transformLiteralsTypes();
    }
}