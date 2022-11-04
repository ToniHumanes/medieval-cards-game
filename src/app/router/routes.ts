
import home from '../pages/home/home.html';

export const PATHS = {
    home: {
        path: "/",
        template: home,
    },
    about: {
        path: "/about",
        template: `<h1>Sobre mi</h1>`,
    },
    contact: {
        path: "/contact",
        template: `<h1>Contacto</h1>`,
    }
}