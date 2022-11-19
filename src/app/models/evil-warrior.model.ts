

import { Character } from "./character.model";
import imageEvilWarrior from '/assets/images/characters/evil_warriors/level_one.png';

import * as evilWarriorsJson from '../shared/localInfo/attacks/evil-warrior/evil-warrior.json';

export class EvilWarrior extends Character{
    constructor(character) { 
        super(character);
        this.name = character.name;
        this.type = 'Demonio';
        this.level = 5;
        this.attackList = this.getAttacks(evilWarriorsJson);
        this.image = this.getImage(imageEvilWarrior);
    }

    getAttacks(evilWarriorsJson){
       return this.mapAttacks(evilWarriorsJson.default); 
    }

    getImage(imageEvilWarrior){
        return imageEvilWarrior;
    }
}