//{INSERTORDER:4}
var seven;
(function (seven) {
    class KeyboardSender extends seven.TouchSender {
        constructor() {
            super(...arguments);
            this.acceleration = 1.0;
        }
        getClassName() {
            return KeyboardSender.className;
        }
        /**
         * This gives the instance, which was loaded by the Classloader
         * You can use this to access this instance afterwoulds-or don't, you decide
        */
        static loadedInstance() {
            var loadedInstance = seven.ClassLoader.manager().getLoadedInstance(KeyboardSender.className);
            if (loadedInstance != undefined) {
                return loadedInstance;
            }
            var keyboardSender = new KeyboardSender();
            seven.TouchManager.manager().keyboardSender = keyboardSender;
            keyboardSender.initEvents();
            return keyboardSender;
        }
        initEvents() {
            seven.Objects.requireNonNull("MouseTouchSender.reciever must not be null", this.touchReciever);
            var that = this;
            document.onkeydown = (event) => {
                that.keyDown.call(that, event);
            };
            document.onkeyup = (event) => {
                that.keyUp.call(that, event);
            };
            document.onkeypress = (event) => {
                that.keyPress.call(that, event);
            };
        }
        getConfiguration() {
            return this.configuration;
        }
        keyDown(event) {
            this.sendKeyDown(event);
            //  clearInterval(this.timer);
            var that = this;
            //  this.timer = setInterval(function () {
            //     that.sendKeyDown(event);
            //  }, this.configuration.getKeyHoldMove());
        }
        sendKeyDown(event) {
            var userInfo = this.getUserInfo(event);
            var touchEvent = this.keyDownRecieved(userInfo);
            if (touchEvent == undefined) {
                return;
            }
            for (let entry of this.eventReciever.values()) {
                entry.keyDown(event, touchEvent);
            }
            this.touchReciever.touchMoved(touchEvent);
        }
        keyUp(event) {
            this.acceleration = 1.0;
        }
        keyPress(event) {
        }
        getUserInfo(event) {
            return { "key": event.key };
        }
        keyDownRecieved(userInfo) {
            this.acceleration += 0.2;
            var difference = this.differenceForKey(userInfo.key);
            if (difference == undefined) {
                return undefined;
            }
            var touchEvent = new seven.JBTouchEvent();
            touchEvent.setDifference(difference);
            return touchEvent;
        }
        differenceForKey(key) {
            var move = 10 * this.acceleration;
            if (key == "ArrowLeft") {
                //left
                return new seven.Orgin(move, 0);
            }
            if (key == "ArrowUp") {
                //up
                return new seven.Orgin(0, move);
            }
            if (key == "ArrowRight") {
                //right
                return new seven.Orgin(-move, 0);
            }
            if (key == "ArrowDown") {
                //down
                return new seven.Orgin(0, -move);
            }
            return undefined;
        }
    }
    KeyboardSender.className = "seven.KeyboardSender";
    seven.KeyboardSender = KeyboardSender;
})(seven || (seven = {}));
