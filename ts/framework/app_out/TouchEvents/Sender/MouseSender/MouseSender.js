//{INSERTORDER:4}
var seven;
(function (seven) {
    class MouseSender extends seven.TouchSender {
        constructor() {
            super();
            this.orgin = seven.Orgin.empty();
            this.mousePressedDown = false;
            this.startOrgin = seven.Orgin.empty();
        }
        getClassName() {
            return MouseSender.className;
        }
        /**
         * This gives the instance, which was loaded by the Classloader
         * You can use this to access this instance afterwoulds-or don't, you decide
        */
        static loadedInstance() {
            var loadedInstance = seven.ClassLoader.manager().getLoadedInstance(MouseSender.className);
            if (loadedInstance != undefined) {
                return loadedInstance;
            }
            var mouseSender = new MouseSender();
            seven.TouchManager.manager().mouseSender = mouseSender;
            mouseSender.initEvents();
            return mouseSender;
        }
        getConfiguration() {
            return this.configuration;
        }
        initEvents() {
            seven.Objects.requireNonNull("MouseTouchSender.touchReciever must not be null", this.touchReciever);
            document.onmousedown = (event) => {
                this.mousedown.call(this, event);
            };
            document.onmousemove = (event) => {
                this.mousemove.call(this, event);
            };
            document.onmouseup = (event) => {
                this.mouseup.call(this, event);
            };
            document.onmouseout = (event) => {
                this.mouseout.call(this, event);
            };
            document.onwheel = (event) => {
                event.preventDefault();
                //console.log(event.deltaX);
                this.wheel(event);
            };
        }
        mousePressed() {
            this.mousePressedDown = true;
        }
        //@override TouchSender
        getUserInfo(event) {
            var userInfo = { "x": event.clientX, "y": event.clientY };
            return userInfo;
        }
        /* Callback functions for Events */
        mousedown(event) {
            this.time = window.setTimeout(() => {
                this.mousePressed();
            }, 100);
            var userInfo = this.getUserInfo(event);
            var touchEvent = this.mouseDownRecievedTouchEvent(userInfo);
            for (let entry of this.eventReciever.values()) {
                entry.mousedown(event, touchEvent);
            }
            this.touchReciever.touchBegan(touchEvent);
        }
        mousemove(event) {
            var userInfo = this.getUserInfo(event);
            var touchEvent = this.mouseMoveRecievedTouchEvent(userInfo);
            for (let entry of this.eventReciever.values()) {
                entry.mousemove(event, touchEvent);
            }
            this.touchReciever.touchMoved(touchEvent);
        }
        mouseup(event) {
            window.clearTimeout(this.time);
            var userInfo = this.getUserInfo(event);
            var touchEvent = this.mouseUpRecievedTouchEvent(userInfo);
            for (let entry of this.eventReciever.values()) {
                entry.mouseup(event, touchEvent);
            }
            this.touchReciever.touchEnded(touchEvent);
            this.resetState();
        }
        wheel(event) {
            //console.log(event.wheelDeltaX + " " + event.wheelDeltaY);
            for (let entry of this.eventReciever.values()) {
                if (typeof entry.mousewheel != "function") {
                    continue;
                }
                entry.mousewheel(event);
            }
        }
        mouseout(event) {
            if (event.fromElement != event.toElement) {
                return;
            }
            var userInfo = this.getUserInfo(event);
            var touchEvent = this.mouseOutRecievedTouchEvent(userInfo);
            for (let entry of this.eventReciever.values()) {
                entry.mouseout(event, touchEvent);
            }
            this.touchReciever.touchCanceled(touchEvent);
            this.resetState();
        }
        /* Proccessing events for touch reciever  */
        mouseDownRecievedTouchEvent(userInfo) {
            this.orgin = new seven.Orgin(userInfo.x, userInfo.y);
            this.startOrgin = new seven.Orgin(userInfo.x, userInfo.y);
            var mouseOrgin = new seven.Orgin(userInfo.x, userInfo.y);
            var touchEvent = new seven.JBTouchEvent();
            touchEvent.setDragging(false);
            touchEvent.setOrgin(mouseOrgin);
            touchEvent.setDifference(seven.Orgin.difference(mouseOrgin, this.orgin));
            touchEvent.setDifferenceFromStart(new seven.Orgin(0, 0));
            return touchEvent;
        }
        mouseMoveRecievedTouchEvent(userInfo) {
            var touchEvent = new seven.JBTouchEvent();
            var mouseOrgin = new seven.Orgin(userInfo.x, userInfo.y);
            if (this.orgin.isEmpty() == true) {
                this.orgin = mouseOrgin;
            }
            if (this.mousePressedDown == true) {
                touchEvent.setDragging(true);
            }
            touchEvent.setOrgin(mouseOrgin);
            touchEvent.setDifference(seven.Orgin.difference(mouseOrgin, this.orgin));
            touchEvent.setDifferenceFromStart(seven.Orgin.difference(mouseOrgin, this.startOrgin));
            this.orgin = seven.Orgin.copyOrgin(mouseOrgin);
            return touchEvent;
        }
        mouseUpRecievedTouchEvent(userInfo) {
            var touchEvent = new seven.JBTouchEvent();
            var mouseOrgin = new seven.Orgin(userInfo.x, userInfo.y);
            touchEvent.setDragging(false);
            touchEvent.setOrgin(mouseOrgin);
            touchEvent.setDifference(seven.Orgin.difference(mouseOrgin, this.orgin));
            touchEvent.setDifferenceFromStart(seven.Orgin.difference(mouseOrgin, this.startOrgin));
            return touchEvent;
        }
        mouseOutRecievedTouchEvent(userInfo) {
            var touchEvent = new seven.JBTouchEvent();
            var mouseOrgin = new seven.Orgin(userInfo.x, userInfo.y);
            touchEvent.setDragging(false);
            touchEvent.setOrgin(mouseOrgin);
            touchEvent.setDifference(seven.Orgin.difference(mouseOrgin, this.orgin));
            return touchEvent;
        }
        resetState() {
            this.orgin = seven.Orgin.empty();
            this.startOrgin = seven.Orgin.empty();
            this.mousePressedDown = false;
        }
    }
    MouseSender.className = "seven.MouseSender";
    seven.MouseSender = MouseSender;
})(seven || (seven = {}));
