
import about from './about.html'
import styles from './about.scss';

export class AboutPage extends HTMLElement {
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
        return about;
    }

    templateCss() {
        return `<style>${styles}</style>`;
    }
}

window.customElements.define('about-page', AboutPage);