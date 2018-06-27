//{INSERTORDER:2}
var seven;
(function (seven) {
    class GestureCallback extends seven.JBObject {
        constructor() {
            super();
        }
        initWithMethod(thisRef, method) {
            this.thisRef = thisRef;
            this.method = method;
            return this;
        }
        call(values) {
            this.method.call(this.thisRef);
        }
        getType() {
            return seven.GestureType.None;
        }
        getKey() {
            return "" + seven.GestureType.None;
        }
        copyAttributes(toObject) {
            super.copyAttributes(toObject);
            toObject.thisRef = this.thisRef;
            toObject.method = this.method;
        }
        copy() {
            var newObject = new GestureCallback();
            this.copyAttributes(newObject);
            return newObject;
        }
    }
    seven.GestureCallback = GestureCallback;
})(seven || (seven = {}));
