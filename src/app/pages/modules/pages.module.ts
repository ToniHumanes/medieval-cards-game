
import { HomePage } from "../home/home";
import { AboutPage } from "../about/about";


export class PageModule {
    constructor() {
        new HomePage();
        new AboutPage();
    }
}