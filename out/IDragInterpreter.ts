//{INSERTORDER:3}
namespace seven{
    export interface  IDragInterpreter extends ITouchIntepreter,IMouseSenderAccess,IScreenSenderAccess{
        addLayoutView(layoutView:IDragLayout);
        emptyLayoutView():void;
    }
}
