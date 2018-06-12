namespace seven {
    export interface IKeyboardConfiguration extends ITouchSenderConfiguration {
        setKeyHoldMove(keyHoldMove: number);
        getKeyHoldMove(): number;
    }
}