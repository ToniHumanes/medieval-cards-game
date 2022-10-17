

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

    getTemplateAttack(){
        return `<li class="medieval-card__template-content medieval-card__attacks-list-item">
                    <p class="medieval-card__paragraph medieval-card__paragraph--small u-span--2">- ${this.name}</p>
                    <p class="medieval-card__paragraph medieval-card__paragraph--small">Tipo:<span class="u-font-family--emoji">🗡🔥</span></p>
                    <p class="medieval-card__paragraph medieval-card__paragraph--small u-flex u-flex-justify--end">Puntos de daño: ${this.points}</p>
                </li>`;
    }
}