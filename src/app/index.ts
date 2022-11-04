
import '../styles/styles.scss';
import { AppModule } from './app.module';
import { ComponentModule } from './components/modules/component.module';

class initApp {
    constructor(){
        new AppModule();
        new ComponentModule();
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