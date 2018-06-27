//{INSERTORDER:2}
/**
 * @class represents a Rectangle in 2d - space
 *
 */
var seven;
(function (seven) {
    class Rect extends seven.JBObject {
        constructor(x, y, width, height) {
            super();
            this.xPosition = x;
            this.yPosition = y;
            this.widthSize = width;
            this.heightSize = height;
        }
        /**
         *
         * @param object a valid rect object
         * @returns a rect from the object
         */
        static fromObject(object) {
            var newRect = new Rect(0, 0, 0, 0);
            newRect.setX(parseInt(object.x));
            newRect.setY(parseInt(object.y));
            newRect.setWidth(parseInt(object.width));
            newRect.setHeight(parseInt(object.height));
            return newRect;
        }
        static empty() {
            return new Rect(0, 0, 0, 0);
        }
        static copyRect(inputRect) {
            return new Rect(inputRect.x(), inputRect.y(), inputRect.width(), inputRect.height());
        }
        static difference(inputRect, counterRect) {
            var resultRect = new Rect(0, 0, 0, 0);
            resultRect.setX(inputRect.x() - counterRect.x());
            resultRect.setY(inputRect.y() - counterRect.y());
            resultRect.setWidth(inputRect.width() - counterRect.width());
            resultRect.setHeight(inputRect.height() - counterRect.height());
            return resultRect;
        }
        static merge(oneRect, anotherRect) {
            var resultRect = new Rect(0, 0, 0, 0);
            resultRect.setX(oneRect.x() + anotherRect.x());
            resultRect.setY(oneRect.y() + anotherRect.y());
            resultRect.setWidth(oneRect.width() + anotherRect.width());
            resultRect.setHeight(oneRect.height() + anotherRect.height());
            return resultRect;
        }
        get xPosition() {
            return this._xPosition;
        }
        set xPosition(value) {
            this._xPosition = parseInt("" + value);
        }
        get yPosition() {
            return this._yPosition;
        }
        set yPosition(value) {
            this._yPosition = parseInt("" + value);
        }
        get widthSize() {
            return this._widthSize;
        }
        set widthSize(value) {
            this._widthSize = parseInt("" + value);
        }
        get heightSize() {
            return this._heightSize;
        }
        set heightSize(value) {
            this._heightSize = parseInt("" + value);
        }
        equals(otherRect) {
            if (otherRect == undefined) {
                return false;
            }
            if (otherRect == this) {
                return true;
            }
            var rect = otherRect;
            if (rect.x() == this.x() && rect.y() == this.y() &&
                rect.width() == this.width() && rect.height() == this.height()) {
                return true;
            }
            return false;
        }
        isEmpty() {
            return this.xPosition == 0 && this.yPosition == 0 &&
                this.widthSize == 0 && this.heightSize == 0;
        }
        x() {
            return this.xPosition;
        }
        y() {
            return this.yPosition;
        }
        bottomLeft() {
            return this.yPosition + this.heightSize;
        }
        topRight() {
            return this.xPosition + this.widthSize;
        }
        width() {
            return this.widthSize;
        }
        height() {
            return this.heightSize;
        }
        setSizeChangeCallback(sizeChangeCallback) {
            this.sizeChangeCallback = sizeChangeCallback;
        }
        sizeChanged() {
            if (this.sizeChangeCallback != undefined) {
                this.sizeChangeCallback.call();
            }
        }
        removeRect(rect) {
            this.xPosition += rect.x();
            this.yPosition += rect.y();
            this.widthSize -= rect.width() * 2;
            this.heightSize -= rect.height() * 2;
            this.sizeChanged();
            return this;
        }
        remove(ammount) {
            this.xPosition -= ammount;
            this.yPosition -= ammount;
            this.widthSize -= ammount;
            this.heightSize -= ammount;
            this.sizeChanged();
            return this;
        }
        add(ammount) {
            this.xPosition += ammount;
            this.yPosition += ammount;
            this.widthSize += ammount;
            this.heightSize += ammount;
            this.sizeChanged();
        }
        setX(x) {
            this.xPosition = x;
            this.sizeChanged();
        }
        addX(x) {
            this.xPosition = this.xPosition + x;
            ;
            this.sizeChanged();
        }
        setY(y) {
            this.yPosition = parseInt("" + y);
            this.sizeChanged();
        }
        addY(y) {
            this.yPosition = this.yPosition + y;
            this.sizeChanged();
        }
        removeY(y) {
            this.yPosition = this.yPosition - y;
            this.sizeChanged();
        }
        setWidth(width) {
            this.widthSize = width;
            this.sizeChanged();
        }
        addWidth(width) {
            this.widthSize += width;
            this.sizeChanged();
        }
        removeWidth(width) {
            this.widthSize -= width;
            this.sizeChanged();
        }
        setHeight(height) {
            this.heightSize = height;
            this.sizeChanged();
        }
        addHeight(height) {
            this.heightSize = this.heightSize + height;
            this.sizeChanged();
        }
        removeHeight(height) {
            this.heightSize = this.heightSize - height;
            this.sizeChanged();
        }
        setOrgin(orgin) {
            this.xPosition = orgin.x;
            this.yPosition = orgin.y;
            this.sizeChanged();
        }
        addOrgin(orgin) {
            this.addX(orgin.x);
            this.addY(orgin.y);
        }
        size() {
            return new Rect(0, 0, this._widthSize, this._heightSize);
        }
        scaleBy(x, y, width, height) {
            return new Rect(this._xPosition * x, this._yPosition * y, this._widthSize * width, this._heightSize * height);
        }
        stepX() {
            this.xPosition = this.xPosition + this.widthSize;
            this.sizeChanged();
        }
        stepY() {
            this.yPosition = this.yPosition + this.heightSize;
            this.sizeChanged();
        }
        lazyContainsRect(otherRect, howLazyX, howLazyY) {
            if (howLazyX == undefined) {
                howLazyX = 0;
            }
            if (howLazyY == undefined) {
                howLazyY = 0;
            }
            if ((otherRect.topRight() + howLazyX) < this.x() || (otherRect.x() - howLazyX) > this.topRight()) {
                return false;
            }
            if ((otherRect.bottomLeft() + howLazyY) < this.y() || (otherRect.y() - howLazyY) > this.bottomLeft()) {
                return false;
            }
            return true;
        }
        containsRect(otherRect) {
            var contains = this.containsX(otherRect.x()) && this.containsY(otherRect.y()) &&
                this.containsTopRight(otherRect.topRight()) && this.containsBottomLeft(otherRect.bottomLeft());
            return contains;
        }
        containsOrgin(orgin) {
            var contains = this.containsX(orgin.x) && this.containsY(orgin.y);
            return contains;
        }
        containsX(x) {
            return this.xPosition <= x && x <= this.topRight();
        }
        containsY(y) {
            return this.yPosition <= y && y <= this.bottomLeft();
        }
        containsTopRight(topRight) {
            return topRight <= this.topRight();
        }
        containsBottomLeft(bottomLeft) {
            return bottomLeft <= this.topRight();
        }
        orgin() {
            return new seven.Orgin(this.xPosition, this.yPosition);
        }
        toJSON() {
            return '{"x": "' + this.x() + '", "y": "' + this.y() + '", "width": "' + this.width() + '", "height": "' + this.height() + '"}';
        }
        toString() {
            return "[x: " + this.x() + " y: " + this.y() + " width: " + this.width() + " height: " + this.height() + "]";
        }
        //@Override JBObject 
        copyAttributes(toObject) {
            toObject.xPosition = this.xPosition;
            toObject.yPosition = this.yPosition;
            toObject.widthSize = this.widthSize;
            toObject.heightSize = this.heightSize;
        }
        //@Override JBObject
        copy() {
            var newRect = Rect.copyRect(this);
            this.copyAttributes(newRect);
            return newRect;
        }
    }
    seven.Rect = Rect;
})(seven || (seven = {}));
