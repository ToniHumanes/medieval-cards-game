
import { BaseComponent } from '../base-component.service';
import styles from './wrs-banner-animation.component.scss';

export class WrsBannerAnimation extends HTMLElement {

    static get observedAttributes() {
        return [
            'isactive'
        ];
    }

    shadowDOM: ShadowRoot;
    baseComponentBuilder: BaseComponent;
    propertiesComponent: any;
    button: HTMLButtonElement;

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: 'open' });
        this.baseComponentBuilder = new BaseComponent({ attributes: this.attributes });
    }

    connectedCallback() {
        this.propertiesComponent = this.baseComponentBuilder.mapComponentAttributes([
            'icon',
            'title',
            'text',
            'textbutton',
            'isactive'
        ]);
        this.propertiesComponent.isactive.value = false;
    }

    disconnectedCallback() {
        this.remove();
        this.removeEventButton();
    }

    render() {
        this.shadowDOM.innerHTML = `
            ${this.templateCss()}
            ${this.template()}
        `;
        this._updateHeightFromBody();
    }

    template(): string {
        return `<article class="banner-animation ${this.propertiesComponent.isactive.value === 'true' ? 'banner-animation--active' : ''}">
            <span class="banner-animation__icon">${this.propertiesComponent.icon.value}</span>
            <h1 class="banner-animation__title">${this.propertiesComponent.title.value}</h1>
            <p class="banner-animation__text">${this.propertiesComponent.text.value}</p>
            <wrs-button text="${this.propertiesComponent.textbutton.value}" color="yellow"></wrs-button>
        </article>`;
    }

    templateCss() {
        return `<style>${styles}</style>`;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'isactive' && this._checkAttributeChangedAfterLoadComponent(oldValue, newValue)) {
            this.propertiesComponent.isactive.value = true;
            this.render();
            this.createEventButton();
        }
    }

    private _updateHeightFromBody(){
        const bodyHeight = document.body.clientHeight;
        var bannerAnimationStyles = this.style;
        bannerAnimationStyles.setProperty('--height-body', `${bodyHeight}px`);
    }

    private _checkAttributeChangedAfterLoadComponent(oldValue, newValue) {
        if (!!oldValue && !!newValue && (oldValue !== newValue)) {
            return true;
        }

        return false
    }

    handleEvent(event) {
        if (event.type === "click") {
            const buttonBannerEvent = new CustomEvent("button-banner", {
                bubbles: true,
                composed: true,
                detail: {
                    redirect: 'home'
                }
            });
            this.dispatchEvent(buttonBannerEvent);
        }
    }

    createEventButton() {
        this.button = this.shadowRoot.querySelector('wrs-button').shadowRoot.querySelector('button');
        this.button.addEventListener('click', this);
    }

    removeEventButton() {
        if(this.button){
            this.button.removeEventListener('click', this);
        }
    }
}

window.customElements.define('wrs-banner-animation', WrsBannerAnimation);