namespace seven {
    export interface IScreenSenderAccess extends ITouchSenderAccess {
        touchstart(event: any, touchEvent: ITouchEvent): any;
        touchmove(event: any, touchEvent: ITouchEvent): any;
        touchend(event: any, touchEvent: ITouchEvent): any;
        touchcancel(event: any, touchEvent: ITouchEvent): any;
    }
}    