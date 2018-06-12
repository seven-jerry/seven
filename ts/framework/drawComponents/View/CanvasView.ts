//{INSERTORDER:3}
/** 
 * A canvasView represents no html element
 * all canvasViews get drawn on a containing html-canvas
 * whens its time to render it gets the htmlCanvas from the containing HtmlCanvas
 * 
*/
namespace seven {

    /// < V
    export class CanvasView extends View {
        public superView: CanvasView | HtmlCanvasView;
        public subViews: Array<View>;
        public context: CanvasRenderingContext2D;
        protected viewExtentions: Array<ICanvasDrawable> = new Array<ICanvasDrawable>();

        //callback to the user, to enable custom drawing
        additionalDrawing: (context: CanvasRenderingContext2D, rect: Rect) => void;

        constructor() {
            super();
        }

        initWithReferenceFrame(frame: Rect): CanvasView {
            super.initWithReferenceFrame(frame);
            return this;
        }

        /**
         * 
         * @param id an html id
         * @param opacity the opacity with wich the container should be inited  
         */
        createHtmlContainer(id: string, opacity?: string): HtmlCanvasView {
            var canvasContainer = <HTMLCanvasElement>document.createElement("CANVAS");
            canvasContainer.id = id;
            canvasContainer.style.zIndex = "10";
            canvasContainer.style.position = "fixed";
            canvasContainer.style.opacity = opacity != undefined ? opacity : "0.8";
            document.body.appendChild(canvasContainer);
            var htmlCanavsView = new HtmlCanvasView(id);
            htmlCanavsView.zIndex = 10;
            return htmlCanavsView;
        }

        // returns the context of the HtmlCanvas
        getContext(): CanvasRenderingContext2D {
            if (this.context) {

                return this.context;
            }
            if (this.superView) {
                return this.superView.getContext();
            }
        }

        /**
         * adds an extention to the view(border)
         * @param extention a valid extention
         */
        addViewExtention(extention:ICanvasDrawable) {
            this.viewExtentions.push(extention);
        }

        //@override
        draw(orgin: Orgin) {
            if (this.hidden == true) {
                return;
            }
            var drawRect = Rect.copyRect(this.appliadFrame);
            drawRect.setX(drawRect.x() + orgin.x);
            drawRect.setY(drawRect.y() + orgin.y);
            this.totalOffset = drawRect.orgin();

            if (this.appliadFrame.x() < 0) {
                var diff = this.appliadFrame.x();
                drawRect.setX(drawRect.x() - diff);
                drawRect.setWidth(drawRect.width() + diff);
            }

            if (this.appliadFrame.y() < 0) {
                var diff = this.appliadFrame.y();
                drawRect.setY(drawRect.y() - diff);
                drawRect.setHeight(drawRect.height() + diff);
            }

            if (this.backgroundColor == undefined) {
                this.backgroundColor = "white";//ViewUtility.randomColor();
            }

            if (this.strokeColor) {
                this.getContext().strokeStyle = "" + this.strokeColor;
                this.getContext().strokeRect(drawRect.x(), drawRect.y(), drawRect.width(), this.appliadFrame.height());
            }
            this.drawBackground(drawRect);
            this.drawInRect(drawRect);
            this.drawSubViews(drawRect.orgin());
            this.drawViewExtentions(drawRect);
            this.drawDebug();
        }

        drawBackground(drawRect: Rect) {
            this.getContext().fillStyle = "" + this.backgroundColor;
            this.getContext().fillRect(drawRect.x(), drawRect.y(), drawRect.width(), this.appliadFrame.height());
            this.getContext().fillStyle = "black";
        }

        protected drawInRect(rect: Rect): void {
            //this.getContext().fillText(rect.toString(),rect.x(),rect.y()+10);
        }

        protected drawViewExtentions(rect: Rect): void {
            for (let extention of this.viewExtentions) {
                extention.drawInContext(this.getContext(), rect);
            }
            if (this.additionalDrawing) {
                this.additionalDrawing.call(this, this.getContext(), rect);
            }
            // this.getContext().fillText(rect.toString(),rect.x(),rect.y()+10);
        }

        protected drawDebug() {
            //  this.getContext().fillText(rect.toString(),rect.x(),rect.y()+10);
        }

        //@Override View
        public copyAttributes(toObject: CanvasView): void {
            super.copyAttributes(toObject);
            toObject.superView = this.superView;
            toObject.context = this.context;
        }

        //@Override - View 
        public copy(): CanvasView {
            var newPrototypeTableCell = new CanvasView();
            this.copyAttributes(newPrototypeTableCell);
            return newPrototypeTableCell;
        }

    }
}