var seven;
(function (seven) {
    class Gesture extends seven.JBObject {
        constructor() {
            super();
        }
        setDelegate(delegate) {
            this.delegate = delegate;
        }
        setConfiguration(configuration) {
            this.configuration = configuration;
        }
        getKey() {
            return seven.GestureType.None;
        }
        touchstart(event, touchEvent) {
            this.touchBeganPosition = touchEvent.copy();
        }
        touchmove(event, touchEvent) {
        }
        touchend(event, touchEvent) {
            this.touchEndPosition = touchEvent.copy();
        }
        touchcancel(event, touchEvent) {
        }
        mousedown(event, touchEvent) {
            this.touchBeganPosition = touchEvent.copy();
        }
        mouseup(event, touchEvent) {
            this.touchEndPosition = touchEvent.copy();
        }
        mousemove(event, touchEvent) {
        }
        mouseout(event, touchEvent) {
            this.touchEndPosition = touchEvent.copy();
        }
        endTouchInClickRange(range) {
            if (this.touchBeganPosition == undefined || this.touchEndPosition == undefined) {
                seven.Logger.develeporError("touchPositions not defined");
                return false;
            }
            var orgin = this.touchEndPosition.getOrgin().copy();
            orgin.removeOrgin(this.touchBeganPosition.getOrgin());
            if (orgin.x < range.x() || orgin.x > range.topRight()) {
                return false;
            }
            if (orgin.y < range.y() || orgin.y > range.bottomLeft()) {
                return false;
            }
            return true;
        }
    }
    seven.Gesture = Gesture;
})(seven || (seven = {}));
