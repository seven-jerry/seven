
namespace seven{
    export interface IKeyboardSender extends TouchSender {
        eventReciever: JMBMap<string,IKeyboardSenderAccess>;
    }
}
