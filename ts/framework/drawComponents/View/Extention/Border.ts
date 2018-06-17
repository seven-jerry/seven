/** 
 * addd a border to a view object
 * 
*/

namespace seven {
    export enum lineType {
        solid,
        dotted
    }
    
    export interface IBorderExtendable {
        addBorder(border: Border);
    }
    export function top(width: number, type: lineType, color: string): Border {
        return new Border().intitWithSubBorders(new TopBorder().init(width, type, color));
    }
    export function right(width: number, type: lineType, color: string): Border {
        return new Border().intitWithSubBorders(new RightBorder().init(width, type, color));
    }
    export function bottom(width: number, type: lineType, color: string): Border {
        return new Border().intitWithSubBorders(new BottomBorder().init(width, type, color));
    }
    export function left(width: number, type: lineType, color: string): Border {
        return new Border().intitWithSubBorders(new LeftBorder().init(width, type, color));
    }
    export function border(width: number, type: lineType, color: string): Border {
        return new Border().intitWithSubBorders(new TotalBorder().init(width, type, color));
    }

    export class Border implements ICanvasDrawable, IHTMLDrawable {

        subBorders: Array<SubBorder> = new Array<SubBorder>();

        constructor() { }
        /*   actually :HTMLElement, but typescript is being a bitch */
        draw(element: any/*HTMLElement*/) {
            Logger.error("Border is drawable on generic view - be more specific");
        }

        intitWithSubBorders(...borders: SubBorder[]): Border {
            this.subBorders = borders;
            return this;
        }

        drawOnElement(element: any) {
            for (let subBorder of this.subBorders) {
                subBorder.drawOnElement(element);
            }
        }

        drawInContext(context: CanvasRenderingContext2D, rect: Rect) {
            for (let subBorder of this.subBorders) {
                subBorder.drawInContext(context, rect);
            }
        }
    }

    abstract class SubBorder implements ICanvasDrawable, IHTMLDrawable {
        width: number;
        type: lineType;
        color: string;

        draw(element: any) {
            Logger.error("Border is drawable on generic view - be more specific");
        }

        protected getHtmlType(): string {
            switch (this.type) {
                case lineType.solid:
                    return "solid";
                case lineType.dotted:
                    return "dotted";
            }
            return "";
        }

        protected getCanvas(): [number, number] {
            switch (this.type) {
                case lineType.solid:
                    return [0, 0];
                case lineType.dotted:
                    return [5, 3];
            }
            return [0, 0];
        }

        protected changeSize(element: any, diff: Rect) {
            var currentLeft = parseInt(element.style.left.replace("px", ""));
            var currentTop = parseInt(element.style.top.replace("px", ""));
            var currentWidth = parseInt(element.style.width.replace("px", ""));
            var currentHeight = parseInt(element.style.height.replace("px", ""));
            var currentElWidth = parseInt(element.width);
            var currentElHeight = parseInt(element.height);

            if (currentElWidth != NaN) {
                element.width = currentElWidth - diff.width();
            } else {
                element.style.width = (currentWidth - diff.width()) + "px";
            }
            if (currentElHeight != NaN) {
                element.height = currentElHeight - diff.height();
            } else {
                element.style.height = (currentHeight - diff.height()) + "px";
            }
            element.style.left = (currentLeft + diff.x()) + "px";
            element.style.top = (currentTop + diff.y()) + "px";
        }

        init(width: number, type: lineType, color: string): TopBorder {
            this.width = width;
            this.type = type;
            this.color = color;
            return this;
        }

        drawOnElement(element: any) {
            throw new Error("Method not implemented.");
        }

        drawInContext(context: CanvasRenderingContext2D, rect: Rect) {
            throw new Error("Method not implemented.");
        }

    }

    class TopBorder extends SubBorder {
        drawOnElement(element: any) {
            var useWidth: number = JBDocument.document().verticalScreenValue(this.width);
            element.style.borderTop = "" + useWidth + "px " + this.getHtmlType() + " " + this.color;
            this.changeSize(element, new Rect(0, useWidth, 0, 0));
        }

        drawInContext(context: CanvasRenderingContext2D, rect: Rect) {
            var useWidth: number = JBDocument.document().verticalScreenValue(this.width);
            context.save();
            context.strokeStyle = this.color;
            context.setLineDash(this.getCanvas());
            context.lineWidth = useWidth;
            context.moveTo(0, 0);
            context.lineTo(rect.topRight(), rect.bottomLeft() - useWidth);
            context.restore();
        }
    }

    class RightBorder extends SubBorder {
        drawOnElement(element: any) {
            var useWidth: number = JBDocument.document().horizontalScreenValue(this.width);

            element.style.borderRight = "" + useWidth + "px " + this.getHtmlType() + " " + this.color;
            this.changeSize(element, new Rect(0, 0, useWidth, 0));
        }

        drawInContext(context: CanvasRenderingContext2D, rect: Rect) {
            context.save();
            context.strokeStyle = this.color;
            context.setLineDash(this.getCanvas());
            context.lineWidth = this.width;
            context.moveTo(rect.topRight() - this.width, 0);
            context.lineTo(rect.topRight(), rect.bottomLeft() - this.width);
            context.restore();
        }
    }

    class BottomBorder extends SubBorder {
        drawOnElement(element: any) {
            var useWidth: number = JBDocument.document().verticalScreenValue(this.width);

            element.style.borderBottom = "" + useWidth + "px " + this.getHtmlType() + " " + this.color;
            this.changeSize(element, new Rect(0, 0, 0, useWidth));
        }

        drawInContext(context: CanvasRenderingContext2D, rect: Rect) {
            context.save();
            context.strokeStyle = this.color;
            context.setLineDash(this.getCanvas());
            context.lineWidth = this.width;
            context.moveTo(0, rect.bottomLeft() - this.width);
            context.lineTo(rect.topRight(), rect.bottomLeft() - this.width);
            context.restore();
        }
    }

    class LeftBorder extends SubBorder {
        drawOnElement(element: any) {
            var useWidth: number = JBDocument.document().horizontalScreenValue(this.width);
            element.style.borderLeft = "" + useWidth + "px " + this.getHtmlType() + " " + this.color;
            this.changeSize(element, new Rect(useWidth, 0, 0, 0));
        }

        drawInContext(context: CanvasRenderingContext2D, rect: Rect) {
            context.save();
            context.strokeStyle = this.color;
            context.setLineDash(this.getCanvas());
            context.lineWidth = this.width;
            context.moveTo(0, 0);
            context.lineTo(0, rect.bottomLeft() - this.width);
            context.restore();
        }
    }

    class TotalBorder extends SubBorder {
        drawOnElement(element: any) {
            element.style.border = "" + this.width + "px " + this.getHtmlType() + " " + this.color;
            this.changeSize(element, new Rect(this.width, this.width, this.width, this.width));
        }

        drawInContext(context: CanvasRenderingContext2D, rect: Rect) {
            context.save();
            context.strokeStyle = this.color;
            context.setLineDash(this.getCanvas());
            context.lineWidth = this.width;
            context.moveTo(0, 0);
            context.lineTo(rect.topRight() - this.width, 0);
            context.lineTo(rect.topRight() - this.width, rect.bottomLeft() - this.width);
            context.lineTo(0, rect.bottomLeft() - this.width);
            context.lineTo(0, 0);
            context.restore();
        }
    }
}