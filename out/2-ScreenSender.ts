//{INSERTORDER:4}

namespace seven {
    export class ScreenSender extends TouchSender implements IScreenSender {
        public static className:string = "seven.ScreenSender";
        public getClassName():string{
            return ScreenSender.className;
        }
        eventReciever: JMBMap<string, IScreenSenderAccess>;
        orgin: Orgin = Orgin.empty();
        mousePressedDown: boolean = false;
        longPressTimer: number;
        hasLongTouch: boolean = false;
        startOrgin: Orgin = Orgin.empty();
        longPressCallback: VoidCallback;

        /**
         * This gives the instance, which was loaded by the Classloader
         * You can use this to access this instance afterwoulds-or don't, you decide
        */
        public static loadedInstance(): ScreenSender {
            var loadedInstance = ClassLoader.manager().getLoadedInstance(ScreenSender.className);
            if (loadedInstance != undefined) {
                return loadedInstance;
            }
            var screenSender = new ScreenSender();
            TouchManager.manager().screenSender = screenSender;
            screenSender.initEvents();
            return screenSender;
        }
        public constructor() {
            super();
        }
        public getConfiguration(): IScreenConfiguration {
            return this.configuration;
        }
        public addLongPressCallback(callBack: VoidCallback) {
            this.longPressCallback = callBack;
        }
        public initEvents(): void {
            Objects.requireNonNull("ScreenTouchSender.touchreciever must not be null", this.touchReciever);
            var that = this;

            $(document).on("touchstart", function (event: any) {
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
        protected getUserInfo(event: any): Object {
            return { "x": event.originalEvent.pageX, "y": event.originalEvent.pageY };
        }

        /* Callback functions for Events */
        private touchstart(event: any): void {
            var userInfo = this.getUserInfo(event);
            var touchEvent = this.touchStartRecievedTouchEvent(userInfo);
            for (let entry of this.eventReciever.values()) {
                entry.touchstart(event, touchEvent);
            }
            var that = this;
            this.longPressTimer = window.setTimeout(function () { that.haslongTouchTrue.call(that) }, this.getConfiguration().getScreenLongPressTime());
            this.touchReciever.touchBegan(touchEvent);
        }

        private touchmove(event: any): void {
            var userInfo = this.getUserInfo(event);
            var touchEvent = this.touchMovedReceivedTouchEvent(userInfo);
            for (let entry of this.eventReciever.values()) {
                entry.touchmove(event, touchEvent);
            }
            clearTimeout(this.longPressTimer);
            this.touchReciever.touchMoved(touchEvent);
        }
        private touchend(event: any): void {
            var userInfo = this.getUserInfo(event);
            var touchEvent = this.touchEndedRecievedTouchEvent(userInfo);
            for (let entry of this.eventReciever.values()) {
                entry.touchend(event, touchEvent);
            }

            this.touchReciever.touchEnded(touchEvent);
            this.resetState();
        }
        private touchcancel(event: any): void {
            var userInfo = this.getUserInfo(event);
            var touchEvent = this.touchCanceledRecievedTouchEvent(userInfo);
            for (let entry of this.eventReciever.values()) {
                entry.touchcancel(event, touchEvent);
            }
            this.touchReciever.touchCanceled(touchEvent);
            this.resetState();

        }


        /* Proccessing events for touch reciever  */
        private touchStartRecievedTouchEvent(userInfo: any): ITouchEvent {
            this.orgin = new Orgin(userInfo.x, userInfo.y);
            this.startOrgin = new Orgin(userInfo.x, userInfo.y);
            var touchOrgin = new Orgin(userInfo.x, userInfo.y);
            var touchEvent: ITouchEvent = new JBTouchEvent();
            touchEvent.setOrgin(touchOrgin);
            touchEvent.setDifference(Orgin.difference(touchOrgin, this.orgin));

            return touchEvent;
        }

        private touchMovedReceivedTouchEvent(userInfo: any): ITouchEvent {
            var touchEvent = new JBTouchEvent();
            var touchOrgin = new Orgin(userInfo.x, userInfo.y);
            touchEvent.setDragging(this.hasLongTouch);
            touchEvent.setOrgin(touchOrgin);
            touchEvent.setDifference(Orgin.difference(touchOrgin, this.orgin));
            touchEvent.setDifferenceFromStart(Orgin.difference(touchOrgin, this.startOrgin));
            this.orgin = Orgin.copyOrgin(touchOrgin);
            return touchEvent;
        }

        private touchEndedRecievedTouchEvent(userInfo: any): ITouchEvent {
            var touchEvent = new JBTouchEvent();
            var touchOrgin = new Orgin(userInfo.x, userInfo.y);
            touchEvent.setOrgin(touchOrgin);
            touchEvent.setDifference(Orgin.difference(touchOrgin, this.orgin));
            touchEvent.setDifferenceFromStart(Orgin.difference(touchOrgin, this.startOrgin));
            return touchEvent;
        }
        private touchCanceledRecievedTouchEvent(userInfo: any): ITouchEvent {
            var touchEvent = new JBTouchEvent();
            var touchOrgin = new Orgin(userInfo.x, userInfo.y);

            touchEvent.setOrgin(touchOrgin);
            touchEvent.setDifference(Orgin.difference(touchOrgin, this.orgin));
            touchEvent.setDifferenceFromStart(Orgin.difference(touchOrgin, this.startOrgin));
            return touchEvent;
        }
        private haslongTouchTrue() {
            this.hasLongTouch = true;
            if (this.longPressCallback != undefined) {
                this.longPressCallback.call();
                this.longPressCallback = undefined;
            }
        }
        private resetState() {
            this.orgin = new Orgin(0, 0);
            this.hasLongTouch = false;
            this.longPressCallback = undefined;
            clearTimeout(this.longPressTimer);
        }

    }
}
seven.ClassLoader.manager().after(seven.TouchManager.className, seven.ScreenSender.className);