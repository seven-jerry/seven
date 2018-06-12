namespace seven {

    export interface IMouseConfiguration extends ITouchSenderConfiguration {
        setMouseLongPressTime(longPressTime: number);
        getMouseLongPressTime(): number;
    }
}