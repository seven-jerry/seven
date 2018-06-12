//{INSERTORDER:3}
/** 
 * a wrapper for a div - htmlelement
 * 
*/
namespace seven {
    export class HtmlElementView extends View {
    elementId: String;
    element: HTMLElement;
    backgroudColor: string;

    constructor(elementId?: string) {
        super();
        if (elementId == undefined) {
            return;
        }
        this.elementId = elementId;
        this.element = <HTMLElement>document.getElementById(elementId);
        if (this.element) {
            Logger.error("Element already exists for Id : " + this.elementId);
            return;
        }

        this.element = document.createElement("div");
        this.backgroundColor = ViewUtility.randomColor();
        this.element.id = elementId;
        this.element.style.position = "fixed";
        this.element.style.display = "none";
        document.body.appendChild(this.element);
    }

    setSuperView(view: View) {
        super.setSuperView(view);
        this.element.style.display = "inline";
    }
    remove() {
        this.element.style.display = "none";
    }
    draw(orgin: Orgin) {
        var drawRect = Rect.copyRect(this.appliadFrame);
        drawRect.setX(drawRect.x() + orgin.x);
        drawRect.setY(drawRect.y() + orgin.y);
        this.element.style.left = "" + drawRect.x() + "px";
        this.element.style.top = "" + drawRect.y() + "px";
        this.element.style.backgroundColor = ViewUtility.randomColor();
        this.element.style.width = this.appliadFrame.width() + "px";
        this.element.style.height = this.appliadFrame.height() + "px";
        this.element.style.zIndex = "" + this.getZIndex();
        this.drawSubViews(new Orgin(0, 0));
    }
}
}