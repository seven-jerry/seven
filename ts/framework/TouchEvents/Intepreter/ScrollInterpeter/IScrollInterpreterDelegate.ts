//{INSERTORDER:1}
namespace seven {
    export interface IScrollIntepreterDelegate extends ITouchIntepreterDelegate {

        scrollMove(orgin: Orgin,difference:Orgin): void;
    }
}