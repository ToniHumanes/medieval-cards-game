
import image from '/assets/images/characters/men_warriors/swordsman.png';

export class Character {
    name: string;
    type: string;
    level: number;
    attackList: any;
    private _image: string;

    constructor({
        name,
        type,
        level = 1,
        attacks = []
    }) {
        this.name = name;
        this.type = type;
        this.level = level;
        this.attackList = attacks;
        this._image = image;
    }
}