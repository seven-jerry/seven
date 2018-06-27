//{INSERTORDER:3}
/**
 * A canvasView represents no html element
 * all canvasViews get drawn on a containing html-canvas
 * whens its time to render it gets the htmlCanvas from the containing HtmlCanvas
 *
*/
var seven;
(function (seven) {
    class CanvasView extends seven.View {
        constructor() {
            super();
        }
        initWitFrame(frame) {
            super.initWitFrame(frame);
            return this;
        }
        /**
         *
         * @param id an html id
         * @param opacity the opacity with wich the container should be inited
         */
        createHtmlContainer(id, opacity) {
            var canvasContainer = document.createElement("CANVAS");
            canvasContainer.id = id;
            canvasContainer.style.zIndex = "10";
            canvasContainer.style.position = "fixed";
            canvasContainer.style.opacity = opacity != undefined ? opacity : "0.8";
            document.body.appendChild(canvasContainer);
            var htmlCanavsView = new seven.HtmlCanvasView(id);
            return htmlCanavsView;
        }
        // returns the context of the HtmlCanvas
        getContext() {
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
         
        addViewExtention(extention:ICanvasDrawable) {
            this.viewExtentions.push(extention);
        }
        */
        //@override
        drawInRect(rect) {
            if (this.style.isHidden() == true) {
                return;
            }
            if (rect.x() < 0) {
                var diff = rect.x();
                rect.setX(rect.x() - diff);
                rect.setWidth(rect.width() + diff);
            }
            if (rect.y() < 0) {
                var diff = rect.y();
                rect.setY(rect.y() - diff);
                rect.setHeight(rect.height() + diff);
            }
            if (this.style.getBackGroundColor() == undefined) {
                this.style.setBackgroundColor("white"); //ViewUtility.randomColor();
            }
            if (this.style.getStrokeColor()) {
                this.getContext().strokeStyle = "" + this.style.getStrokeColor();
                this.getContext().strokeRect(rect.x(), rect.y(), rect.width(), rect.height());
            }
            this.drawBackground(rect);
            this.drawInRect(rect);
            this.drawSubViews(rect);
            this.drawViewExtentions(rect);
            this.drawDebug();
        }
        drawBackground(drawRect) {
            this.getContext().fillStyle = "" + this.style.getBackGroundColor();
            this.getContext().fillRect(drawRect.x(), drawRect.y(), drawRect.width(), drawRect.height());
            this.getContext().fillStyle = "black";
        }
        drawViewExtentions(rect) {
            /*  for (let extention of this.viewExtentions) {
                  extention.drawInContext(this.getContext(), rect);
              }
              if (this.additionalDrawing) {
                  this.additionalDrawing.call(this, this.getContext(), rect);
              }*/
            // this.getContext().fillText(rect.toString(),rect.x(),rect.y()+10);
        }
        drawDebug() {
            //  this.getContext().fillText(rect.toString(),rect.x(),rect.y()+10);
        }
        //@Override View
        copyAttributes(toObject) {
            super.copyAttributes(toObject);
            toObject.superView = this.superView;
            toObject.context = this.context;
        }
        //@Override - View 
        copy() {
            var newPrototypeTableCell = new CanvasView();
            this.copyAttributes(newPrototypeTableCell);
            return newPrototypeTableCell;
        }
    }
    seven.CanvasView = CanvasView;
})(seven || (seven = {}));
