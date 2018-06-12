namespace seven {

    export interface IMouseSender  extends TouchSender {
        eventReciever: JMBMap<string,IMouseSenderAccess>;
        addEventReciever(eventReciever: IMouseSenderAccess);
    }
}