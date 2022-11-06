
import { BaseComponent } from "../base-component.service";
import styles from './wrs-input.component.scss';

export class WrsInput extends HTMLElement{
    shadowDOM: ShadowRoot;
    baseComponentBuilder: BaseComponent;
    propertiesComponent: any;

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: 'open' });
        this.baseComponentBuilder = new BaseComponent({attributes: this.attributes});
    }

    connectedCallback() {
        this.propertiesComponent = this.baseComponentBuilder.mapComponentAttributes([
            'id',
            'labelText',
            'placeholder',
            'isRequired',
            'type'
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
        return `
        <label class="input__label" for="${this.propertiesComponent.id.value}">${this.propertiesComponent.labelText.value}</label>
        <input class="input__field" placeholder="${this.propertiesComponent.placeholder.value}" type="${this.propertiesComponent.type.value}" id="${this.propertiesComponent.id.value}" name="${this.propertiesComponent.id.value}" required="${this.propertiesComponent.isRequired.value}">`;
    }

    templateCss() {
        return `<style>${styles}</style>`;
    }

}

window.customElements.define('wrs-input', WrsInput);
