var storyboard;
(function (storyboard) {
    class TextField extends storyboard.Object {
        static fromXML(xml) {
            var textField = new TextField();
            textField.id = xml.getAttribute("id");
            textField.opaque = storyboard.toBoolean(xml.getAttribute("opaque"));
            textField.contentMode = xml.getAttribute("contentMode");
            textField.contentHorizontalAlignment = xml.getAttribute("contentHorizontalAlignment");
            textField.contentVerticalAlignment = xml.getAttribute("contentVerticalAlignment");
            textField.text = xml.getAttribute("text");
            textField.borderStyle = xml.getAttribute("borderStyle");
            textField.textAlignment = xml.getAttribute("textAlignment");
            textField.minimumFontSize = parseInt(xml.getAttribute("minimumFontSize"));
            textField.translatesAutoresizingMaskIntoConstraints = storyboard.toBoolean(xml.getAttribute("translatesAutoresizingMaskIntoConstraints"));
            textField.rect = storyboard.Rect.fromXML(xml.getElementsByTagName("rect")[0]);
            textField.fontDescription = FontDescription.fromXML(xml.getElementsByTagName("fontDescription")[0]);
            textField.textInputTraits = TextInputTraits.fromXML(xml.getElementsByTagName("textInputTraits")[0]);
            return textField;
        }
    }
    storyboard.TextField = TextField;
    class TextInputTraits {
        getClassName() { return storyboard.TextInputTraits.classname; }
        static fromXML(xml) {
            var textInput = new TextInputTraits();
            textInput.key = xml.getAttribute("key");
            return textInput;
        }
    }
    //AutoGeneratedClassName-start - do not eidt this line
    TextInputTraits.classname = "storyboard.TextInputTraits ";
    storyboard.TextInputTraits = TextInputTraits;
    class FontDescription {
        static fromXML(xml) {
            var font = new FontDescription();
            font.key = xml.getAttribute("key");
            font.type = xml.getAttribute("type");
            font.pointSize = parseInt(xml.getAttribute("pointSize"));
            return font;
        }
    }
    storyboard.FontDescription = FontDescription;
})(storyboard || (storyboard = {}));