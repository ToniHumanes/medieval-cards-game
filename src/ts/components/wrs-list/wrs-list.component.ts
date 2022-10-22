

import styles from './wrs-list.component.scss';
import { BaseComponent } from '../base-component.service';
import { Attack } from '../../models/attack.model';
import { ParseStringObject } from '../../helpers/parseStringObjetc';

export class WrsList extends HTMLElement {

    shadowDOM: ShadowRoot;
    baseComponentBuilder: BaseComponent;
    propertiesComponent: any;
    attackList = [];

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: "open" });
        this.baseComponentBuilder = new BaseComponent({ attributes: this.attributes });
    }

    connectedCallback() {
        this._buildProperties();
        this.render();
    }

    disconnectedCallback() {
        this.remove();
    }

    render() {
        this.setAttackList(JSON.parse(this.propertiesComponent.contentList.value));
        this.shadowDOM.innerHTML = `
            ${this.templateCss()}
            ${this.template()}
        `;
    }

    private _buildProperties(){
        this.propertiesComponent = this.baseComponentBuilder.mapComponentAttributes([
            'contentList'
        ]);
        this.propertiesComponent.contentList.value = ParseStringObject.parse(this.propertiesComponent.contentList.value);
    }

    private template(): string {
        return `<ul class="wrs-list">${this.attackList}</ul>`;
    }

    private templateCss() {
        return `<style>${styles}</style>`;
    }

    private createAttackList(attackList: Attack[]) {
        for (const attack of attackList) {
            const attacksCharacter = new Attack({
                name: attack.name,
                type: attack.type,
                points: attack.points
            });
            const attackTemplate = this.getTemplateAttack(attacksCharacter);
            this.attackList.push(attackTemplate);
        }

    }

    private getTemplateAttack(attack: Attack) {
        return `<li class="wrs-list-item">
                    <p>${attack.name}</p>
                    <p>Tipo:<span class="u-font-family--emoji">🗡🔥</span></p>
                    <p>Puntos de daño: ${attack.points}</p>
                </li>`;
    }

    private setAttackList(attackList: Attack[]) {
        if(attackList.length > 0){
            this.createAttackList(attackList);
            for (const itemAttack of attackList) {
                return itemAttack;
            }
        }
    }

}

window.customElements.define('wrs-list', WrsList);
