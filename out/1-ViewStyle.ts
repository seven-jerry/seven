/** 
 * containts all style attributes that can be appliad to a view
 * currently only constraints, but will be more in future
 * it uses a map to order the constraints
*/
namespace seven {
    export class ViewStyle extends JBObject {
        view: View;
        constraints: JMBMap<string, IConstraint> = new JMBMap<string, IConstraint>();

        public initWithView(view: View): ViewStyle {
            this.view = view;
            return this;
        }

      
        public set minHeight(minHeight: number) {
            var minHeightConst = new MinHeight().init(minHeight);
            this.constraints.put("3", minHeightConst);

        }

        public set leading(marginLeft: number) {
            var marginLeftConstraint = new LeadingContraint().init(marginLeft);
            this.constraints.put("0", marginLeftConstraint);
        }

        public set trailing(marginRight: number) {
            var marginRightConstraint = new TraillingContraint().init(marginRight);
            this.constraints.put("1", marginRightConstraint);
        }

        public marginTop(top: number, toView: View) {
            var topConstraints = new Top().init(top, toView);
            this.constraints.put("4", topConstraints);
        }

        getConstraints(): IConstraint[] {
            return this.constraints.values();
        }
    }
}