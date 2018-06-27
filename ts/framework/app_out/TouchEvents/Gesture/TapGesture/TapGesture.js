//{INSERTORDER:4}
var seven;
(function (seven) {
    class TapGesture extends seven.Gesture {
        constructor() {
            super();
            this.delegateData = new seven.JMBMap();
            this.tapCount = 0;
            this.firstTouchOrgin = seven.Orgin.empty();
            this.setDelegate(seven.JBDocument.document());
        }
        /**
         * This gives the instance, which was loaded by the Classloader
         * You can use this to access this instance afterwoulds-or don't, you decide
        */
        static loadedInstance() {
            var loadedInstance = seven.ClassLoader.manager().getLoadedInstance(TapGesture.className);
            if (loadedInstance != undefined) {
                return loadedInstance;
            }
            var clickGesture = new TapGesture();
            seven.TouchManager.manager().tapGesture = clickGesture;
            return clickGesture;
        }
        getClassName() {
            return TapGesture.className;
        }
        setDelegate(delegate) {
            this.delegate = delegate;
        }
        getKey() {
            return seven.GestureType.Tap;
        }
        touchstart(event, touchEvent) {
            super.touchstart(event, touchEvent);
            if (this.firstTouchOrgin.isEmpty() == true) {
                this.firstTouchOrgin = touchEvent.getOrgin().copy();
            }
            this.start();
        }
        touchend(event, touchEvent) {
            super.touchend(event, touchEvent);
            this.end(this.configuration.getScreenClickRange());
        }
        mousedown(event, touchEvent) {
            super.mousedown(event, touchEvent);
            if (this.firstTouchOrgin.isEmpty() == true) {
                this.firstTouchOrgin = touchEvent.getOrgin().copy();
            }
            this.start();
        }
        mouseup(event, touchEvent) {
            super.mouseup(event, touchEvent);
            this.end(this.configuration.getMouseClickRange());
        }
        start() {
            console.log("start");
            clearTimeout(this.nextTouchTimer);
            this.touchDownTimer = window.setTimeout(() => {
                this.tapCount = 0;
                this.firstTouchOrgin = seven.Orgin.empty();
            }, this.configuration.getTapMaximumTouchDowm());
        }
        end(range) {
            console.log("end");
            clearTimeout(this.nextTouchTimer);
            clearTimeout(this.touchDownTimer);
            this.checkForClick(range);
            this.nextTouchTimer = window.setTimeout(() => {
                this.sendEvent(true);
                this.tapCount = 0;
                this.firstTouchOrgin = seven.Orgin.empty();
            }, this.configuration.getTapRetouchTimeout());
            return;
        }
        checkForClick(range) {
            var testOrgin = this.firstTouchOrgin.copy().removeOrgin(this.touchEndPosition.getOrgin());
            console.log("checkForClick " + testOrgin.toString() + " rect " + range.toString());
            if (this.endTouchInClickRange(range) == true && range.containsOrgin(testOrgin.toAbsolute()) == true) {
                this.tapCount++;
                this.sendEvent(false);
                console.log("tapped");
                // this.delegate.tapRecieved(this.touchEndPosition.getOrgin(), this.getDelegateData());
            }
            this.touchBeganPosition = undefined;
            //this.touchEndPosition = undefined;
        }
        sendEvent(timmerCalled) {
            if (this.tapCount == 0) {
                console.log("sendEvent : tapCount is 0");
                return;
            }
            if (timmerCalled == true) {
                if (this.tapCount == 1) {
                    this.delegate.clickRecieved(this.touchEndPosition.getOrgin(), this.getDelegateData());
                }
                return;
            }
            this.delegate.tapRecieved(this.touchEndPosition.getOrgin(), this.getDelegateData());
        }
        getDelegateData() {
            this.delegateData.put("tapCount", this.tapCount);
            return this.delegateData;
        }
    }
    TapGesture.className = "seven.TapGesture";
    seven.TapGesture = TapGesture;
})(seven || (seven = {}));
seven.ClassLoader.manager().loadInstance(seven.TapGesture.className);
