
/** @class Orgin
 *  
 * defines a point in space using x and y corrdinates
 * 
*/
namespace seven {
    export class Orgin extends JBObject {
        public x: number;
        public y: number;
        private empty: boolean = true;

        // empty is better that undefined 
        public static empty(): Orgin {
            var resultOrgin = new Orgin(0, 0);
            return resultOrgin;
        }

        /**
         * 
         * @param srcOrgin the orgin which should be copied
         * @returns the copied orgin
         */
        public static copyOrgin(srcOrgin: Orgin): Orgin {
            var resultOrgin = new Orgin(0, 0);
            resultOrgin.x = srcOrgin.x;
            resultOrgin.y = srcOrgin.y;
            return resultOrgin;
        }

        /**
         * this method contains the difference between two Orgins 
         * @param source the dominand orgin
         * @param counter the orgin which gets removed from source
         *@returns the source - counter  
         */
        public static difference(source: Orgin, counter: Orgin): Orgin {
            var result = new Orgin(0, 0);
            result.x = source.x - counter.x;
            result.y = source.y - counter.y;
            return result;
        }

        constructor(x: number, y: number) {
            super();
            this.x = x;
            this.y = y;
        }


        addOrgin(orgin: Orgin) {
            if (orgin == undefined) {
                Logger.develepor("Tried to add undefined orgin");
                return;
            }
            this.addX(orgin.x);
            this.addY(orgin.y);
        }
        removeOrgin(orgin: Orgin): Orgin {
            if (orgin == undefined) {
                Logger.develepor("Tried to remove undefined orgin");
                return this;
            }
            this.removeX(orgin.x);
            this.removeY(orgin.y);
            return this;
        }
        public setX(x: number) {
            this.x = x;
        }
        public setY(y: number) {
            this.y = y;
        }
        addX(x: number) {
            this.x = this.x + x;
        }
        addY(y: number) {
            this.y = this.y + y;
        }
        public removeX(x: number): void {
            this.x = this.x - x;
        }
        public removeY(y: number): void {
            this.y = this.y - y;
        }
        public isEmpty(): boolean {
            return this.empty && this.x == 0 && this.x == 0;
        }
        public setEmpty(empty: boolean) {
            this.empty = empty;
        }
        public toString(): string {
            return "[x: " + this.x + " y: " + this.y + "]";
        }
        //@Override JBObject
        public copyAttributes(toObject: Orgin): void {
            toObject.x = this.x;
            toObject.y = this.y;
        }
        //@Override JBObject
        public copy(): Orgin {
            var newOrgin = Orgin.copyOrgin(this);
            this.copyAttributes(newOrgin);
            return newOrgin;
        }
        public toAbsolute(): Orgin {
            this.x = Math.abs(this.x);
            this.y = Math.abs(this.y);
            return this;
        }
    }
}
