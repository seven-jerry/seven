//{INSERTORDER:3}
var seven;
(function (seven) {
    class ClickGestureCallback extends seven.GestureCallback {
        constructor() {
            super();
        }
        static keyOf(values) {
            return ClickGestureCallback.keyGenerator.getKey();
        }
        getKey() {
            return "" + seven.GestureType.Click;
        }
        getType() {
            return seven.GestureType.Click;
        }
        copyAttributes(toObject) {
            super.copyAttributes(toObject);
        }
        copy() {
            var newObject = new ClickGestureCallback();
            this.copyAttributes(newObject);
            return newObject;
        }
    }
    ClickGestureCallback.keyGenerator = new ClickGestureCallback();
    seven.ClickGestureCallback = ClickGestureCallback;
})(seven || (seven = {}));
