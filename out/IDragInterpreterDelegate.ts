//{INSERTORDER:1}
namespace seven {
    export interface IDragIntepreterDelegate extends ITouchIntepreterDelegate {
        dragStart(orgin: Orgin): View;
        dragMove(orgin: Orgin): void;
        dragEnd(orgin: Orgin): void;
    }
}