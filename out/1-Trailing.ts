namespace seven {
    export class TraillingContraint extends JBObject {
        public static className: string = "seven.constraint.TraillingContraint";
        trailing: number = 0;


        applyContraint(srcView: View, comparingView: View) {
            srcView.referenceFrame.setWidth(comparingView.referenceFrame.width() - srcView.referenceFrame.x() - this.trailing);
            srcView.changeReferenceFrame(srcView.referenceFrame);

        }

        init(trailing: number): TraillingContraint {
            this.trailing = trailing;
            return this;
        }
        getClassName(): string {
            return TraillingContraint.className;
        }
    }
}