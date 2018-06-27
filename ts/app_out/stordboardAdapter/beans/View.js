var storyboard;
(function (storyboard) {
    class View extends storyboard.Object {
        constructor() {
            super(...arguments);
            this.subViews = new Array();
            this.constraits = new Array();
        }
        setBackgroundColor(color) {
        }
        getBackGroundColor() {
            return "red";
        }
        isHidden() {
            return false;
        }
        setHidden(hide) {
        }
        getStrokeColor() {
            return "black";
        }
        static fromXML(xml) {
            var view = new View();
            view.id = xml.getAttribute("id");
            view.key = xml.getAttribute("key");
            view.contentMode = xml.getAttribute("contentMode");
            return view;
        }
    }
    storyboard.View = View;
})(storyboard || (storyboard = {}));
