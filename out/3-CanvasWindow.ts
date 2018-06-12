//{INSERTORDER:3}

namespace seven {
    export class CanvasWindow extends JMBWindow {
    
    view: HtmlCanvasView;

    canvas:HTMLCanvasElement;
    context:CanvasRenderingContext2D;

    constructor(){
        super();
        
    }
    //@override
    public initWithCanvasID(canvasID:string) :CanvasWindow{
        super.initWithID(canvasID);
        this.setUpView();
        return this;
    }
    protected setUpView(){
        this.view = new HtmlCanvasView(this.htmlElementId);
        this.view.window = this;
    }
    remove(){
        this.view.remove();
    }
}
}