//{INSERTORDER:2}

namespace seven {
    export abstract class JMBWindow extends JBObject implements IWindow {
    view: View;
    windowController: WindowController;
    htmlElementId: string;
    htmlElement: HTMLElement;
  

    constructor() {
        super()
    }

    initWithID(id: string) {
        this.htmlElementId = id;
        this.htmlElement = document.getElementById(id);
        Object.freeze(this.htmlElement);
    }
    setupTouches() {
    }
    

    setController(controller: WindowController) {
        this.windowController = controller;
        controller.setWindow(this);
        if(this.view != undefined){
            this.view.setController(controller);            
        }
    }
    getController(): WindowController {
        return this.windowController;
    }

    hasMovedToWindowController(controller: WindowController) {
        this.windowController = controller;
    }


}
}