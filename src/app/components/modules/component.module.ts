
import { WrsButton } from "../wrs-button/wrs-button.component";
import { WrsCard } from "../wrs-card/wrs-card.component";
import { WrsList } from "../wrs-list/wrs-list.component";
import { WrsInput } from "../wrs-input/wrs-input.component";
import { WrsSelect } from "../wrs-select/wrs-select.component";
import { WrsHeader } from "../wrs-header/wrs-header.component";

export class ComponentModule {
    constructor() {
        this.loadComponents();
    }
    loadComponents(){
        new WrsHeader();
        new WrsCard();
        new WrsButton();
        new WrsList();
        new WrsInput();
        new WrsSelect();
    }
}