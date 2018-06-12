//{INSERTORDER:2}
/**
 * @class represents a Rectangle in 2d - space
 * 
 */

namespace seven {
    export class Rect extends JBObject implements IRectModifier {
        private _xPosition: number;
        private _yPosition: number;
        private _widthSize: number;
        private _heightSize: number;
        private sizeChangeCallback: VoidCallback;

        /**
         * 
         * @param object a valid rect object
         * @returns a rect from the object
         */
        public static fromObject(object: any): Rect {
            var newRect = new Rect(0, 0, 0, 0);
            newRect.setX(parseInt(object.x));
            newRect.setY(parseInt(object.y));
            newRect.setWidth(parseInt(object.width));
            newRect.setHeight(parseInt(object.height));
            return newRect;
        }

        constructor(x: number, y: number, width: number, height: number) {
            super()
            this.xPosition = x;
            this.yPosition = y;
            this.widthSize = width;
            this.heightSize = height;
        }

        public static empty(): Rect {
            return new Rect(0, 0, 0, 0);
        }

        public static copyRect(inputRect: Rect) {
            return new Rect(inputRect.x(), inputRect.y(), inputRect.width(), inputRect.height());
        }

        public static difference(inputRect: Rect, counterRect: Rect): Rect {
            var resultRect = new Rect(0, 0, 0, 0);
            resultRect.setX(inputRect.x() - counterRect.x());
            resultRect.setY(inputRect.y() - counterRect.y());
            resultRect.setWidth(inputRect.width() - counterRect.width());
            resultRect.setHeight(inputRect.height() - counterRect.height());

            return resultRect;
        }

        public static merge(oneRect: Rect, anotherRect: Rect): Rect {
            var resultRect = new Rect(0, 0, 0, 0);
            resultRect.setX(oneRect.x() + anotherRect.x());
            resultRect.setY(oneRect.y() + anotherRect.y());
            resultRect.setWidth(oneRect.width() + anotherRect.width());
            resultRect.setHeight(oneRect.height() + anotherRect.height());

            return resultRect;
        }

        private get xPosition(): number {
            return this._xPosition;
        }

        private set xPosition(value: number) {
            this._xPosition = parseInt("" + value);
        }

        private get yPosition(): number {
            return this._yPosition;
        }

        private set yPosition(value: number) {
            this._yPosition = parseInt("" + value);
        }

        private get widthSize(): number {
            return this._widthSize;
        }

        private set widthSize(value: number) {
            this._widthSize = parseInt("" + value);
        }

        private get heightSize(): number {
            return this._heightSize;
        }

        private set heightSize(value: number) {
            this._heightSize = parseInt("" + value);
        }

        public equals(otherRect: Object): boolean {
            if (otherRect == undefined) {
                return false;
            }
            if (otherRect == this) {
                return true;
            }
            var rect: Rect = <Rect>otherRect;
            if (rect.x() == this.x() && rect.y() == this.y() &&
                rect.width() == this.width() && rect.height() == this.height()) {
                return true;
            }
            return false;
        }

        public isEmpty(): boolean {
            return this.xPosition == 0 && this.yPosition == 0 &&
                this.widthSize == 0 && this.heightSize == 0;
        }

        public x() {
            return this.xPosition;
        }

        public y() {
            return this.yPosition;
        }

        public bottomLeft(): number {
            return this.yPosition + this.heightSize;
        }

        public topRight(): number {
            return this.xPosition + this.widthSize;
        }

        public width() {
            return this.widthSize;
        }

        public height() {
            return this.heightSize;
        }

        public setSizeChangeCallback(sizeChangeCallback: VoidCallback) {
            this.sizeChangeCallback = sizeChangeCallback;
        }

        public sizeChanged() {
            if (this.sizeChangeCallback != undefined) {
                this.sizeChangeCallback.call();
            }
        }
        removeRect(rect: Rect): Rect {
            this.xPosition += rect.x();
            this.yPosition += rect.y();
            this.widthSize -= rect.width() * 2;
            this.heightSize -= rect.height() * 2;
            this.sizeChanged();
            return this;
        }

        remove(ammount: number): Rect {
            this.xPosition -= ammount;
            this.yPosition -= ammount;
            this.widthSize -= ammount;
            this.heightSize -= ammount;
            this.sizeChanged();
            return this;
        }

        public add(ammount: number): void {
            this.xPosition += ammount;
            this.yPosition += ammount;
            this.widthSize += ammount;
            this.heightSize += ammount;
            this.sizeChanged();
        }

        public setX(x: number) {
            this.xPosition = x;
            this.sizeChanged();
        }

        public addX(x: number) {
            this.xPosition = this.xPosition + x;;
            this.sizeChanged();
        }

        public setY(y: number) {
            this.yPosition = parseInt("" + y);
            this.sizeChanged();
        }

        public addY(y: number) {
            this.yPosition = this.yPosition + y;
            this.sizeChanged();
        }

        public removeY(y: number) {
            this.yPosition = this.yPosition - y;
            this.sizeChanged();
        }

        public setWidth(width: number) {
            this.widthSize = width;
            this.sizeChanged();
        }

        public addWidth(width: number) {
            this.widthSize += width;
            this.sizeChanged();
        }

        public removeWidth(width: number) {
            this.widthSize -= width;
            this.sizeChanged();
        }

        public setHeight(height: number) {
            this.heightSize = height;
            this.sizeChanged();
        }

        public addHeight(height: number) {
            this.heightSize = this.heightSize + height;
            this.sizeChanged();
        }

        public removeHeight(height: number) {
            this.heightSize = this.heightSize - height;
            this.sizeChanged();
        }

        public setOrgin(orgin: Orgin) {
            this.xPosition = orgin.x;
            this.yPosition = orgin.y;
            this.sizeChanged();
        }

        public addOrgin(orgin: Orgin) {
            this.addX(orgin.x);
            this.addY(orgin.y);
        }

        public size(): Rect {
            return new Rect(0, 0, this._widthSize, this._heightSize);
        }

        public scaleBy(x: number, y: number, width: number, height: number) {
            return new Rect(this._xPosition * x, this._yPosition * y, this._widthSize * width, this._heightSize * height);
        }

        public stepX() {
            this.xPosition = this.xPosition + this.widthSize;
            this.sizeChanged();
        }

        public stepY() {
            this.yPosition = this.yPosition + this.heightSize;
            this.sizeChanged();
        }

        public lazyContainsRect(otherRect: Rect, howLazyX?: number, howLazyY?: number): boolean {
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

        public containsRect(otherRect: Rect): boolean {
            var contains = this.containsX(otherRect.x()) && this.containsY(otherRect.y()) &&
                this.containsTopRight(otherRect.topRight()) && this.containsBottomLeft(otherRect.bottomLeft());
            return contains;
        }

        public containsOrgin(orgin: Orgin): boolean {
            var contains = this.containsX(orgin.x) && this.containsY(orgin.y);
            return contains;
        }

        public containsX(x: number): boolean {
            return this.xPosition <= x && x <= this.topRight();
        }

        public containsY(y: number): boolean {
            return this.yPosition <= y && y <= this.bottomLeft();
        }

        public containsTopRight(topRight: number): boolean {
            return topRight <= this.topRight();
        }

        public containsBottomLeft(bottomLeft: number): boolean {
            return bottomLeft <= this.topRight();
        }

        public orgin(): Orgin {
            return new Orgin(this.xPosition, this.yPosition);
        }

        public toJSON(): String {
            return '{"x": "' + this.x() + '", "y": "' + this.y() + '", "width": "' + this.width() + '", "height": "' + this.height() + '"}';
        }

        public toString(): string {
            return "[x: " + this.x() + " y: " + this.y() + " width: " + this.width() + " height: " + this.height() + "]";
        }

        //@Override JBObject 
        public copyAttributes(toObject: Rect): void {
            toObject.xPosition = this.xPosition;
            toObject.yPosition = this.yPosition;
            toObject.widthSize = this.widthSize;
            toObject.heightSize = this.heightSize;
        }
        //@Override JBObject
        public copy(): Rect {
            var newRect = Rect.copyRect(this);
            this.copyAttributes(newRect);
            return newRect;
        }
    }
}