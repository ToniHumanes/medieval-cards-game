
import styles from './wrs-card.component.scss';
import { BaseComponent } from '../base-component.service';
import { ParseStringObject } from '../../helpers/parseStringObjetc';
import image from '../../../../assets/images/backgrounds/damask-seamless-pattern-background/821.jpg';

export class WrsCard extends HTMLElement {

    shadowDOM: ShadowRoot;
    baseComponentBuilder: BaseComponent;
    propertiesComponent: any;
    button: HTMLElement;
    buttonSecondary: HTMLElement;

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: "open" });
        this.baseComponentBuilder = new BaseComponent({ attributes: this.attributes });
    }

    connectedCallback() {
        this._buildProperties();
        this.render();
        this.createEvents();
    }

    disconnectedCallback() {
        this.removeEvents();
        this.remove();
    }

    render() {
        this.shadowDOM.innerHTML = `
            ${this.templateCss()}
            ${this.template()}
        `;
        this.setSecondButton();
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
            <wrs-button class="js-first-button" color="${this.propertiesComponent.colorButton.value}" text="${this.propertiesComponent.textButton.value}"></wrs-button>
            ${this.setSecondButton()}
        </secton>
    </article>`;
    }

    templateCss() {
        return `<style>${styles}</style>`;
    }

    private _buildProperties() {
        this.propertiesComponent = this.baseComponentBuilder.mapComponentAttributes([
            'name',
            'types',
            'level',
            '_image',
            'attackList',
            "textButton",
            "colorButton",
            "textSecondButton",
            "colorSecondButton"
        ]);
        this.propertiesComponent.attackList.value = ParseStringObject.parse(this.propertiesComponent.attackList.value);
    }

    private setSecondButton() {
        if (!!this.propertiesComponent.textSecondButton.value && !!this.propertiesComponent.colorSecondButton.value) {
            return `<wrs-button class="js-second-button" color="${this.propertiesComponent.colorSecondButton.value}" text="${this.propertiesComponent.textSecondButton.value}"></wrs-button>`
        }

        return "";
    }

    handleEvent(event) {
        if (event.type === "click") {
            const eventName = this.shadowRoot.activeElement.classList[0];
            const eventCreated = new CustomEvent(eventName, {
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(eventCreated);
        }
    }

    createEvents() {
        this.eventBuilder({
            elementId: 'js-first-button',
            element: this.button
        });
        this.eventBuilder({
            elementId: 'js-second-button',
            element: this.buttonSecondary
        });
    }

    removeEvents() {
        this.eventDraft({
            element: this.button
        });
        this.eventDraft({
            element: this.buttonSecondary
        });
    }


    eventBuilder(eventInfo) {
        const buttonComponent = this.shadowRoot.querySelector(`.${eventInfo.elementId}`)
        eventInfo.element = !!buttonComponent ? buttonComponent.shadowRoot.querySelector('button') : null;
        if (!!eventInfo.element) {
            eventInfo.element.classList.add(`${eventInfo.elementId}-element`);
            eventInfo.element.addEventListener("click", this);
        }
    }

    eventDraft(eventInfo) {
        if (eventInfo.element) {
            eventInfo.element.removeEventListener("click", this);
        }
    }
}

window.customElements.define('wrs-card', WrsCard);

