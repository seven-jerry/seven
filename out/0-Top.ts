namespace seven {
    export class Top {
        public static className: string = "seven.constraint.Top";

        top: number = 0;
        topView:View;
        applyContraint(srcView: View, comparingView: View ) {
            if(this.topView != undefined){
                srcView.referenceFrame.setY(this.topView.referenceFrame.bottomLeft()+this.top);
                return;
            }
            srcView.referenceFrame.setY(this.top);
            srcView.changeReferenceFrame(srcView.referenceFrame);

        }

        init(top: number,comparingView:View): Top {
            this.top = top;
            this.topView = comparingView;
            return this;
        }
        getClassName(): string {
            return Top.className;
        }
    }
}