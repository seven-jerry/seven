namespace storyboard{
    export class ViewController extends Object {
        customClass:string;
        customModule:string;
        customModuleProvider:string;
        sceneMemberID:string;
        view:View;
        
        public static fromXML(xml: Element): ViewController {
            var viewController = new ViewController();
            viewController.id = xml.getAttribute("id");
            viewController.customClass = xml.getAttribute("customClass");
            viewController.customModule = xml.getAttribute("customModule");
            viewController.customModuleProvider = xml.getAttribute("customModuleProvider");
            viewController.sceneMemberID = xml.getAttribute("sceneMemberID");
            return viewController;
        }


    }
}
