//{INSERTORDER:2}
var seven;
(function (seven) {
    class TouchSenderConfiguration extends seven.JBObject {
        constructor() {
            super();
            this.keyHoldMove = 400;
            this.screenLongPressTime = 300;
            this.mouseLongPressTime = 100;
        }
        getKeyHoldMove() {
            return this.keyHoldMove;
        }
        setKeyHoldMove(value) {
            this.keyHoldMove = value;
        }
        setScreenLongPressTime(longPressTime) {
            this.screenLongPressTime = longPressTime;
        }
        getScreenLongPressTime() {
            return this.screenLongPressTime;
        }
        setMouseLongPressTime(longPressTime) {
            this.mouseLongPressTime = longPressTime;
        }
        getMouseLongPressTime() {
            return this.mouseLongPressTime;
        }
    }
    seven.TouchSenderConfiguration = TouchSenderConfiguration;
})(seven || (seven = {}));
