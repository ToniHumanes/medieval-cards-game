import { ComponentModule } from "./components/modules/component.module";
import { RouterModule } from "./router/router.module";

export class AppModule {
    constructor() {
        new ComponentModule();
        new RouterModule();
    }


}