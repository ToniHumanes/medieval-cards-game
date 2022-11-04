import { Router } from "./router.manager";
import { PATHS } from "./routes";

export class RouterModule {
    constructor() {
        const ROUTER = new Router(PATHS);
        window['ROUTER'] = ROUTER;
    }
}