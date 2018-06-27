//{INSERTORDER:3}
/**
 * this class represents a HTMLCanvas
 *  rendering means positing the htmlelement on the screen
 *
 */
var seven;
(function (seven) {
    class HtmlCanvasView extends seven.View {
        /* viewExtentions: Array<IHTMLDrawable> = new Array<IHTMLDrawable>();
     
         addViewExtention(extention:IHTMLDrawable) {
             this.viewExtentions.push(extention);
         }*/
        /**
         *
         * @param canvasId the html-id of the canvas
         */
        constructor(canvasId) {
            super();
            this.canavsRect = seven.Rect.empty();
            this.canvasId = canvasId;
            this.canvas = document.getElementById(canvasId);
            Object.freeze(this.canvas);
            if (this.canvas) {
                if (this.canvas != undefined) {
                    this.context = this.canvas.getContext('2d');
                    Object.freeze(this.context);
                }
                seven.Logger.develepor("canvas already exists for Id : " + this.canvasId);
                return;
            }
            this.style.setBackgroundColor("white"); //ViewUtility.randomColor();
            this.canvas = document.createElement("canvas");
            this.style.setBackgroundColor(seven.ViewUtility.randomColor());
            this.canvas.id = canvasId;
            this.canvas.style.position = "fixed";
            this.canvas.style.display = "none";
            document.body.appendChild(this.canvas);
            if (this.canvas != undefined) {
                this.context = this.canvas.getContext('2d');
                Object.freeze(this.context);
            }
        }
        setSuperView(view) {
            super.setSuperView(view);
            this.canvas.style.display = "inline";
        }
        drawInRect(rect) {
            this.canavsRect = seven.Rect.copyRect(rect);
            this.canvas.style.left = "" + this.canavsRect.x() + "px";
            this.canvas.style.top = "" + this.canavsRect.y() + "px";
            this.canvas.style.backgroundColor = this.style.getBackGroundColor();
            this.canvas.width = rect.width();
            this.canvas.height = rect.height();
            this.context.clearRect(0, 0, rect.width(), rect.height());
            /*   for (let extention of this.viewExtentions) {
                   extention.drawOnElement(this.canvas);
               }
               this.canvas.style.zIndex = "" + this.getZIndex();*/
        }
        getContext() {
            return this.context;
        }
        remove() {
            super.remove();
            if (this.canvas && this.canvas.parentElement) {
                this.canvas.parentElement.removeChild(this.canvas);
            }
        }
        addScreenOffset() {
            return this.canavsRect.orgin();
        }
    }
    seven.HtmlCanvasView = HtmlCanvasView;
})(seven || (seven = {}));
