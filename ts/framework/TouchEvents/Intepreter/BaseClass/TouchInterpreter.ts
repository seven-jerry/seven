
//{INSERTORDER:2}
namespace seven{
    export abstract class TouchIntepreter extends JBObject{
        delegate:ITouchIntepreterDelegate;
        constructor(){
            super();
        }
        public setDelegate(delegate:ITouchIntepreterDelegate):void{
            this.delegate = delegate;
        }
    
    }
}
