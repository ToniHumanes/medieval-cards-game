
export class Router {
    paths: any;
    constructor(paths) {
        debugger;
        this.paths = paths;
        this.initRouter();
    }

    initRouter() {
        const { location: { pathname = "/" } } = window;
        const URL = pathname === "/" ? "home" : pathname.replace("/", "");
        this.load(URL);
    }

    load(page = "home") {
        const { paths } = this;
        const { path, template } = paths[page] || paths.error;
        const $CONTAINER = document.querySelector("#content");
        if($CONTAINER){
            $CONTAINER.innerHTML = template;
            window.history.pushState({}, "done", path);
        }
    }
}