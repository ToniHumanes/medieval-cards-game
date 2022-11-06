
import { BaseComponent } from '../base-component.service';
import styles from './wrs-button.component.scss';

export class WrsButton extends HTMLElement {

    shadowDOM: ShadowRoot;
    baseComponentBuilder: BaseComponent;
    propertiesComponent: any;
    button: HTMLButtonElement;

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: 'open' });
        this.baseComponentBuilder = new BaseComponent({attributes: this.attributes});
    }

    connectedCallback() {
        this.propertiesComponent = this.baseComponentBuilder.mapComponentAttributes([
            'color',
            'text',
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
        return `<button class="button button--${this.propertiesComponent.color.value}">${this.propertiesComponent.text.value}</button>`;
    }

    templateCss() {
        return `<style>${styles}</style>`;
    }
}

window.customElements.define('wrs-button', WrsButton);

