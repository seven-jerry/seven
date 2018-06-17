namespace storyboard {
    export class AutoResizeMask {
        id: string;
        key: string;
        withSizable: boolean;
        heightSizable: boolean;

        public static fromXML(xml: Element): AutoResizeMask {
            var resizeMask = new AutoResizeMask();
            resizeMask.id = xml.getAttribute("id");
            resizeMask.key = xml.getAttribute("key");
            resizeMask.withSizable = toBoolean(xml.getAttribute("withSizable"));
            resizeMask.heightSizable = toBoolean(xml.getAttribute("heightSizable"));
            return resizeMask;
        }
    }
}