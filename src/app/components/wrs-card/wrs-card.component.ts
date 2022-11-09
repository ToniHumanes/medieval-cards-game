
import styles from './wrs-card.component.scss';
import { BaseComponent } from '../base-component.service';
import { ParseStringObject } from '../../helpers/parseStringObjetc';
import image from '../../../../assets/images/backgrounds/damask-seamless-pattern-background/821.jpg';

export class WrsCard extends HTMLElement {

    shadowDOM: ShadowRoot;
    baseComponentBuilder: BaseComponent;
    propertiesComponent: any;
    button: HTMLButtonElement;

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: "open" });
        this.baseComponentBuilder = new BaseComponent({attributes: this.attributes});
    }

    connectedCallback() {
        this._buildProperties();
        this.render();
        this.createEvent();
    }

    disconnectedCallback() {
        this.removeEvent();
        this.remove();
    }

    render() {
        this.shadowDOM.innerHTML = `
            ${this.templateCss()}
            ${this.template()}
        `;
    }

    template(): string {
        return `<article class="medieval-card" style="background-image: url(${image})">
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
            <wrs-list contentList='${this.propertiesComponent.attackList.value}'></wrs-list>
        </section>
        <secton class="medieval-card__footer">
            <wrs-button color="yellow" text="Entrenar"></wrs-button>
        </secton>
    </article>`;
    }

    templateCss() {
        return `<style>${styles}</style>`;
    }

    private _buildProperties(){
        this.propertiesComponent = this.baseComponentBuilder.mapComponentAttributes([
            'name',
            'types',
            'level',
            '_image',
            'attackList'
        ]);
        this.propertiesComponent.attackList.value = ParseStringObject.parse(this.propertiesComponent.attackList.value);
    }

    handleEvent(event) {
        if (event.type === "click") {
          const LevelUpEvent = new CustomEvent("level-up-event", {
            bubbles: true,
            composed: true
          });
          this.dispatchEvent(LevelUpEvent);
        }
      }
    
      createEvent(){
        this.button = this.shadowRoot.querySelector('wrs-button').shadowRoot.querySelector('button');
        this.button.addEventListener("click", this);
      }

      removeEvent(){
        this.button.removeEventListener("click", this);
      }

}

window.customElements.define('wrs-card', WrsCard);

