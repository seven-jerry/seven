//{INSERTORDER:2}
var seven;
(function (seven) {
    class TouchIntepreter extends seven.JBObject {
        constructor() {
            super();
        }
        setDelegate(delegate) {
            this.delegate = delegate;
        }
    }
    seven.TouchIntepreter = TouchIntepreter;
})(seven || (seven = {}));
