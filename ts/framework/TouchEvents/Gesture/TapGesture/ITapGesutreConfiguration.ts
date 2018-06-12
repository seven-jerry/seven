namespace seven {
    export interface ITapGestureConfiguration {
        getMouseClickRange(): Rect;
        getScreenClickRange(): Rect;
        getTapRetouchTimeout():number;
        getTapMaximumTouchDowm():number;
    }
}