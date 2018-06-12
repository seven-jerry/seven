namespace seven {
    export interface IKeyboardSenderAccess extends ITouchSenderAccess {
        keyDown(event: any, touchEvent: ITouchEvent): any;
        keyUp(event: any, touchEvent: ITouchEvent): any;
        keyPress(event: any, touchEvent: ITouchEvent): any;
    }
}