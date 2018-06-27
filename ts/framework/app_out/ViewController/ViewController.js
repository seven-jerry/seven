//{INSERTORDER:3}
var seven;
(function (seven) {
    class ViewController extends seven.AbstractViewController {
        constructor() {
            super();
        }
        documentController() {
            seven.Objects.requireNonNull("ViewController.docuemntController : tried to access nonnull value", seven.JBDocument.document().documentController);
            return seven.JBDocument.document().documentController;
        }
        setParentViewController(viewController) {
            this.parentViewController = viewController;
        }
    }
    seven.ViewController = ViewController;
})(seven || (seven = {}));
