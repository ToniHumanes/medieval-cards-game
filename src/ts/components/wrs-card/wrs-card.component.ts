
import styles from './wrs-card.component.scss';
import { BaseComponent } from '../base-component.service';

export class WrsCard extends HTMLElement {

    shadowDOM: ShadowRoot;
    baseComponentBuilder: BaseComponent;
    propertiesComponent: any;

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: "open" });
        this.baseComponentBuilder = new BaseComponent({attributes: this.attributes});
    }

    connectedCallback() {
        this.propertiesComponent = this.baseComponentBuilder.mapComponentAttributes([
            'name',
            'type',
            'level',
            '_image'
        ]);
        this.render();
    }

    disconnectedCallback() {
        this.remove();
    }

    render() {
        this.shadowDOM.innerHTML = `
            ${this.templateCss()}
            ${this.template()}
        `;
    }

    template(): string {
        return `<article class="medieval-card">
        <section class="medieval-card__template-content">
            <p class="medieval-card__title"> Nombre:
                ${this.propertiesComponent.name.value}
            </span></p>
            <p class="medieval-card__paragraph medieval-card__paragraph--small">Tipo: ${this.propertiesComponent.type.value}</p>
            <p class="medieval-card__paragraph medieval-card__paragraph--small medieval-card__paragraph--align-end">Nivel: ${this.propertiesComponent.level.value}</p>
        </section>
        <div class="medieval-card__picture">
            <img src="${this.propertiesComponent._image.value}" class="medieval-card__image" alt="">
        </div>
        <section class="medieval-card__attacks">
            <p class="medieval-card__title">Ataques:</p>
            <ul class="medieval-card__attacks-list">
                
            </ul>
        </section>
        <secton class="medieval-card__footer">
            <wrs-button color="yellow" text="Entrenar: +1 punto"></wrs-button>
        </secton>
    </article>`;
    }

    templateCss() {
        return `<style>${styles}</style>`;
    }

}

window.customElements.define('wrs-card', WrsCard);

