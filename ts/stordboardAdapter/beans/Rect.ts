
namespace storyboard{
    export class Rect {
        key:string;
        x:number;
        y:number;
        width:number;
        height:number;

        public static fromXML(xml: Element): Rect {
            var rect = new Rect();
            rect.key = xml.getAttribute("key");
            rect.x = parseInt(xml.getAttribute("x"));
            rect.y = parseInt(xml.getAttribute("y"));
            rect.width = parseInt(xml.getAttribute("width"));
            rect.height = parseInt(xml.getAttribute("height"));
            return rect;
        }
    }
}