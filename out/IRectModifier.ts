namespace seven {
    export interface IRectModifier {
        removeRect(rect: Rect): void;
        remove(ammount: number): void;
        setX(x: number);
        addX(x: number);
        setY(y: number);
        addY(y: number);
        removeY(y: number);
        setWidth(width: number);
        removeWidth(width: number);
        setHeight(height: number);
        addHeight(height: number);
        removeHeight(height: number);
        setOrgin(orgin: Orgin);
        stepX();
        stepY();
    }
}