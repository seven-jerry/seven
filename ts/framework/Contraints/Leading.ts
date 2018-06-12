namespace seven {
    export class LeadingContraint {
        public static className: string = "seven.constraint.LeadingContraint";

        leading: number = 20;
        applyContraint(srcView: View, comparingView: View ) {
            srcView.referenceFrame.setX(this.leading);
        }
        init(leading: number): LeadingContraint {
            this.leading = leading;
            return this;
        }
        getClassName(): string {
            return LeadingContraint.className;
        }
    }
}