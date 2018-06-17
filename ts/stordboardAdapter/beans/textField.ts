
namespace storyboard {
    export class TextField extends Object {
        opaque: boolean;
        contentMode: string;
        contentHorizontalAlignment: string;
        contentVerticalAlignment: string;
        text: string;
        borderStyle: string;
        textAlignment: string;
        minimumFontSize: number;
        translatesAutoresizingMaskIntoConstraints: boolean;
        rect: Rect;
        fontDescription: FontDescription;
        textInputTraits:TextInputTraits;

        public static fromXML(xml: Element): TextField {
            var textField = new TextField();
            textField.id = xml.getAttribute("id");
            textField.opaque = toBoolean(xml.getAttribute("opaque"));
            textField.contentMode = xml.getAttribute("contentMode");
            textField.contentHorizontalAlignment = xml.getAttribute("contentHorizontalAlignment");
            textField.contentVerticalAlignment = xml.getAttribute("contentVerticalAlignment");
            textField.text = xml.getAttribute("text");
            textField.borderStyle = xml.getAttribute("borderStyle");
            textField.textAlignment = xml.getAttribute("textAlignment");
            textField.minimumFontSize = parseInt(xml.getAttribute("minimumFontSize"));
            textField.translatesAutoresizingMaskIntoConstraints = toBoolean(xml.getAttribute("translatesAutoresizingMaskIntoConstraints"));

            textField.rect = Rect.fromXML(xml.getElementsByTagName("rect")[0]);
            textField.fontDescription = FontDescription.fromXML(xml.getElementsByTagName("fontDescription")[0]);
            textField.textInputTraits = TextInputTraits.fromXML(xml.getElementsByTagName("textInputTraits")[0]);

            return textField;

        }
    }

    export class TextInputTraits {
        key: string;
        public static fromXML(xml: Element): TextInputTraits {
            var textInput = new TextInputTraits();
            textInput.key = xml.getAttribute("key");
            return textInput;
        }
    }
    export class FontDescription {
        key: string;
        type: string;
        pointSize: number;

        public static fromXML(xml: Element): FontDescription {
            var font = new FontDescription();
            font.key = xml.getAttribute("key");
            font.type = xml.getAttribute("type");
            font.pointSize = parseInt(xml.getAttribute("pointSize"));
            return font;
        }
    }
}