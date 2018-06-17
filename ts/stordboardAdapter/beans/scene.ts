namespace storyboard{
    export class Scene {
        sceneID:string;
        objects:Array<Object> = new Array();

        public static fromXML(xml: Element): Scene {
            var scene = new Scene();
            scene.sceneID = xml.getAttribute("sceneID");
            return scene;
        }

    }
}