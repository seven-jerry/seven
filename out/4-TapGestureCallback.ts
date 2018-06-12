//{INSERTORDER:3}

namespace seven {
    export class TapGestureCallback extends GestureCallback {
        tapNumber: number = 0;
        public constructor() {
            super();

        }
        private static keyGenerator = new TapGestureCallback();
        public static keyOf(values: JMBMap<string, any>) {
            TapGestureCallback.keyGenerator.tapNumber = values.get("tapCount");
            return TapGestureCallback.keyGenerator.getKey();
        }

        initWithMethod(thisRef: Object, method: () => void): GestureCallback {
           throw new Error("TouchEvents::initWithMethod : bad init method ");
           
        }
        init(thisRef: Object, tapNumber: number, method: () => void): TapGestureCallback {
            super.initWithMethod(thisRef, method);
            this.tapNumber = tapNumber;
            return this;
        }

        getKey(): string {
            return "" + GestureType.Tap + "" + this.tapNumber;
        }
        getType(): GestureType {
            return GestureType.Tap;
        }
        public copyAttributes(toObject: TapGestureCallback): void {
            super.copyAttributes(toObject);
        }

        public copy(): TapGestureCallback {
            var newObject: TapGestureCallback = new TapGestureCallback();
            this.copyAttributes(newObject);
            return newObject;
        }

        call(values: JMBMap<string, any>) {
            if (values.get("tapCount") == this.tapNumber) {
                this.method.call(this.thisRef);
            }
        }
    }
}
