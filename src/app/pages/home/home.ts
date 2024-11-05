import { FormValues } from "../../interfaces/formValues.interface";
import { LevelMapping } from "../../interfaces/levelMapping.interface";
import { Boss } from "../../models/boss.model";
import { Captain } from "../../models/captain.model";
import { Character } from "../../models/character.model";
import { EvilWarrior } from "../../models/evil-warrior.model";
import { Recruit } from "../../models/recruit.model";
import { Soldier } from "../../models/soldier.model";
import home from "./home.html";
import styles from "./home.scss";

export class HomePage extends HTMLElement {
  shadowDOM: ShadowRoot;
  button: HTMLButtonElement;
  inputSelector: HTMLInputElement;
  selectSelector: HTMLSelectElement;
  levelUpEmmited: number = 0;
  valuesForm: FormValues;
  levelMappings: LevelMapping[] = [
    { methodClass: Recruit, eventEmitNumber: 1 },
    { methodClass: Soldier, eventEmitNumber: 2 },
    { methodClass: Captain, eventEmitNumber: 3 },
    { methodClass: Boss, eventEmitNumber: 4 },
    { methodClass: EvilWarrior, eventEmitNumber: 4 },
  ];

  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.attachFormEvents();
    this.attachCustomEvents();
  }

  disconnectedCallback() {
    this.detachEvents();
  }

  render() {
    this.shadowDOM.innerHTML = `${this.templateCss()}${this.template()}`;
  }

  template(): string {
    return home;
  }

  templateCss() {
    return `<style>${styles}</style>`;
  }

  // *********************************
  // Form Events
  // *********************************

  private attachFormEvents() {
    this.button = this.shadowRoot
      .querySelector("wrs-button")
      ?.shadowRoot.querySelector("button");
    this.button?.addEventListener("click", this.sendForm.bind(this));
  }

  private getFormValues(): FormValues | null {
    const inputComponent = this.shadowRoot.querySelector("wrs-input");
    const selectComponent = this.shadowRoot.querySelector("wrs-select");
    this.inputSelector = inputComponent?.shadowRoot.querySelector("input");
    this.selectSelector = selectComponent?.shadowRoot.querySelector("select");

    if (this.inputSelector?.value && this.selectSelector?.value) {
      return {
        inputValue: this.inputSelector.value,
        selectValue: this.selectSelector.value,
      };
    }
    this.displayFormErrors(inputComponent, selectComponent);
    return null;
  }

  private displayFormErrors(inputComponent: Element, selectComponent: Element) {
    this.showError(inputComponent, !this.inputSelector?.value);
    this.showError(selectComponent, !Number(this.selectSelector?.value));
  }

  private showError(element: Element, condition: boolean) {
    if (condition) {
      const spanError = document.createElement("p");
      spanError.className = "js-span-error text--error";
      spanError.innerText = "Campo requerido.";
      element.shadowRoot.append(spanError);
    }
  }

  private sendForm() {
    const formValues = this.getFormValues();
    if (formValues) {
      this.valuesForm = formValues;
      this.resetForm();
      this.createCharacter(this.valuesForm);
      this.closeForm();
    }
  }

  private resetForm() {
    this.inputSelector.value = "";
    this.selectSelector.value = this.selectSelector.options[0].value;
  }

  private closeForm() {
    this.shadowRoot.querySelector("form")?.remove();
  }

  // *********************************
  // Custom Events
  // *********************************

  private attachCustomEvents() {
    const eventConfig = [
      { event: "js-first-button", handler: this.levelUpCharacterController },
      { event: "js-second-button", handler: this.levelUpDemonicCharacter },
      { event: "end-game-event", handler: this.handleEndGameEvent },
      { event: "button-banner", handler: this.redirectHome },
    ];

    eventConfig.forEach(({ event, handler }) => {
      document.addEventListener(event, handler.bind(this));
    });
  }

  private detachEvents() {
    this.button.removeEventListener("click", this.sendForm.bind(this));
    document.removeEventListener(
      "js-first-button",
      this.levelUpCharacterController.bind(this)
    );
    document.removeEventListener(
      "js-second-button",
      this.levelUpDemonicCharacter.bind(this)
    );
    document.removeEventListener(
      "end-game-event",
      this.handleEndGameEvent.bind(this)
    );
    document.removeEventListener("button-banner", this.redirectHome.bind(this));
  }

  private handleEndGameEvent() {
    this.shadowRoot
      .querySelector("wrs-banner-animation")
      ?.setAttribute("isactive", "true");
  }

  private redirectHome() {
    window["ROUTER"].load("home");
  }

  // *********************************
  // Character Logic
  // *********************************

  private createCharacter(data: FormValues) {
    const character = new Character({
      name: data.inputValue,
      type: data.selectValue,
    });
    this.renderCharacter(character);
  }

  private renderCharacter(character: Recruit | EvilWarrior) {
    this.shadowDOM.querySelector("#warriorSection")?.remove();

    const section = document.createElement("section");
    section.className = "col-12";
    section.id = "warriorSection";
    section.innerHTML = `
        <wrs-card
            name="${character.name}"
            type="${character.type}"
            level="${character.level}"
            _image="${character.image}"
            textButton="Entrenar"
            colorButton="yellow"
            ${
              character.level === 3
                ? 'textSecondButton="Convertirse" colorSecondButton="red"'
                : ""
            }
            attackList='${JSON.stringify(character.attacks)}'>
        </wrs-card>`;

    this.shadowDOM.append(section);
  }

  private levelUpCharacterController() {
    this.levelUpEmmited++;

    const characterClass = this.levelMappings.find(
      (mapping) => mapping.eventEmitNumber === this.levelUpEmmited
    )?.methodClass;

    if (characterClass) {
      const newCharacter = new characterClass({
        name: this.valuesForm.inputValue,
        type: this.valuesForm.selectValue,
      });
      this.renderCharacter(newCharacter);
    }

    if (this.levelUpEmmited > 4) {
      this.dispatchEvent(
        new CustomEvent("end-game-event", { bubbles: true, composed: true })
      );
    }
  }

  private levelUpDemonicCharacter() {
    const newCharacter = new EvilWarrior({ name: this.valuesForm.inputValue });
    this.renderCharacter(newCharacter);
    this.levelUpEmmited = 4;
  }
}

window.customElements.define("home-page", HomePage);
