//{INSERTORDER:2}
var seven;
(function (seven) {
    class JMBWindow extends seven.JBObject {
        constructor() {
            super();
        }
        init(htmlId, controller = new seven.ViewController()) {
            this.htmlElementId = htmlId;
            this.htmlElement = document.getElementById(htmlId);
            this.controller = controller;
            Object.freeze(this.htmlElement);
            return this;
        }
        setupTouches() {
        }
        getController() {
            return this.controller;
        }
        hasMovedToWindowController(controller) {
            this.controller = controller;
        }
    }
    seven.JMBWindow = JMBWindow;
})(seven || (seven = {}));
