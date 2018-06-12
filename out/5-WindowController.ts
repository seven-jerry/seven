//{INSERTORDER:3}

namespace seven {
    export class WindowController extends AbstractViewController {
    window: JMBWindow;
    public static className:string = "WindowController";
    public getClassName():string{
        return WindowController.className;
    }
    constructor() {
        super()
    }
    setWindow(window: JMBWindow) {
        this.window = window;
    }
    addChildViewController(viewController: ViewController): void {
        viewController.setParentViewController(this);
        viewController.windowController = this;
        this.childViewController.push(viewController);
    }
}
}