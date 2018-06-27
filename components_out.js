//{INSERTORDER:4}
var components;
(function (components) {
    var html;
    (function (html) {
        class InputView extends seven.HtmlElementView {
            constructor(elementId) {
                super(elementId);
                this.element.type = "text";
            }
            setText(text) {
                throw new Error("Method not implemented.");
            }
            getText() {
                throw new Error("Method not implemented.");
            }
            getType() {
                return "input";
            }
        }
        html.InputView = InputView;
    })(html = components.html || (components.html = {}));
})(components || (components = {}));