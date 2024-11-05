import { ComponentModule } from "./components/modules/component.module";
import { PageModule } from "./pages/modules/pages.module";
import { RouterModule } from "./router/router.module";

export class AppModule {
  constructor() {
    new ComponentModule();
    new PageModule();
    new RouterModule();
  }
}
