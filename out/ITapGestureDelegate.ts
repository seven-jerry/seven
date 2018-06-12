namespace seven {
    export interface ITapGestureDelegate {
        tapRecieved(orgin: Orgin, values: JMBMap<string, any>): void;
        clickRecieved(orgin: Orgin, values: JMBMap<string, any>): void;
    }
}