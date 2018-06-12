namespace seven {

    export interface IScreenSender  extends TouchSender {
        eventReciever: JMBMap<string,IScreenSenderAccess>;
        addLongPressCallback(callBack:VoidCallback);
    }
}