
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
        //this.createEvents();
    }

    disconnectedCallback() {
        //this.removeEvents();
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

    // handleEvent(event) {
    //     debugger;
    //     if (event.type === "click"){
    //         console.log('component button event:', event);
    //         this.emitEvents();
    //     }
    //   }

    // createEvents(){
    //     // this.button = this.shadowRoot.querySelector("button");
    //     // this.button.addEventListener("click", this); 
    // }

    // emitEvents(){
    //     const MessageEvent = new CustomEvent("message", {
    //         detail: {
    //           from: "Manz",
    //           message: "Hello!"
    //         },
    //         bubbles: true,
    //         composed: true
    //       });
    //       this.dispatchEvent(MessageEvent);
    // }

    // removeEvents(){
    //     this.button.removeEventListener('click', this)
    // }

}

window.customElements.define('wrs-button', WrsButton);

