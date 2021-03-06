var storyboard;
(function (storyboard) {
    class Device {
        constructor() {
            this.adaptations = new Array();
        }
        getClassName() { return storyboard.Device.classname; }
        static fromXML(xml) {
            var device = new Device();
            device.id = xml.getAttribute("id");
            device.orientation = xml.getAttribute("orientation");
            return device;
        }
    }
    //AutoGeneratedClassName-start - do not eidt this line
    Device.classname = "storyboard.Device ";
    storyboard.Device = Device;
})(storyboard || (storyboard = {}));
