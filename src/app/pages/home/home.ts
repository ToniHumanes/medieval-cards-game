
import { Boss } from '../../models/boss.model';
import { Captain } from '../../models/captain.model';
import { Character } from '../../models/character.model';
import { Recruit } from '../../models/recruit.model';
import { Soldier } from '../../models/soldier.model';
import home from './home.html'
import styles from './home.scss';

export class HomePage extends HTMLElement {

    shadowDOM: ShadowRoot;
    button: HTMLButtonElement;
    inputComponentSelector: any;
    inputSelector: any;
    selectComponentSelector: any;
    selectSelector: any;
    levelUpEmmited: number;
    valuesForm: { inputValue: string; selectValue: string; };

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setFormEvent();
        this.createEventLevelUp();
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
    }

    template(): string {
        return home;
    }

    templateCss() {
        return `<style>${styles}</style>`;
    }

    // ********************************* 
    // Events
    // ********************************* 

    setFormEvent(){
        this.button = this.shadowRoot.querySelector('wrs-button').shadowRoot.querySelector('button');
        this.button.addEventListener("click", this); 
    }

    handleEvent(event) {
        if (event.type === "click") {
            this.sendForm();
        }

        if (event.type === "level-up-event") {
            this.levelUpCharacterController();
        }
    }

    createEventLevelUp() {
        document.addEventListener("level-up-event", this);
    }

    removeEvents(){
        this.button.removeEventListener('click', this);
        document.removeEventListener("level-up-event", this);
    }

    // ********************************* 
    // Form
    // ********************************* 

    private getFormValues(){

        this.inputComponentSelector = this.shadowRoot.querySelector('wrs-input');
        this.inputSelector = this.inputComponentSelector.shadowRoot.querySelector('input');

        this.selectComponentSelector = this.shadowRoot.querySelector('wrs-select');
        this.selectSelector = this.selectComponentSelector.shadowRoot.querySelector('select');

        const isValidForm = this.checkIsValidForm({
            input: {
                inputComponentSelector: this.inputComponentSelector,
                inputSelector: this.inputSelector
            },
            select: {
                selectComponentSelector: this.selectComponentSelector,
                selectSelector: this.selectSelector
            }});
            if(isValidForm){
                return{
                    inputValue: this.inputSelector.value,
                    selectValue: this.selectSelector.value
                }
            }
    }

    private sendForm(){
        this.valuesForm = this.getFormValues();
        if(this.valuesForm){
            this.resetForm();
            this.createCharacter(this.valuesForm);
            this.closeForm();
        }
    }

    private resetForm(){
        this.inputSelector.value = '';
        this.selectSelector.value = this.selectSelector[0];
        this.selectSelector[0].selected = true;
    }

    private closeForm(){
        this.shadowRoot.querySelector('form').remove();
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

    // ********************************* 
    // Character
    // ********************************* 

    private createCharacter(dataCharecter){
        const character = new Character({
            name: dataCharecter.inputValue,
            type: dataCharecter.selectValue
        });
        this.setTemplateCharacter(character);
    }

    setTemplateCharacter(character: Character){
        const elementSection = document.createElement('section');
        elementSection.classList.add('col-12');
        elementSection.id = 'warriorSection'
        elementSection.innerHTML = `
        <wrs-card
            name="${character.name}"
            type="${character.type}"
            level="${character.level}"
            _image="${character.image}"
            attackList='${JSON.stringify(character.attackList)}'>
        </wrs-card>`
        this.shadowRoot.append(elementSection);
    }

    levelUpCharacterController(){
        this.levelUpEmmited = !!this.levelUpEmmited ? this.levelUpEmmited + 1 : 1;
        const propertiesObject = {
            enumerable: false,
            writable: false,
            configurable: false
        };
        const valuesCharacter = Object.create(null, {
            name: { value: this.valuesForm.inputValue, ...propertiesObject },
            type: { value: this.valuesForm.selectValue, ...propertiesObject }
        });
        const levelControllerMethods = [
            { methodClass: Recruit, eventEmitNumber: 5 },
            { methodClass: Soldier, eventEmitNumber: 10 },
            { methodClass: Captain, eventEmitNumber: 15 },
            { methodClass: Boss, eventEmitNumber: 20 }
        ];
        const levelControllerMethodsAsArray = Object.entries(levelControllerMethods)
        const methodLevelFinded = levelControllerMethodsAsArray.find( (item: any) => {
           return item[1].eventEmitNumber === this.levelUpEmmited 
        });

        if(!!methodLevelFinded){
            const characterModel = new methodLevelFinded[1].methodClass(valuesCharacter);
            this.shadowRoot.querySelector('#warriorSection').remove();
            this.setTemplateCharacter(characterModel);
        }
    }

}

window.customElements.define('home-page', HomePage);

