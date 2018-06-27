//{INSERTORDER:3}
var seven;
(function (seven) {
    class TapGestureCallback extends seven.GestureCallback {
        constructor() {
            super();
            this.tapNumber = 0;
        }
        static keyOf(values) {
            TapGestureCallback.keyGenerator.tapNumber = values.get("tapCount");
            return TapGestureCallback.keyGenerator.getKey();
        }
        initWithMethod(thisRef, method) {
            throw new Error("TouchEvents::initWithMethod : bad init method ");
        }
        init(thisRef, tapNumber, method) {
            super.initWithMethod(thisRef, method);
            this.tapNumber = tapNumber;
            return this;
        }
        getKey() {
            return "" + seven.GestureType.Tap + "" + this.tapNumber;
        }
        getType() {
            return seven.GestureType.Tap;
        }
        copyAttributes(toObject) {
            super.copyAttributes(toObject);
        }
        copy() {
            var newObject = new TapGestureCallback();
            this.copyAttributes(newObject);
            return newObject;
        }
        call(values) {
            if (values.get("tapCount") == this.tapNumber) {
                this.method.call(this.thisRef);
            }
        }
    }
    TapGestureCallback.keyGenerator = new TapGestureCallback();
    seven.TapGestureCallback = TapGestureCallback;
})(seven || (seven = {}));
