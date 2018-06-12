//{INSERTORDER:2}

namespace seven {

    export class GestureConfiguration extends JBObject implements IGestureConfiguration, ITapGestureConfiguration {
        // this shows how much the user can move the mouse from mouseDown to mouseUp
        // to be valid click
        // it this case it means 10 px
        private mouseClickRange: Rect = new Rect(-5, -5, 10, 10);
        // this shows how much the user can move his finger from touchStart till touchEnd
        // to be valid click
        // it this case it means 20 px
        private screenClickRange: Rect = new Rect(-20, -20, 40, 40);
        // if the next tap happens within this time it gets added to the tapCount
        // ie. tapCount=1 -> next tap within time -> tapCount=2
        // else it will be treated as a new tap(tapCount=1)
        private tapRetouchTimeout: number = 300/* ms*/;
        // if the mouse/touch is held down too long it is no longer a tap
        private tapMaximumTouchDown: number = 500;
        constructor() {
            super();
        }
        public getMouseClickRange(): Rect {
            return this.mouseClickRange;
        }
        public setMouseClickRange(range: Rect) {
            this.mouseClickRange = range;
        }
        public getScreenClickRange(): Rect {
            return this.screenClickRange;
        }
        public setScreenClickRange(range: Rect) {
            this.screenClickRange = range;
        }
        public getTapRetouchTimeout(): number {
            return this.tapRetouchTimeout;
        }
        public getTapMaximumTouchDowm(): number {
            return this.tapMaximumTouchDown;
        }
    }
}