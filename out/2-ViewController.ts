//{INSERTORDER:3}

namespace seven {
    export class ViewController extends AbstractViewController {
    protected _windowController: WindowController;
    childViewController: Array<AbstractViewController>;

    constructor() {
        super();
        
    }
    public documentController(): DocumentController {
        Objects.requireNonNull("ViewController.docuemntController : tried to access nonnull value", JBDocument.document().documentController);
        return JBDocument.document().documentController;
    }
    public get windowController(): WindowController {
        Objects.requireNonNull("ViewController.windowController : tried to access nonnull value", this._windowController);
        return this._windowController;
    }
    public set windowController(value: WindowController) {
        this._windowController = value;
    }
    public setParentViewController(viewController: WindowController | ViewController): void {
        this.parentViewController = viewController;
        if (viewController.getClassName() == WindowController.className) {
            this.windowController = <WindowController>viewController;
        }
    }

}
}