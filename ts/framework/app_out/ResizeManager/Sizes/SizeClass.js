//{INSERTORDER:2}
var seven;
(function (seven) {
    class SizeClass extends seven.JBObject {
        constructor(id, width, height, description) {
            super();
            this.description = "<>";
            this.id = id;
            this.width = width;
            this.height = height;
            this.description = description;
        }
        static fromXML(xml) {
            var width = seven.Objects.requireNumber("SizeClass.fromXML : width was not defined/not a number", xml.attributes.getNamedItem("width").value);
            var height = seven.Objects.requireNumber("SizeClass.fromXML : hieght was not defined/not a number", xml.attributes.getNamedItem("height").value);
            var id = seven.Objects.requireNonNull("SizeClass.fromXML : id was not defined", xml.attributes.getNamedItem("id").value);
            var description = seven.Objects.orElse(xml.attributes.getNamedItem("description").value, "");
            return new SizeClass(id, width, height, description);
        }
        getId() {
            return this.id;
        }
        setWidth(width) {
            this.width = width;
        }
        getWidth() {
            return this.width;
        }
        setHeight(height) {
            this.height = height;
        }
        getHeight() {
            return this.height;
        }
        asRect() {
            return new seven.Rect(this.width, this.height, this.width, this.height);
        }
        getDescription() {
            return this.description;
        }
        setDescription(description) {
            this.description = description;
        }
        //@Override JBObject
        copyAttributes(toObject) {
            toObject.width = this.width;
            toObject.height = this.height;
            toObject.description = this.description;
        }
        //@Override JBObject
        copy() {
            var newSizeClass = new SizeClass(this.id, this.width, this.height);
            this.copyAttributes(newSizeClass);
            return newSizeClass;
        }
    }
    seven.SizeClass = SizeClass;
})(seven || (seven = {}));
