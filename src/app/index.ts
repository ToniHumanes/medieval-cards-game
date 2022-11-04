
import '../styles/styles.scss';
import { Character } from './models/character.model';
import { WrsCard } from './components/wrs-card/wrs-card.component';
import { WrsButton } from './components/wrs-button/wrs-button.component';
import { WrsList } from './components/wrs-list/wrs-list.component';

class initApp {

    constructor(){
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

// -------- Instance app Module load resourses ----------

const appControlModule = new initApp();

((appControlModule) => {

    // -------- Events ---------

    const arrayMethods: any = [
        // {
        //     method: appControlModule.openModalExample,
        //     typeEvent: 'click'
        // }
    ];

    function setEventsListener(arrayMethod: Array<Function>) {
        for (let i = 0; i < arrayMethod.length; i++) {
            document.addEventListener(arrayMethods[i].typeEvent, arrayMethods[i].method.bind(appControlModule));
        }
    }
    if(!!arrayMethods.length){
        setEventsListener(arrayMethods);
    }

})(appControlModule);