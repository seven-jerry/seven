//{INSERTORDER:4}
namespace seven {
    export class TouchManager extends JBObject implements ITouchReceiver {
        //sender
        private _keyboardSender: IKeyboardSender;
        private _mouseSender: IMouseSender;
        private _screenSender: IScreenSender;
        //intepreter
        private _dragIntepreter: IDragInterpreter;
        private _scrollInterpreter:IScrollInterpreter; 
        //configuration
        public senderConfiguration: TouchSenderConfiguration;
        public interpreterConfiguration: TouchInterpreterConfiguration;
        public gestureConfiguration: GestureConfiguration;
        //reciever
        public recievers: Array<ITouchReceiver> = new Array<ITouchReceiver>();
        //gestures
        private _tapGesture: TapGesture;

        public static className: string = "seven.TouchManager";
        // Singleton creation
        private static _instance: TouchManager;
        public static manager(): TouchManager {
            if (TouchManager._instance == undefined) {
                TouchManager._instance = new TouchManager();
                TouchManager._instance.senderConfiguration = new TouchSenderConfiguration();
                TouchManager._instance.interpreterConfiguration = new TouchInterpreterConfiguration();
                TouchManager._instance.gestureConfiguration = new GestureConfiguration();
            }
            return TouchManager._instance;
        }
        /**
         * This gives the instance, which was loaded by the Classloader
         * You can use this to access this instance afterwoulds-or don't, you decide
        */
        public static loadedInstance(): TouchManager {
            return TouchManager.manager();
        }

        public constructor() {
            super();
        }
        public getClassName() {
            return "TouchEvents.TouchManager";
        }

        // sender 
        public get keyboardSender(): IKeyboardSender {
            return this._keyboardSender;
        }
        public set keyboardSender(sender: IKeyboardSender) {
            this._keyboardSender = sender;
            sender.touchReciever = this;
            sender.setConfiguration(this.senderConfiguration);
            sender.addEventReciever(this.scrollIntepreter);
        }
        public get mouseSender(): IMouseSender {
            return this._mouseSender;
        }
        public set mouseSender(sender: IMouseSender) {
            this._mouseSender = sender;
            sender.touchReciever = this;
            sender.setConfiguration(this.senderConfiguration);
            sender.addEventReciever(this.dragIntepreter);
            sender.addEventReciever(this.tapGesture);
            sender.addEventReciever(this.scrollIntepreter);
        }

        public get screenSender(): IScreenSender {
            return this._screenSender;
        }

        public set screenSender(sender: IScreenSender) {
            this._screenSender = sender;
            sender.touchReciever = this;
            sender.setConfiguration(this.senderConfiguration);
            sender.addEventReciever(this.dragIntepreter);
            sender.addEventReciever(this.tapGesture);
            sender.addEventReciever(this.scrollIntepreter);
        }


        //interpreter
        public get dragIntepreter(): IDragInterpreter {
            return this._dragIntepreter;
        }

        public set dragIntepreter(intepreter: IDragInterpreter) {
            this._dragIntepreter = intepreter;
        }

        public get scrollIntepreter(): IScrollInterpreter {
            return this._scrollInterpreter;
        }

        public set scrollIntepreter(intepreter: IScrollInterpreter) {
            this._scrollInterpreter = intepreter;
        }

        //gesture

        public get tapGesture(): TapGesture {
            return this._tapGesture;
        }

        public set tapGesture(value: TapGesture) {
            this._tapGesture = value;
            this._tapGesture.setConfiguration(this.gestureConfiguration);
        }


        //reciever
        addTouchReciever(touchReciever: ITouchReceiver) {
            this.recievers.push(touchReciever);
        }

        touchBegan(touchEvent: ITouchEvent) {
            for (let reciever of this.recievers) {
                reciever.touchBegan(touchEvent);
            }
        }

        touchMoved(touchEvent: ITouchEvent) {
            for (let reciever of this.recievers) {
                reciever.touchMoved(touchEvent);
            }
        }
        touchEnded(touchEvent: ITouchEvent) {
            for (let reciever of this.recievers) {
                reciever.touchEnded(touchEvent);
            }
        }
        touchCanceled(touchEvent: ITouchEvent) {
            for (let reciever of this.recievers) {
                reciever.touchCanceled(touchEvent);
            }
        }
    }
}
seven.ClassLoader.manager().loadInstance(seven.TouchManager.className);