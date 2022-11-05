import { Character } from "../../models/character.model";
import { WrsButton } from "../wrs-button/wrs-button.component";
import { WrsCard } from "../wrs-card/wrs-card.component";
import { WrsList } from "../wrs-list/wrs-list.component";
import { WrsInput } from "../wrs-input/wrs-input.component";
import { WrsSelect } from "../wrs-select/wrs-select.component";

export class ComponentModule {
    constructor() {
        this.loadComponents();
    }
    loadComponents(){
        new Character({
            name: 'Antonio',
            type: 'guerrero'
        });
        new WrsCard();
        new WrsButton();
        new WrsList();
        new WrsInput();
        new WrsSelect();
    }
}