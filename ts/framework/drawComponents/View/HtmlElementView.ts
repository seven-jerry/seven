//{INSERTORDER:3}
/** 
 * a wrapper for a div - htmlelement
 * 
*/
namespace seven {
    export class HtmlElementView extends View {
        elementId: String;
        element: HTMLElement;
        /**
         * 
         * @param canvasId the html-id of the canvas
         */
        constructor(elementId: string) {
            super();
            this.elementId = elementId;
            this.element = <HTMLElement>document.getElementById(elementId);
            Object.freeze(this.element);
            if (this.element) {
                Logger.develepor("element already exists for Id : " + this.elementId);
                return;
            }
            this.element = document.createElement(this.getType());
            this.element.id = elementId;
            this.element.style.position = "fixed";
            this.element.style.display = "none";
            document.body.appendChild(this.element);
        }



        setSuperView(view: View) {
            super.setSuperView(view);
            this.element.style.display = "inline";
        }

        drawInRect(rect: Rect) {
            this.element.style.left = "" + rect.x() + "px";
            this.element.style.top = "" + rect.y() + "px";
            this.element.style.backgroundColor = this.style.getBackGroundColor();
            this.element.style.width = "" + rect.width() + "px";
            this.element.style.height = "" + rect.height() + "px";
        }

        remove(): void {
            super.remove();
            if (this.element && this.element.parentElement) {
                this.element.parentElement.removeChild(this.element);
            }
        }

        protected getType():string{
            return "div";
        }
    }
}