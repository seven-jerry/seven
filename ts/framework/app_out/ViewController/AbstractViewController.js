//{INSERTORDER:2}
var seven;
(function (seven) {
    class AbstractViewController extends seven.JBObject {
        constructor() {
            super();
            this.childViewController = new Array();
            this.parentViewController = undefined;
        }
        addChildViewController(viewController) {
            viewController.setParentViewController(this);
            this.childViewController.push(viewController);
        }
        setParentViewController(viewController) {
            this.parentViewController = viewController;
        }
        setView(view) {
            this.view = view;
        }
        dragStart(orgin, view) {
            return view;
        }
        dragHasMoved(orgin, view) {
            if (this.parentViewController != undefined) {
                this.parentViewController.dragHasMoved(orgin, view);
            }
        }
        dragHasEnded(orgin, view) {
            if (this.parentViewController != undefined) {
                return this.parentViewController.dragHasEnded(orgin, view);
            }
            return false;
        }
        dragHasLeft() {
            if (this.parentViewController != undefined) {
                this.parentViewController.dragHasLeft();
            }
        }
    }
    seven.AbstractViewController = AbstractViewController;
})(seven || (seven = {}));
