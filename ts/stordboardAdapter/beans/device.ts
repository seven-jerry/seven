namespace storyboard{
    export class Device {
        id:string;
        orientation:string;
        adaptations:Array<Adaptation> = new Array();

        public static fromXML(xml: Element): Device {
            var device = new Device();
            device.id = xml.getAttribute("id");
            device.orientation = xml.getAttribute("orientation");
            return device;
        }
    }
}