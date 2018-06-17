namespace storyboard {
    export class Document implements IObjectLoaded {

        type: string;
        version: string;
        toolsVersion: string;
        targetRuntime: string;
        propertyAccessControl: string;
        useAutolayout: boolean;
        useTraitCollections: boolean;
        useSafeAreas: boolean;
        colorMatched: boolean;
        initialViewController: Object;
        scenes: Array<Scene> = new Array();
        device:Device;
        
        public static fromXML(xml: Element): Document {
            var document = new Document();
            document.type = xml.getAttribute("type");
            document.version = xml.getAttribute("version");
            document.toolsVersion = xml.getAttribute("toolsversion");
            document.targetRuntime = xml.getAttribute("targetRuntime");
            document.propertyAccessControl = xml.getAttribute("propertyAccessControl");
            document.useAutolayout = toBoolean(xml.getAttribute("useAutolayout"));
            document.useTraitCollections = toBoolean(xml.getAttribute("useTraitCollections"));
            document.useSafeAreas = toBoolean(xml.getAttribute("useSafeAreas"));
            document.colorMatched = toBoolean(xml.getAttribute("colorMatched"));
            document.initialViewController = Object.unmodifiable(xml.getAttribute("initialViewController"));
            return document;
        }

        public hasLoadedObject(id: string, object: Object) {
            if(id == this.initialViewController.id){
                this.initialViewController = object;
            }
        }

    }


}