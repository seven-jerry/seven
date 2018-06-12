namespace seven {
    export abstract class Gesture extends JBObject implements IMouseSenderAccess, IScreenSenderAccess {
        delegate: IGestureDelegate;
        touchBeganPosition: ITouchEvent;
        touchEndPosition: ITouchEvent;
        configuration: IGestureConfiguration;

        constructor() {
            super();
        }
        public setDelegate(delegate: IGestureDelegate): void {
            this.delegate = delegate;
        }
        public setConfiguration(configuration: GestureConfiguration): void {
            this.configuration = configuration;
        }
        getKey(): GestureType {
            return GestureType.None;
        }

        touchstart(event: any, touchEvent: ITouchEvent) {
            this.touchBeganPosition = touchEvent.copy();
        }
        touchmove(event: any, touchEvent: ITouchEvent) {
        }
        touchend(event: any, touchEvent: ITouchEvent) {
            this.touchEndPosition = touchEvent.copy();
        }
        touchcancel(event: any, touchEvent: ITouchEvent) {
        }
        mousedown(event: any, touchEvent: ITouchEvent) {
            this.touchBeganPosition = touchEvent.copy();
        }
        mouseup(event: any, touchEvent: ITouchEvent) {
            this.touchEndPosition = touchEvent.copy();
        }
        mousemove(event: any, touchEvent: ITouchEvent) {
        }
        mouseout(event: any, touchEvent: ITouchEvent) {
            this.touchEndPosition = touchEvent.copy();
        }


        protected endTouchInClickRange(range: Rect): boolean {
            if (this.touchBeganPosition == undefined || this.touchEndPosition == undefined) {
                Logger.develeporError("touchPositions not defined");
                return false;
            }

            var orgin: Orgin = this.touchEndPosition.getOrgin().copy();
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
}