/** @class Orgin
 *
 * defines a point in space using x and y corrdinates
 *
*/
var seven;
(function (seven) {
    class Orgin extends seven.JBObject {
        constructor(x, y) {
            super();
            this.empty = true;
            this.x = x;
            this.y = y;
        }
        // empty is better that undefined 
        static empty() {
            var resultOrgin = new Orgin(0, 0);
            return resultOrgin;
        }
        /**
         *
         * @param srcOrgin the orgin which should be copied
         * @returns the copied orgin
         */
        static copyOrgin(srcOrgin) {
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
        static difference(source, counter) {
            var result = new Orgin(0, 0);
            result.x = source.x - counter.x;
            result.y = source.y - counter.y;
            return result;
        }
        addOrgin(orgin) {
            if (orgin == undefined) {
                seven.Logger.develepor("Tried to add undefined orgin");
                return;
            }
            this.addX(orgin.x);
            this.addY(orgin.y);
        }
        removeOrgin(orgin) {
            if (orgin == undefined) {
                seven.Logger.develepor("Tried to remove undefined orgin");
                return this;
            }
            this.removeX(orgin.x);
            this.removeY(orgin.y);
            return this;
        }
        setX(x) {
            this.x = x;
        }
        setY(y) {
            this.y = y;
        }
        addX(x) {
            this.x = this.x + x;
        }
        addY(y) {
            this.y = this.y + y;
        }
        removeX(x) {
            this.x = this.x - x;
        }
        removeY(y) {
            this.y = this.y - y;
        }
        isEmpty() {
            return this.empty && this.x == 0 && this.x == 0;
        }
        setEmpty(empty) {
            this.empty = empty;
        }
        toString() {
            return "[x: " + this.x + " y: " + this.y + "]";
        }
        //@Override JBObject
        copyAttributes(toObject) {
            toObject.x = this.x;
            toObject.y = this.y;
        }
        //@Override JBObject
        copy() {
            var newOrgin = Orgin.copyOrgin(this);
            this.copyAttributes(newOrgin);
            return newOrgin;
        }
        toAbsolute() {
            this.x = Math.abs(this.x);
            this.y = Math.abs(this.y);
            return this;
        }
    }
    seven.Orgin = Orgin;
})(seven || (seven = {}));
