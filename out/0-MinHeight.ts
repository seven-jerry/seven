namespace seven {
    export class MinHeight {
        public static className: string = "seven.constraint.MinHeight";

        minHeight: number;
        applyContraint(srcView: View, comparingView: View ) {


            if(srcView.referenceFrame.height() < this.minHeight){
                srcView.referenceFrame.setHeight(this.minHeight);
                srcView.changeReferenceFrame(srcView.referenceFrame);
            }
           // srcView.appliadFrame.setX(comparingView.appliadFrame.topRight() - srcView.appliadFrame.width() - this.leading);
        }
        init(minHeight: number): MinHeight {
            this.minHeight = minHeight;
            return this;
        }
        getClassName(): string {
            return MinHeight.className;
        }
    }
}