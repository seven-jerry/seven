//{INSERTORDER:4}

namespace seven {
    export class TapGesture extends Gesture implements IMouseSenderAccess, IScreenSenderAccess {
        public delegate: ITapGestureDelegate;
        public configuration: ITapGestureConfiguration;
        public delegateData: JMBMap<string, any> = new JMBMap<string, any>();
        private tapCount: number = 0;
        public static className: string = "seven.TapGesture";
        private touchDownTimer: number;
        private nextTouchTimer: number;
        private firstTouchOrgin: Orgin = Orgin.empty();
        /**
         * This gives the instance, which was loaded by the Classloader
         * You can use this to access this instance afterwoulds-or don't, you decide
        */
        public static loadedInstance(): TapGesture {
            var loadedInstance = ClassLoader.manager().getLoadedInstance(TapGesture.className);
            if (loadedInstance != undefined) {
                return loadedInstance;
            }
            var clickGesture = new TapGesture();
            TouchManager.manager().tapGesture = clickGesture;
            return clickGesture;
        }
        constructor() {
            super();
            this.setDelegate(JBDocument.document());
        }
        public getClassName(): string {
            return TapGesture.className;
        }
        public setDelegate(delegate: ITapGestureDelegate): void {
            this.delegate = delegate;
        }
        getKey(): GestureType {
            return GestureType.Tap;
        }

        touchstart(event: any, touchEvent: ITouchEvent) {
            super.touchstart(event, touchEvent);
            if (this.firstTouchOrgin.isEmpty() == true) {
                this.firstTouchOrgin = touchEvent.getOrgin().copy();
            }
            this.start();
        }
        touchend(event: any, touchEvent: ITouchEvent) {
            super.touchend(event, touchEvent);
            this.end(this.configuration.getScreenClickRange());
        }


        mousedown(event: any, touchEvent: ITouchEvent) {
            super.mousedown(event, touchEvent);
            if (this.firstTouchOrgin.isEmpty() == true) {
                this.firstTouchOrgin = touchEvent.getOrgin().copy();
            }
            this.start();
        }

        mouseup(event: any, touchEvent: ITouchEvent) {
            super.mouseup(event, touchEvent);
            this.end(this.configuration.getMouseClickRange());
        }

        private start() {
            console.log("start");
            clearTimeout(this.nextTouchTimer);
            this.touchDownTimer = setTimeout(() => {
                this.tapCount = 0;
                this.firstTouchOrgin = Orgin.empty();
            }, this.configuration.getTapMaximumTouchDowm());
        }
        private end(range: Rect) {
            console.log("end");
            clearTimeout(this.nextTouchTimer);
            clearTimeout(this.touchDownTimer);
            this.checkForClick(range);

            this.nextTouchTimer = setTimeout(() => {
                this.sendEvent(true);
                this.tapCount = 0;
                this.firstTouchOrgin = Orgin.empty();
            }, this.configuration.getTapRetouchTimeout());
            return;
        }
        private checkForClick(range: Rect) {

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

        private sendEvent(timmerCalled: boolean) {
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

        private getDelegateData(): JMBMap<string, any> {
            this.delegateData.put("tapCount", this.tapCount);
            return this.delegateData;
        }
    }
}
seven.ClassLoader.manager().loadInstance(seven.TapGesture.className);