//{INSERTORDER:3}
var seven;
(function (seven) {
    class TouchSender extends seven.JBObject {
        constructor() {
            super();
            this.eventReciever = new seven.JMBMap();
        }
        setConfiguration(configuration) {
            this.configuration = configuration;
        }
        setTouchReciever(touchReciever) {
            this.touchReciever = touchReciever;
        }
        addEventReciever(eventReciever) {
            this.eventReciever.put(eventReciever.getClassName(), eventReciever);
        }
        removeEventReciever(eventReciever) {
            this.eventReciever.remove(eventReciever.getClassName());
        }
        initEvents() {
        }
        getUserInfo(event) {
            return { "x": "0", "y": "0" };
        }
    }
    seven.TouchSender = TouchSender;
})(seven || (seven = {}));
