//{INSERTORDER:2}

namespace seven {

    export class GestureCallback extends JBObject {
        protected thisRef: Object;
        protected method: () => void | any;
        public constructor() {
            super();

        }
        initWithMethod(thisRef: Object, method: () => void): GestureCallback {
            this.thisRef = thisRef;
            this.method = method;
            return this;
        }
        call(values: JMBMap<string, any>) {
            this.method.call(this.thisRef);
        }
        getType(): GestureType {
            return GestureType.None;
        }
        getKey(): string {
            return "" + GestureType.None;
        }
        public copyAttributes(toObject: GestureCallback): void {
            super.copyAttributes(toObject);
            toObject.thisRef = this.thisRef;
            toObject.method = this.method;
        }
        public copy(): GestureCallback {
            var newObject: GestureCallback = new GestureCallback();
            this.copyAttributes(newObject);
            return newObject;
        }
    }
}


