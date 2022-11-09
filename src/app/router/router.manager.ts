
export class Router {
    paths: any;
    constructor(paths) {
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
            this.removeLastPage($CONTAINER);
            $CONTAINER.innerHTML = template;
            window.history.pushState({}, "done", path);
        }
    }

    private removeLastPage(container){
        if(container.children.length > 0){
            container.children[0].remove();
        }
    }
}