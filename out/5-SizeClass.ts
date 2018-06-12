//{INSERTORDER:2}

namespace seven {
    export class SizeClass extends JBObject implements ISizeClass {
    private id: string;
    private width: number;
    private height: number;
    private description: string = "<>";

    public static fromXML(xml: Element) {
        var width = Objects.requireNumber("SizeClass.fromXML : width was not defined/not a number", xml.attributes.getNamedItem("width").value);
        var height = Objects.requireNumber("SizeClass.fromXML : hieght was not defined/not a number", xml.attributes.getNamedItem("height").value);
        var id = Objects.requireNonNull("SizeClass.fromXML : id was not defined", xml.attributes.getNamedItem("id").value);
        var description = Objects.orElse(xml.attributes.getNamedItem("description").value, "");
        return new SizeClass(id, width, height, description);
    }
    constructor(id: string, width: number, height: number, description?: string) {
        super();
        this.id = id;
        this.width = width;
        this.height = height;
        this.description = description;
    }
    getId():string{
        return this.id;
    }
    setWidth(width: number) {
        this.width = width;
    }
    getWidth(): number {
        return this.width;
    }
    setHeight(height: number) {
        this.height = height;
    }
    getHeight(): number {
        return this.height;
    }
    asRect():Rect{
        return new Rect(this.width,this.height,this.width,this.height);
    }
    public getDescription(): string {
        return this.description;
    }
    public setDescription(description: string): void {
        this.description = description;
    }

    //@Override JBObject
    public copyAttributes(toObject: SizeClass): void {
        toObject.width = this.width;
        toObject.height = this.height;
        toObject.description = this.description;
    }
    //@Override JBObject
    public copy(): SizeClass {
        var newSizeClass = new SizeClass(this.id, this.width, this.height);
        this.copyAttributes(newSizeClass);
        return newSizeClass;
    }


}
}