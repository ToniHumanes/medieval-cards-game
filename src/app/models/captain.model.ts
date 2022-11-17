
import { Soldier } from "./soldier.model";
import imageWarrior from '/assets/images/characters/men_warriors/level_four.png';
import imageWarriorFemale from '/assets/images/characters/women_warriors/level_four.png';
import imageWizard from '/assets/images/characters/wizard_warriors/level_four.png';

import * as menWarriorsJson from '../shared/localInfo/attacks/level_four/men-warrior.json';
import * as womenWarriorsJson from '../shared/localInfo/attacks/level_four/women-warrior.json';
import * as wizardWarriorsJson from '../shared/localInfo/attacks/level_four/wizard-warrior.json';

export class Captain extends Soldier{
    constructor(character) { 
        super(character);
        this.name = character.name;
        this.type = character.type;
        this.level = 4;
        this.attackList = this.getAttacks(menWarriorsJson, womenWarriorsJson, wizardWarriorsJson);
        this.image = this.getImage(this.type, {
            imageWarrior,
            imageWarriorFemale,
            imageWizard
        });
        this.transformLiteralsTypes();
    }
}