

import styles from './wrs-list.component.scss';
import { BaseComponent } from '../base-component.service';
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
        return `<ul class="wrs-list">${this._takeListFormated(this.attackList)}</ul>`;
    }

    private templateCss() {
        return `<style>${styles}</style>`;
    }

    private createAttackList(attackList) {
        for (const attack of attackList) {
            const attacksCharacter = {
                name: attack.name,
                types: attack.types,
                points: attack.points
            };
            const attackTemplate = this.getTemplateAttack(attacksCharacter);
            this.attackList.push(attackTemplate);
        }

    }

    private getTemplateAttack(attack) {
        return `<li class="wrs-list-item">
                    <p>${attack.name}</p>
                    <p>Tipo: <span class="wrs-list-item__type">${this._takeListFormated(attack.types)}</span></p>
                    <p>Puntos: ${attack.points}</p>
                </li>`;
    }

    private _takeListFormated(types: string[]){
        let typeLiteral = "";
        const listTypes = types;
        listTypes.map((item: string) => {
            typeLiteral = typeLiteral.concat(item + " ")
        });
        return typeLiteral.trim();
    }

    private setAttackList(attackList) {
        if(attackList.length > 0){
            this.createAttackList(attackList);
            for (const itemAttack of attackList) {
                return itemAttack;
            }
        }
    }

}

window.customElements.define('wrs-list', WrsList);
