//{INSERTORDER:3}
namespace seven {
    export abstract class TouchSender extends JBObject {
        touchReciever: ITouchReceiver;
        eventReciever: JMBMap<string, ITouchSenderAccess>;
       protected configuration: TouchSenderConfiguration;
        constructor() {
            super();
            this.eventReciever = new JMBMap<string, ITouchSenderAccess>();
        }
        public setConfiguration(configuration: TouchSenderConfiguration) {
            this.configuration = configuration;
        }

        public setTouchReciever(touchReciever: ITouchReceiver) {
            this.touchReciever = touchReciever;
        }

        public addEventReciever(eventReciever: ITouchSenderAccess) {
            this.eventReciever.put(eventReciever.getClassName(), eventReciever);
        }
        public removeEventReciever(eventReciever: ITouchSenderAccess) {
            this.eventReciever.remove(eventReciever.getClassName());
        }

        protected initEvents(): void {
        }
        protected getUserInfo(event:any):Object{
            return {"x":"0","y":"0"};
        }
    }
}