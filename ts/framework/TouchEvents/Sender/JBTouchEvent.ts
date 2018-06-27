//{INSERTORDER:2}

namespace seven {
    export class JBTouchEvent extends JBObject implements ITouchEvent {
		//AutoGeneratedClassName-start - do not eidt this line
		public static classname:string = "seven.JBTouchEvent";
		public getClassName():string{return JBTouchEvent.classname;}
		//AutoGeneratedClassName-end - do not eidt this line
        orgin: Orgin = Orgin.empty();
        configuration: TouchSenderConfiguration;
        difference: Orgin = Orgin.empty();
        differenceFromStart: Orgin = Orgin.empty();
        dragging: boolean = false;
        elementId: string = "";

        constructor() {
            super();
            this.dragging = false;
        }
        setOrgin(orgin: Orgin) {
            this.orgin = orgin;
        }
        getOrgin(): Orgin {
            return this.orgin.copy();
        }
        setDifference(difference: Orgin) {
            this.difference = difference;
        }
        getDifference(): Orgin {
            return this.difference.copy();
        }
        setDifferenceFromStart(differenceFromStart: Orgin) {
            this.differenceFromStart = differenceFromStart;
        }
        getDifferenceFromStart(): Orgin {
            return this.differenceFromStart.copy();
        }

        isDragging(): boolean {
            return this.dragging;
        }
        setDragging(dragging: boolean) {
            this.dragging = dragging;
        }

        public copyAttributes(toObject: JBTouchEvent): void {
            toObject.orgin = this.orgin.copy();
            toObject.configuration = this.configuration;
            toObject.difference = this.difference.copy();
            toObject.differenceFromStart = this.differenceFromStart.copy();
            toObject.dragging = this.dragging;
            this.elementId = this.elementId;
        }

        public copy(): JBTouchEvent {
            var newObject: JBTouchEvent = new JBTouchEvent();
            this.copyAttributes(newObject);
            return newObject;
        }
    }
}
