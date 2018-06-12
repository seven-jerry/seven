namespace seven {
    export interface IMouseSenderAccess extends ITouchSenderAccess {
        mousedown(event: any, touchEvent: ITouchEvent): any;
        mouseup(event: any, touchEvent: ITouchEvent): any;
        mousemove(event: any, touchEvent: ITouchEvent): any;
        mouseout(event: any, touchEvent: ITouchEvent): any;
        mousewheel?(event:WheelEvent);
    }
}    