namespace seven {
    export 
class Variable {
    values: JMBMap<string, number> = new JMBMap<string, number>();
    id: string;


    public static fromXML(xml: Element) {
        var id = Objects.requireNonNull("Variable.fromXML : id was not defined", xml.attributes.getNamedItem("id").value);
        var size = new Variable(id);
        let xmlChidren = xml.getElementsByTagName("sizeClass");
        for (let xmlChild of xmlChidren) {
            Variable.sizeClassValue(size, xmlChild);
        }
        return size;
    }
    private static sizeClassValue(destination: Variable, xml: Element) {
        var classId = Objects.requireNonNull("Variable.sizeClassValue : id was not defined", xml.attributes.getNamedItem("id").value);
        var value = Objects.requireNumber("Variable.sizeClassValue : value was not defined", xml.attributes.getNamedItem("value").value);
        destination.values.put(classId, value);
    }

    constructor(id: string) {
        this.id = id;
    }

    getProperty(sizeClassId: string): number {
        if (this.values.containsKey(sizeClassId) == false) {
            throw new Error("Variable::getProperty : not value for sizeclassid<" + sizeClassId + ">");
        }
        return this.values.get(sizeClassId);
    }

}
}