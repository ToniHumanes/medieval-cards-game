
import { Character } from '../../models/character.model';
import home from './home.html'
import styles from './home.scss';

export class HomePage extends HTMLElement {

    shadowDOM: ShadowRoot;
    button: HTMLButtonElement;

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setFormEvent();
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
        return home;
    }

    templateCss() {
        return `<style>${styles}</style>`;
    }

    // Events

    setFormEvent(){
        this.button = this.shadowRoot.querySelector('wrs-button').shadowRoot.querySelector('button');
        this.button.addEventListener("click", this); 
    }

    handleEvent(event) {
        if (event.type === "click") {
            this.sendForm();
        }
    }

    removeEvents(){
        this.button.removeEventListener('click', this)
    }

    //  Form
    private getFormValues(){

        const inputComponentSelector = this.shadowRoot.querySelector('wrs-input');
        const inputSelector = inputComponentSelector.shadowRoot.querySelector('input');

        const selectComponentSelector = this.shadowRoot.querySelector('wrs-select');
        const selectSelector = selectComponentSelector.shadowRoot.querySelector('select');

        const isValidForm = this.checkIsValidForm({
            input: {
                inputComponentSelector,
                inputSelector
            },
            select: {
                selectComponentSelector,
                selectSelector
            }});
            if(isValidForm){
                return{
                    inputValue: inputSelector.value,
                    selectValue: selectSelector.value
                }
            }
    }

    private sendForm(){
        const valuesForm = this.getFormValues();
        if(valuesForm){
            this.createCharacter(valuesForm);
        }
    }

    private checkIsValidForm(formFields){
        let isValid = true;
        if(!formFields.input.inputSelector.value){
            this.setErrorElementForm(formFields.input.inputComponentSelector);
            isValid = false;
        }else{
            this.removeErrorElementForm(formFields.input.inputComponentSelector);
        }

        if(!Number(formFields.select.selectSelector.value)){
            this.setErrorElementForm(formFields.select.selectComponentSelector);
            isValid = false;
        }else{
            this.removeErrorElementForm(formFields.select.selectComponentSelector)
        }
        return isValid;
    }

    private setErrorElementForm(elementForm: Element){
        this.removeErrorElementForm(elementForm);
        const spanError = document.createElement('p');
        spanError.classList.add('js-span-error', 'text--error');
        spanError.innerText = 'Campo requerido.';
        elementForm.shadowRoot.appendChild(spanError);
    }

    private removeErrorElementForm(elementForm: Element){
        const elementsError = elementForm.shadowRoot.querySelectorAll('.js-span-error');
        if(elementsError){
            for (let i = 0; i < elementsError.length; i++) {
                elementsError[i].remove();
            }
        }
    }

    private createCharacter(dataCharecter){
        const character = new Character({
            name: dataCharecter.inputValue,
            type: dataCharecter.selectValue
        });
        const elementSection = document.createElement('section');
        elementSection.classList.add('col-12');
        elementSection.innerHTML = `
        <wrs-card
            name="${character.name}"
            type="${character.type}"
            level="${character.level}"
            _image="${character.image}"
            attackList='${JSON.stringify(character.attackList)}'>
        </wrs-card>`
        this.shadowRoot.appendChild(elementSection);
    }

}

window.customElements.define('home-page', HomePage);

