
import styles from './wrs-header.component.scss';

export class WrsHeader extends HTMLElement {

    shadowDOM: ShadowRoot;



    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
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
        return `<header class="header">
        <nav class="container container--no-margins">
        <button id="Home" onclick="ROUTER.load('home')">Inicio </button>
        <button id="About" onclick="ROUTER.load('about')">Sobre mi</button>
        <button id="Contact" onclick="ROUTER.load('contact')">Contacto</button>
        </nav>
    </header>`;
    }

    templateCss() {
        return `<style>${styles}</style>`;
    }
}

window.customElements.define('wrs-header', WrsHeader);

