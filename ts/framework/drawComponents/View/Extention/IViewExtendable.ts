namespace seven {

    export interface ICanvasDrawable extends IViewDrawable {
        drawInContext(context: CanvasRenderingContext2D, rect: Rect);
    }
    export interface IHTMLDrawable extends IViewDrawable {
        /*          actually :HTMLElement, but typescript is being a bitch */
        drawOnElement(element: any/*HTMLElement*/);
    }
    export interface IViewDrawable {
        draw(element: any);
    }

}
