namespace seven {

    export interface IScreenConfiguration extends ITouchSenderConfiguration {
        setScreenLongPressTime(longPressTime: number);
        getScreenLongPressTime(): number;
    }
}