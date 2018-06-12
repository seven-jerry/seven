//{INSERTORDER:3}

namespace seven {
    export class ClickGestureCallback extends GestureCallback {
        public constructor() {
            super();

        }
        private static keyGenerator = new ClickGestureCallback();
        public static keyOf(values: JMBMap<string, any>) {
            return ClickGestureCallback.keyGenerator.getKey();
        }

        getKey(): string {
            return "" + GestureType.Click;
        }
        getType(): GestureType {
            return GestureType.Click;
        }
        public copyAttributes(toObject: ClickGestureCallback): void {
            super.copyAttributes(toObject);
        }
        public copy(): ClickGestureCallback {
            var newObject: ClickGestureCallback = new ClickGestureCallback();
            this.copyAttributes(newObject);
            return newObject;
        }
    }
}
