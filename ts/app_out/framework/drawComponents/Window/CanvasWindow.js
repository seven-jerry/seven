//{INSERTORDER:3}
var seven;
(function (seven) {
    class CanvasWindow extends seven.JMBWindow {
        constructor() {
            super();
        }
        static new(canvasID, rect, controller = new seven.ViewController()) {
            return new CanvasWindow().initWithId(canvasID, rect, controller);
        }
        initWithId(htmlId, rect, controller) {
            super.init(htmlId, controller);
            this.controller.view = new seven.HtmlCanvasView(this.htmlElementId).initWitFrame(rect);
            this.view = this.controller.view;
            return this;
        }
        setupView() {
            this.view = new seven.HtmlCanvasView(this.htmlElementId);
        }
        remove() {
            this.view.remove();
        }
    }
    seven.CanvasWindow = CanvasWindow;
})(seven || (seven = {}));
