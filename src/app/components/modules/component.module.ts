import { Character } from "../../models/character.model";
import { WrsButton } from "../wrs-button/wrs-button.component";
import { WrsCard } from "../wrs-card/wrs-card.component";
import { WrsList } from "../wrs-list/wrs-list.component";


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
    }
}