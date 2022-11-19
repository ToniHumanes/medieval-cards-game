
import { Boss } from '../../models/boss.model';
import { Captain } from '../../models/captain.model';
import { Character } from '../../models/character.model';
import { EvilWarrior } from '../../models/evil-warrior.model';
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
    timeToTrainlevelUpList = {
        levelRecluit: 1,
        levelSoldier: 2,
        levelCaptain: 3,
        levelBoss: 4
    };
    propertiesObject: { enumerable: boolean; writable: boolean; configurable: boolean; } = {
        enumerable: false,
        writable: false,
        configurable: false
    };

    constructor() {
        super();

        this.shadowDOM = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setFormEvent();
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

        if (event.type === "js-first-button") {
            this.levelUpCharacterController();
        }

        if (event.type === "js-second-button") {
            this.levelUpDemonicCharacter();
        }

        if(event.type === "end-game-event"){
            this.shadowRoot.querySelector('wrs-banner-animation').setAttribute('isactive', 'true');
        }

        if(event.type === "button-banner"){
            window['ROUTER'].load('home');
        }
    }

    createEvents() {
        this.createEventsEndGame();
        this.createEventLevelUp();
        this.createEventLevelUpDemonic();
        this.createEventRedirect();
    }

    createEventsEndGame() {
        document.addEventListener("end-game-event", this);
    }

    createEventLevelUp() {
        document.addEventListener("js-first-button", this);
    }

    createEventLevelUpDemonic(){
        document.addEventListener("js-second-button", this);
    }

    createEventRedirect(){
        document.addEventListener("button-banner", this);
    }

    removeEvents(){
        this.button.removeEventListener('click', this);
        document.removeEventListener("js-first-button", this);
        document.removeEventListener("js-second-button", this);
        document.removeEventListener("end-game-event", this);
        document.removeEventListener("button-banner", this);
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
        const sectionWarrior = this.shadowRoot.querySelector('#warriorSection');
        if(sectionWarrior){
            sectionWarrior.remove();
        };
        const elementSection = document.createElement('section');
        elementSection.classList.add('col-12');
        elementSection.id = 'warriorSection'
        elementSection.innerHTML = `
        <wrs-card
            name="${character.name}"
            type="${character.type}"
            level="${character.level}"
            _image="${character.image}"
            textButton="Entrenar"
            colorButton="yellow"
            ${this.setAttrSecondaryButton(character.level)}
            attackList='${JSON.stringify(character.attackList)}'>
        </wrs-card>`
        this.shadowRoot.append(elementSection);
    }

    levelUpCharacterController(){
        this.levelUpEmmited = !!this.levelUpEmmited ? this.levelUpEmmited + 1 : 1;
        const valuesCharacter = Object.create(null, {
            name: { value: this.valuesForm.inputValue, ...this.propertiesObject },
            type: { value: this.valuesForm.selectValue, ...this.propertiesObject }
        });
        const levelControllerMethods = [
            { methodClass: Recruit, eventEmitNumber: this.timeToTrainlevelUpList.levelRecluit },
            { methodClass: Soldier, eventEmitNumber: this.timeToTrainlevelUpList.levelSoldier },
            { methodClass: Captain, eventEmitNumber: this.timeToTrainlevelUpList.levelCaptain },
            { methodClass: Boss, eventEmitNumber: this.timeToTrainlevelUpList.levelBoss },
            { methodClass: EvilWarrior, eventEmitNumber: this.timeToTrainlevelUpList.levelBoss }
        ];
        const levelControllerMethodsAsArray = Object.entries(levelControllerMethods)
        const methodLevelFinded = levelControllerMethodsAsArray.find( (item: any) => {
           return item[1].eventEmitNumber === this.levelUpEmmited 
        });

        if(!!methodLevelFinded){
            const characterModel = new methodLevelFinded[1].methodClass(valuesCharacter);
            this.setTemplateCharacter(characterModel);
        }

        if(this.levelUpEmmited > this.timeToTrainlevelUpList.levelBoss){
            const endGameEvent = new CustomEvent("end-game-event", {
                bubbles: true,
                composed: true
              });
              this.dispatchEvent(endGameEvent);
        }
    }

    setAttrSecondaryButton(level: number){
        if(level === 3){
            return `textSecondButton="Convertirse" colorSecondButton="red"`;
        }
    }

    levelUpDemonicCharacter(){
        const valuesCharacter = Object.create(null, {
            name: { value: this.valuesForm.inputValue, ...this.propertiesObject }
        });
        const characterModel = new EvilWarrior(valuesCharacter);
        this.setTemplateCharacter(characterModel);
        this.levelUpEmmited = this.timeToTrainlevelUpList.levelBoss;
    }

}

window.customElements.define('home-page', HomePage);

