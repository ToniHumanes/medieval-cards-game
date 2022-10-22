
import { AttackInterface } from "../interfaces/attack.interface";
import { Attack } from "../models/attack.model";
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
        this.setTemplateCard();
    }

    getTemplateCard() {
        return `<article class="medieval-card">
                    <section class="medieval-card__template-content u-margin-bottom-20px">
                        <p class="medieval-card__title u-span--2 u-margin-bottom-10px"><span class="u-text--xs u-font-family--noto">Nombre: </span>
                            ${this.name}
                        </span></p>
                        <p class="medieval-card__paragraph">Tipo: ${this.type}</p>
                        <p class="medieval-card__paragraph u-flex u-flex-justify--end">Nivel: ${this.level}</p>
                    </section>
                    <div class="medieval-card__picture u-margin-bottom-30px">
                        <img src="${this._image}" class="medieval-card__image" alt="">
                    </div>
                    <section class="medieval-card__attacks u-margin-bottom-30px">
                        <p class="medieval-card__title u-margin-bottom-10px">Ataques:</p>
                        <ul class="medieval-card__attacks-list">
                            ${this.setAttackList(this.attackList)}
                        </ul>
                    </section>
                    <secton class="medieval-card__footer">
                        <button class="button button--yellow">Entrenar (+1 punto)</button>
                    </secton>
                </article>`;
    }

    setTemplateCard() {
        // const nodeElementList = document.querySelector('.js-medieval-card-list');
        // const elementList = document.createElement('div');
        // elementList.classList.add('col-12');
        // elementList.innerHTML = this.getTemplateCard();
        // nodeElementList.append(elementList);
    }

    createAttackList(attackList: Attack[]){

        for (const attack of attackList) {
            const attacksCharacter = new Attack({
                name: attack.name,
                type: attack.type,
                points: attack.points
            });
            //const attackTemplate = attacksCharacter.getTemplateAttack();
            //this.attackList.push(attackTemplate);  
        }

    }

    setAttackList(attackList: Attack[]){
        this.createAttackList(attackList);
        for (const itemAttack of attackList) {
            return itemAttack;
        }
    }
}