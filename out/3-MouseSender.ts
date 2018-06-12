//{INSERTORDER:4}

namespace seven {
    export class MouseSender extends TouchSender implements IMouseSender {
        public static className: string = "seven.MouseSender";
        public getClassName(): string {
            return MouseSender.className;
        }
        eventReciever: JMBMap<string, IMouseSenderAccess>;
        orgin: Orgin = Orgin.empty();
        mousePressedDown: boolean = false;
        startOrgin: Orgin = Orgin.empty();
        time: number;
        /**
         * This gives the instance, which was loaded by the Classloader
         * You can use this to access this instance afterwoulds-or don't, you decide
        */
        public static loadedInstance(): MouseSender {
            var loadedInstance = ClassLoader.manager().getLoadedInstance(MouseSender.className);
            if (loadedInstance != undefined) {
                return loadedInstance;
            }
            var mouseSender = new MouseSender();
            TouchManager.manager().mouseSender = mouseSender;
            mouseSender.initEvents();
            return mouseSender;
        }
        public constructor() {
            super();
        }
        public getConfiguration(): IMouseConfiguration {
            return this.configuration;
        }
        public initEvents(): void {
            Objects.requireNonNull("MouseTouchSender.touchReciever must not be null", this.touchReciever);

            document.onmousedown = (event: MouseEvent) => {
                this.mousedown.call(this, event);
            };
            document.onmousemove = (event: MouseEvent) => {
                this.mousemove.call(this, event);
            };

            document.onmouseup = (event: MouseEvent) => {
                this.mouseup.call(this, event);
            };
            document.onmouseout = (event: MouseEvent) => {
                this.mouseout.call(this, event);
            };

            document.onwheel = (event: WheelEvent) => {
                event.preventDefault();
                //console.log(event.deltaX);
                this.wheel(event);
            };

        }
        private mousePressed() {
            this.mousePressedDown = true;
        }
        //@override TouchSender
        protected getUserInfo(event: any): Object {
            var userInfo = { "x": event.clientX, "y": event.clientY };
            return userInfo;
        }
        /* Callback functions for Events */

        private mousedown(event: any): void {
            this.time = setTimeout(() => {
                this.mousePressed();
            }, 100);
            var userInfo = this.getUserInfo(event);
            var touchEvent: ITouchEvent = this.mouseDownRecievedTouchEvent(userInfo);
            for (let entry of this.eventReciever.values()) {
                entry.mousedown(event, touchEvent);
            }
            this.touchReciever.touchBegan(touchEvent);
        }
        private mousemove(event: any): void {
            var userInfo = this.getUserInfo(event);
            var touchEvent: ITouchEvent = this.mouseMoveRecievedTouchEvent(userInfo);
            for (let entry of this.eventReciever.values()) {
                entry.mousemove(event, touchEvent);
            }
            this.touchReciever.touchMoved(touchEvent);
        }

        private mouseup(event: any): void {
            window.clearTimeout(this.time);

            var userInfo = this.getUserInfo(event);
            var touchEvent: ITouchEvent = this.mouseUpRecievedTouchEvent(userInfo);
            for (let entry of this.eventReciever.values()) {
                entry.mouseup(event, touchEvent);
            }
            this.touchReciever.touchEnded(touchEvent);
            this.resetState();
        }

        private wheel(event: WheelEvent): void {
            //console.log(event.wheelDeltaX + " " + event.wheelDeltaY);
            for (let entry of this.eventReciever.values()) {
                if (typeof entry.mousewheel != "function") {
                    continue;
                }
                entry.mousewheel(event);
            }
        }

        private mouseout(event: MouseEvent): void {
            if (event.fromElement != event.toElement) {
                return;
            }

            var userInfo = this.getUserInfo(event);
            var touchEvent: ITouchEvent = this.mouseOutRecievedTouchEvent(userInfo);
            for (let entry of this.eventReciever.values()) {
                entry.mouseout(event, touchEvent);
            }
            this.touchReciever.touchCanceled(touchEvent);
            this.resetState();
        }


        /* Proccessing events for touch reciever  */
        private mouseDownRecievedTouchEvent(userInfo: any): ITouchEvent {
            this.orgin = new Orgin(userInfo.x, userInfo.y);
            this.startOrgin = new Orgin(userInfo.x, userInfo.y);
            var mouseOrgin = new Orgin(userInfo.x, userInfo.y);
            var touchEvent: ITouchEvent = new JBTouchEvent();
            touchEvent.setDragging(false);
            touchEvent.setOrgin(mouseOrgin);
            touchEvent.setDifference(Orgin.difference(mouseOrgin, this.orgin));
            touchEvent.setDifferenceFromStart(new Orgin(0, 0));
            return touchEvent;
        }

        private mouseMoveRecievedTouchEvent(userInfo: any): ITouchEvent {
            var touchEvent = new JBTouchEvent();
            var mouseOrgin = new Orgin(userInfo.x, userInfo.y);
            if (this.orgin.isEmpty() == true) {
                this.orgin = mouseOrgin;
            }
            if (this.mousePressedDown == true) {
                touchEvent.setDragging(true);
            }
            touchEvent.setOrgin(mouseOrgin);
            touchEvent.setDifference(Orgin.difference(mouseOrgin, this.orgin));
            touchEvent.setDifferenceFromStart(Orgin.difference(mouseOrgin, this.startOrgin));
            this.orgin = Orgin.copyOrgin(mouseOrgin);
            return touchEvent;
        }
        private mouseUpRecievedTouchEvent(userInfo: any): ITouchEvent {
            var touchEvent = new JBTouchEvent();
            var mouseOrgin = new Orgin(userInfo.x, userInfo.y);
            touchEvent.setDragging(false);
            touchEvent.setOrgin(mouseOrgin);
            touchEvent.setDifference(Orgin.difference(mouseOrgin, this.orgin));
            touchEvent.setDifferenceFromStart(Orgin.difference(mouseOrgin, this.startOrgin));
            return touchEvent;
        }

        private mouseOutRecievedTouchEvent(userInfo: any): ITouchEvent {
            var touchEvent = new JBTouchEvent();
            var mouseOrgin = new Orgin(userInfo.x, userInfo.y);
            touchEvent.setDragging(false);
            touchEvent.setOrgin(mouseOrgin);
            touchEvent.setDifference(Orgin.difference(mouseOrgin, this.orgin));
            return touchEvent;
        }

        private resetState() {
            this.orgin = Orgin.empty();
            this.startOrgin = Orgin.empty();
            this.mousePressedDown = false;
        }
    }
}

seven.ClassLoader.manager().after(seven.TouchManager.className, seven.MouseSender.className);