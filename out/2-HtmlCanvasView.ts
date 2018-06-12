//{INSERTORDER:3}
/**
 * this class represents a HTMLCanvas
 *  rendering means positing the htmlelement on the screen
 * 
 */

namespace seven {
    export class HtmlCanvasView extends View {
    canvasId: String;
    canvas: HTMLCanvasElement;
    canavsRect: Rect = Rect.empty();
    context: CanvasRenderingContext2D;
    backgroudColor: string;
    viewExtentions: Array<IHTMLDrawable> = new Array<IHTMLDrawable>();

    /**
     * 
     * @param canvasId the html-id of the canvas
     */
    constructor(canvasId: string) {
        super();
        this.canvasId = canvasId;
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasId);
        Object.freeze(this.canvas);
        if (this.canvas) {
            if (this.canvas != undefined) {
                this.context = this.canvas.getContext('2d');
                Object.freeze(this.context);
            }
            Logger.develepor("canvas already exists for Id : " + this.canvasId);
            return;
        }
        this.backgroundColor = "white";//ViewUtility.randomColor();

        this.canvas = document.createElement("canvas");
        this.backgroundColor = ViewUtility.randomColor();
        this.canvas.id = canvasId;
        this.canvas.style.position = "fixed";
        this.canvas.style.display = "none";
        document.body.appendChild(this.canvas);
        if (this.canvas != undefined) {
            this.context = this.canvas.getContext('2d');
            Object.freeze(this.context);
        }
    }

    addViewExtention(extention:IHTMLDrawable) {
        this.viewExtentions.push(extention);
    }

    setSuperView(view: View) {
        super.setSuperView(view);
        this.canvas.style.display = "inline";
    }

    draw(orgin: Orgin) {
        this.canavsRect = Rect.copyRect(this.appliadFrame);
        this.canavsRect.addOrgin(orgin);

        this.canvas.style.left = "" + this.canavsRect.x() + "px";
        this.canvas.style.top = "" + this.canavsRect.y() + "px";
        this.canvas.style.backgroundColor = this.backgroudColor;
        this.canvas.width = this.appliadFrame.width();
        this.canvas.height = this.appliadFrame.height();
        this.context.clearRect(0, 0, this.appliadFrame.width(), this.appliadFrame.height());
        for (let extention of this.viewExtentions) {
            extention.drawOnElement(this.canvas);
        }
        this.canvas.style.zIndex = "" + this.getZIndex();
        this.drawSubViews(new Orgin(0, 0));
    }

    getContext() {
        return this.context;
    }

    remove(): void {
        super.remove();
        if (this.canvas && this.canvas.parentElement) {
            this.canvas.parentElement.removeChild(this.canvas);
        }
    }

    addScreenOffset(): Orgin {
        return this.canavsRect.orgin();
    }

}
}