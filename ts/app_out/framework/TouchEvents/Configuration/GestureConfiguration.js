//{INSERTORDER:2}
var seven;
(function (seven) {
    class GestureConfiguration extends seven.JBObject {
        constructor() {
            super();
            // this shows how much the user can move the mouse from mouseDown to mouseUp
            // to be valid click
            // it this case it means 10 px
            this.mouseClickRange = new seven.Rect(-5, -5, 10, 10);
            // this shows how much the user can move his finger from touchStart till touchEnd
            // to be valid click
            // it this case it means 20 px
            this.screenClickRange = new seven.Rect(-20, -20, 40, 40);
            // if the next tap happens within this time it gets added to the tapCount
            // ie. tapCount=1 -> next tap within time -> tapCount=2
            // else it will be treated as a new tap(tapCount=1)
            this.tapRetouchTimeout = 300 /* ms*/;
            // if the mouse/touch is held down too long it is no longer a tap
            this.tapMaximumTouchDown = 500;
        }
        getMouseClickRange() {
            return this.mouseClickRange;
        }
        setMouseClickRange(range) {
            this.mouseClickRange = range;
        }
        getScreenClickRange() {
            return this.screenClickRange;
        }
        setScreenClickRange(range) {
            this.screenClickRange = range;
        }
        getTapRetouchTimeout() {
            return this.tapRetouchTimeout;
        }
        getTapMaximumTouchDowm() {
            return this.tapMaximumTouchDown;
        }
    }
    seven.GestureConfiguration = GestureConfiguration;
})(seven || (seven = {}));
