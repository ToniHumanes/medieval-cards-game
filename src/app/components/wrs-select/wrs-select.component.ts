
import { ParseStringObject } from "../../helpers/parseStringObjetc";
import { BaseComponent } from "../base-component.service";
import styles from './wrs-select.component.scss';

export class WrsSelect extends HTMLElement {
    shadowDOM: ShadowRoot;
    baseComponentBuilder: BaseComponent;
    propertiesComponent: any;

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: 'open' });
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
        this.shadowDOM.innerHTML = `
        ${this.templateCss()}
        ${this.template()}
        `;
        this.setOptionsInSelect(this.propertiesComponent.options.value);
    }

    template(): string {
        return `
        <label 
            class="select__label"
            for="${this.propertiesComponent.id.value}">${this.propertiesComponent.labelText.value}
        </label>
        <div class="select__contain">
            <select 
                class="select__field"
                id="${this.propertiesComponent.id.value}"
                name="${this.propertiesComponent.id.value}"
                required="${this.propertiesComponent.isRequired.value}">
            </select>
        </div>`;
    }

    templateCss() {
        return `<style>${styles}</style>`;
    }

    private _buildProperties() {
        this.propertiesComponent = this.baseComponentBuilder.mapComponentAttributes([
            'id',
            'labelText',
            'optionDefaultText',
            'isRequired',
            'options'
        ]);
        this.propertiesComponent.options.value = ParseStringObject.parse(this.propertiesComponent.options.value);
    }

    private setOptionsInSelect(options) {
        const optionsList = JSON.parse(options);
        const selectElement = this.shadowRoot.querySelector('select');

        const setOptionDefault = (select: HTMLSelectElement) => {
            const optionElementDefault = document.createElement("option");
            optionElementDefault.value = '0';
            optionElementDefault.innerText = 'selecciona';
            optionElementDefault.selected = true;
            optionElementDefault.disabled = true;
            select.appendChild(optionElementDefault);
        };

        const setOptionsList = (select: HTMLSelectElement) => {
            for (let i = 0; i < optionsList.length; i++) {
                const optionElement = document.createElement("option");
                optionElement.value = optionsList[i].value;
                optionElement.innerText = optionsList[i].label;
                select.appendChild(optionElement);
            }
        }

        setOptionDefault(selectElement);
        setOptionsList(selectElement);

    }

}

window.customElements.define('wrs-select', WrsSelect);
