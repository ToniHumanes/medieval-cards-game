

export class Attack {
    name: string;
    points: number;
    type: Array<string>;
    
    constructor({
        name,
        points,
        type
    }) {
       this.name = name;
       this.points = points;
       this.type = type; 
    }
}