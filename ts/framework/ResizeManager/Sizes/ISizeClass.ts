namespace seven {
    export interface ISizeClass {

        getId(): string;
        //indentifier
        setWidth(width: number);
        getWidth(): number;

        setHeight(height: number);
        getHeight(): number | undefined;

        setDescription(dwscription: string);
        getDescription(): string;

        asRect(): Rect;

        copy(): ISizeClass;
    }
}