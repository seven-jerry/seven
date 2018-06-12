//{INSERTORDER:3}
/**
 * the view for a window
 */
namespace seven {
    export class HtmlWindowView extends View {
    htmlWindow: Window;
    constructor() {
        super()
        this.htmlWindow = window;
        this.initWithReferenceFrame(new Rect(0, 0, this.htmlWindow.innerWidth, this.htmlWindow.innerHeight));
    }
    //@override
    draw() {
        throw new Error("this view cannot be drawn. this should only be used for sizing the subviews");
    }
}
}