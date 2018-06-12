//{INSERTORDER:4}

namespace seven {
    export class KeyboardSender extends TouchSender implements IKeyboardSender{
        public static className:string = "seven.KeyboardSender";
        public getClassName():string{
            return KeyboardSender.className;
        }
        eventReciever: JMBMap<string, IKeyboardSenderAccess>;
        timer: number;
        acceleration:number = 1.0;
        
        /**
         * This gives the instance, which was loaded by the Classloader
         * You can use this to access this instance afterwoulds-or don't, you decide
        */
        public static loadedInstance(): KeyboardSender {
            var loadedInstance = ClassLoader.manager().getLoadedInstance(KeyboardSender.className);
            if (loadedInstance != undefined) {
                return loadedInstance;
            }
            var keyboardSender = new KeyboardSender();
            TouchManager.manager().keyboardSender = keyboardSender;
            keyboardSender.initEvents();
            return keyboardSender;
        }

        protected initEvents() {
            Objects.requireNonNull("MouseTouchSender.reciever must not be null", this.touchReciever);

            var that = this;
            document.onkeydown = (event: KeyboardEvent) => {
                that.keyDown.call(that, event);
            };
            document.onkeyup = (event: KeyboardEvent) => {
                that.keyUp.call(that, event);
            };
            document.onkeypress = (event: KeyboardEvent) => {
                that.keyPress.call(that, event);
            };
        }
        getConfiguration(): IKeyboardConfiguration {
            return this.configuration;
        }
        keyDown(event: any): any {
          this.sendKeyDown(event);

          //  clearInterval(this.timer);
            var that = this;
          //  this.timer = setInterval(function () {
           //     that.sendKeyDown(event);
          //  }, this.configuration.getKeyHoldMove());
        }
        sendKeyDown(event: any) {
            var userInfo = this.getUserInfo(event);
            var touchEvent: ITouchEvent = this.keyDownRecieved(userInfo);
            if(touchEvent == undefined){
                return;
            }
            for (let entry of this.eventReciever.values()) {
                entry.keyDown(event, touchEvent);
            }
            this.touchReciever.touchMoved(touchEvent);
        }

        keyUp(event: any) {
           this.acceleration = 1.0;
        }

        keyPress(event: any) {

        }

        getUserInfo(event: any) {
            return { "key": event.key };
        }

        keyDownRecieved(userInfo: any) {
            this.acceleration += 0.2;
            var difference = this.differenceForKey(userInfo.key);
            if (difference == undefined) {
                return undefined;
            }
            var touchEvent: ITouchEvent = new JBTouchEvent();
            touchEvent.setDifference(difference);
            return touchEvent;
        }
        differenceForKey(key: string): Orgin {
            var move = 10 * this.acceleration;
            if (key == "ArrowLeft") {
                //left
                return new Orgin(move, 0);
            }
            if (key == "ArrowUp") {
                //up
                return new Orgin(0, move);

            }
            if (key == "ArrowRight") {
                //right
                return new Orgin(-move, 0);
            }
            if (key == "ArrowDown") {
                //down
                return new Orgin(0, -move);
            }
            return undefined;
        }
    }
}
seven.ClassLoader.manager().after(seven.TouchManager.className,seven.KeyboardSender.className);