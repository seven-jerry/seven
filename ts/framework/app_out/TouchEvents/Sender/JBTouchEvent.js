//{INSERTORDER:2}
var seven;
(function (seven) {
    class JBTouchEvent extends seven.JBObject {
        constructor() {
            super();
            this.orgin = seven.Orgin.empty();
            this.difference = seven.Orgin.empty();
            this.differenceFromStart = seven.Orgin.empty();
            this.dragging = false;
            this.elementId = "";
            this.dragging = false;
        }
        setOrgin(orgin) {
            this.orgin = orgin;
        }
        getOrgin() {
            return this.orgin.copy();
        }
        setDifference(difference) {
            this.difference = difference;
        }
        getDifference() {
            return this.difference.copy();
        }
        setDifferenceFromStart(differenceFromStart) {
            this.differenceFromStart = differenceFromStart;
        }
        getDifferenceFromStart() {
            return this.differenceFromStart.copy();
        }
        isDragging() {
            return this.dragging;
        }
        setDragging(dragging) {
            this.dragging = dragging;
        }
        copyAttributes(toObject) {
            toObject.orgin = this.orgin.copy();
            toObject.configuration = this.configuration;
            toObject.difference = this.difference.copy();
            toObject.differenceFromStart = this.differenceFromStart.copy();
            toObject.dragging = this.dragging;
            this.elementId = this.elementId;
        }
        copy() {
            var newObject = new JBTouchEvent();
            this.copyAttributes(newObject);
            return newObject;
        }
    }
    seven.JBTouchEvent = JBTouchEvent;
})(seven || (seven = {}));
