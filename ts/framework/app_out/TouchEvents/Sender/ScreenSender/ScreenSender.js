//{INSERTORDER:4}
var seven;
(function (seven) {
    class ScreenSender extends seven.TouchSender {
        constructor() {
            super();
            this.orgin = seven.Orgin.empty();
            this.mousePressedDown = false;
            this.hasLongTouch = false;
            this.startOrgin = seven.Orgin.empty();
        }
        getClassName() {
            return ScreenSender.className;
        }
        /**
         * This gives the instance, which was loaded by the Classloader
         * You can use this to access this instance afterwoulds-or don't, you decide
        */
        static loadedInstance() {
            var loadedInstance = seven.ClassLoader.manager().getLoadedInstance(ScreenSender.className);
            if (loadedInstance != undefined) {
                return loadedInstance;
            }
            var screenSender = new ScreenSender();
            seven.TouchManager.manager().screenSender = screenSender;
            screenSender.initEvents();
            return screenSender;
        }
        getConfiguration() {
            return this.configuration;
        }
        addLongPressCallback(callBack) {
            this.longPressCallback = callBack;
        }
        initEvents() {
            seven.Objects.requireNonNull("ScreenTouchSender.touchreciever must not be null", this.touchReciever);
            var that = this;
            $(document).on("touchstart", function (event) {
                event.preventDefault();
                that.touchstart(event);
            });
            $(document).on("touchmove", function (event) {
                event.preventDefault();
                that.touchmove(event);
            });
            $(document).on("touchend", function (event) {
                event.preventDefault();
                that.touchend(event);
            });
            $(document).on("touchcancel", function (event) {
                event.preventDefault();
                that.touchcancel(event);
            });
        }
        //@override TouchSender
        getUserInfo(event) {
            return { "x": event.originalEvent.pageX, "y": event.originalEvent.pageY };
        }
        /* Callback functions for Events */
        touchstart(event) {
            var userInfo = this.getUserInfo(event);
            var touchEvent = this.touchStartRecievedTouchEvent(userInfo);
            for (let entry of this.eventReciever.values()) {
                entry.touchstart(event, touchEvent);
            }
            var that = this;
            this.longPressTimer = window.setTimeout(function () { that.haslongTouchTrue.call(that); }, this.getConfiguration().getScreenLongPressTime());
            this.touchReciever.touchBegan(touchEvent);
        }
        touchmove(event) {
            var userInfo = this.getUserInfo(event);
            var touchEvent = this.touchMovedReceivedTouchEvent(userInfo);
            for (let entry of this.eventReciever.values()) {
                entry.touchmove(event, touchEvent);
            }
            clearTimeout(this.longPressTimer);
            this.touchReciever.touchMoved(touchEvent);
        }
        touchend(event) {
            var userInfo = this.getUserInfo(event);
            var touchEvent = this.touchEndedRecievedTouchEvent(userInfo);
            for (let entry of this.eventReciever.values()) {
                entry.touchend(event, touchEvent);
            }
            this.touchReciever.touchEnded(touchEvent);
            this.resetState();
        }
        touchcancel(event) {
            var userInfo = this.getUserInfo(event);
            var touchEvent = this.touchCanceledRecievedTouchEvent(userInfo);
            for (let entry of this.eventReciever.values()) {
                entry.touchcancel(event, touchEvent);
            }
            this.touchReciever.touchCanceled(touchEvent);
            this.resetState();
        }
        /* Proccessing events for touch reciever  */
        touchStartRecievedTouchEvent(userInfo) {
            this.orgin = new seven.Orgin(userInfo.x, userInfo.y);
            this.startOrgin = new seven.Orgin(userInfo.x, userInfo.y);
            var touchOrgin = new seven.Orgin(userInfo.x, userInfo.y);
            var touchEvent = new seven.JBTouchEvent();
            touchEvent.setOrgin(touchOrgin);
            touchEvent.setDifference(seven.Orgin.difference(touchOrgin, this.orgin));
            return touchEvent;
        }
        touchMovedReceivedTouchEvent(userInfo) {
            var touchEvent = new seven.JBTouchEvent();
            var touchOrgin = new seven.Orgin(userInfo.x, userInfo.y);
            touchEvent.setDragging(this.hasLongTouch);
            touchEvent.setOrgin(touchOrgin);
            touchEvent.setDifference(seven.Orgin.difference(touchOrgin, this.orgin));
            touchEvent.setDifferenceFromStart(seven.Orgin.difference(touchOrgin, this.startOrgin));
            this.orgin = seven.Orgin.copyOrgin(touchOrgin);
            return touchEvent;
        }
        touchEndedRecievedTouchEvent(userInfo) {
            var touchEvent = new seven.JBTouchEvent();
            var touchOrgin = new seven.Orgin(userInfo.x, userInfo.y);
            touchEvent.setOrgin(touchOrgin);
            touchEvent.setDifference(seven.Orgin.difference(touchOrgin, this.orgin));
            touchEvent.setDifferenceFromStart(seven.Orgin.difference(touchOrgin, this.startOrgin));
            return touchEvent;
        }
        touchCanceledRecievedTouchEvent(userInfo) {
            var touchEvent = new seven.JBTouchEvent();
            var touchOrgin = new seven.Orgin(userInfo.x, userInfo.y);
            touchEvent.setOrgin(touchOrgin);
            touchEvent.setDifference(seven.Orgin.difference(touchOrgin, this.orgin));
            touchEvent.setDifferenceFromStart(seven.Orgin.difference(touchOrgin, this.startOrgin));
            return touchEvent;
        }
        haslongTouchTrue() {
            this.hasLongTouch = true;
            if (this.longPressCallback != undefined) {
                this.longPressCallback.call();
                this.longPressCallback = undefined;
            }
        }
        resetState() {
            this.orgin = new seven.Orgin(0, 0);
            this.hasLongTouch = false;
            this.longPressCallback = undefined;
            clearTimeout(this.longPressTimer);
        }
    }
    ScreenSender.className = "seven.ScreenSender";
    seven.ScreenSender = ScreenSender;
})(seven || (seven = {}));
