//{INSERTORDER:4}
var seven;
(function (seven) {
    class TouchManager extends seven.JBObject {
        constructor() {
            super();
            //reciever
            this.recievers = new Array();
        }
        static manager() {
            if (TouchManager._instance == undefined) {
                TouchManager._instance = new TouchManager();
                TouchManager._instance.senderConfiguration = new seven.TouchSenderConfiguration();
                TouchManager._instance.interpreterConfiguration = new seven.TouchInterpreterConfiguration();
                TouchManager._instance.gestureConfiguration = new seven.GestureConfiguration();
            }
            return TouchManager._instance;
        }
        /**
         * This gives the instance, which was loaded by the Classloader
         * You can use this to access this instance afterwoulds-or don't, you decide
        */
        static loadedInstance() {
            return TouchManager.manager();
        }
        getClassName() {
            return "TouchEvents.TouchManager";
        }
        // sender 
        get keyboardSender() {
            return this._keyboardSender;
        }
        set keyboardSender(sender) {
            this._keyboardSender = sender;
            sender.touchReciever = this;
            sender.setConfiguration(this.senderConfiguration);
            sender.addEventReciever(this.scrollIntepreter);
        }
        get mouseSender() {
            return this._mouseSender;
        }
        set mouseSender(sender) {
            this._mouseSender = sender;
            sender.touchReciever = this;
            sender.setConfiguration(this.senderConfiguration);
            sender.addEventReciever(this.dragIntepreter);
            sender.addEventReciever(this.tapGesture);
            sender.addEventReciever(this.scrollIntepreter);
        }
        get screenSender() {
            return this._screenSender;
        }
        set screenSender(sender) {
            this._screenSender = sender;
            sender.touchReciever = this;
            sender.setConfiguration(this.senderConfiguration);
            sender.addEventReciever(this.dragIntepreter);
            sender.addEventReciever(this.tapGesture);
            sender.addEventReciever(this.scrollIntepreter);
        }
        //interpreter
        get dragIntepreter() {
            return this._dragIntepreter;
        }
        set dragIntepreter(intepreter) {
            this._dragIntepreter = intepreter;
        }
        get scrollIntepreter() {
            return this._scrollInterpreter;
        }
        set scrollIntepreter(intepreter) {
            this._scrollInterpreter = intepreter;
        }
        //gesture
        get tapGesture() {
            return this._tapGesture;
        }
        set tapGesture(value) {
            this._tapGesture = value;
            this._tapGesture.setConfiguration(this.gestureConfiguration);
        }
        //reciever
        addTouchReciever(touchReciever) {
            this.recievers.push(touchReciever);
        }
        touchBegan(touchEvent) {
            for (let reciever of this.recievers) {
                reciever.touchBegan(touchEvent);
            }
        }
        touchMoved(touchEvent) {
            for (let reciever of this.recievers) {
                reciever.touchMoved(touchEvent);
            }
        }
        touchEnded(touchEvent) {
            for (let reciever of this.recievers) {
                reciever.touchEnded(touchEvent);
            }
        }
        touchCanceled(touchEvent) {
            for (let reciever of this.recievers) {
                reciever.touchCanceled(touchEvent);
            }
        }
    }
    TouchManager.className = "seven.TouchManager";
    seven.TouchManager = TouchManager;
})(seven || (seven = {}));
seven.ClassLoader.manager().loadInstance(seven.TouchManager.className);
