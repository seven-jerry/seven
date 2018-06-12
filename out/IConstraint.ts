namespace seven {
    export interface IConstraint extends IJBObject{
        applyContraint(srcView: View, comparingView: View);
    }
}