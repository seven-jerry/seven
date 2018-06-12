namespace seven {
    export class Size {
    classes: Array<SizeFrame>;
    id: string;


    public static fromXML(xml: Element, sizeLoader: ISizeLoader, variables?: JMBMap<string, Variable>) {
        var id = Objects.requireNonNull("Size.fromXML : id was not defined", xml.attributes.getNamedItem("id").value);
        var size = new Size(id);
        let xmlChidren = xml.getElementsByTagName("sizeClass");
        for (let xmlChild of xmlChidren) {
            var sizeFrame = SizeFrame.fromXML(xmlChild, sizeLoader, variables,id);
            size.classes.push(sizeFrame);
        }
        return size;
    }


    constructor(id: string) {
        this.classes = new Array();
        this.id = id;
    }

    getFrameFromId(id: string): Rect {
        for (let everyClass of this.classes) {
            if (everyClass.getId() == id) {
                return everyClass.getFrame();
            }
        }
        return undefined;
    }
    getFrameForClass(sizeClass: ISizeClass): Rect {
        for (let everyClass of this.classes) {
            if (sizeClass.getId() == everyClass.getId()) {
                return everyClass.getFrame();
            }
        }
        return undefined;
    }

}
}