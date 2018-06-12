//{INSERTORDER:2}

namespace seven {
    export class TouchSenderConfiguration extends JBObject implements IKeyboardConfiguration, IMouseConfiguration, IScreenConfiguration {
        keyHoldMove: number = 400;
        screenLongPressTime: number = 300;
        mouseLongPressTime:number = 100;
        constructor() {
            super();
        }
        public getKeyHoldMove(): number {
            return this.keyHoldMove;
        }
        public setKeyHoldMove(value: number) {
            this.keyHoldMove = value;
        }
        setScreenLongPressTime(longPressTime: number) {
            this.screenLongPressTime = longPressTime;
        }
        getScreenLongPressTime(): number {
            return this.screenLongPressTime;
        }

        setMouseLongPressTime(longPressTime: number) {
            this.mouseLongPressTime = longPressTime;
        }
        getMouseLongPressTime(): number {
            return this.mouseLongPressTime;
        }

    }
}