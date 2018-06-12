//{INSERTORDER:3}

namespace seven {
    export class DocumentController extends AbstractViewController {
    constructor() {
        super();
    }
    
    addChildViewController(viewController: WindowController): void {
        viewController.setParentViewController(this);
        this.childViewController.push(viewController);
    }

}
}