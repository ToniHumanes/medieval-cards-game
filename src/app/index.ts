
import '../styles/styles.scss';
import { AppModule } from './app.module';

class initApp {
    constructor(){
        new AppModule();
    }
}

new initApp();