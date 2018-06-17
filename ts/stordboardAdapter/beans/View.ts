
namespace storyboard{
    export class View extends Object {
        key:string;
        color:Color;
        contentMode:string;
        rect:Rect;
        subViews:Array<Object> = new Array();
        constraits:Array<Constraint> = new Array();

        public static fromXML(xml: Element): View {
            var view = new View();
            view.id = xml.getAttribute("id");
            view.key = xml.getAttribute("key");
            view.contentMode = xml.getAttribute("contentMode");
            return view;
        }

    }
}