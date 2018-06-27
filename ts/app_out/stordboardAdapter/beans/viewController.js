var storyboard;
(function (storyboard) {
    class ViewController extends storyboard.Object {
        static fromXML(xml) {
            var viewController = new ViewController();
            viewController.id = xml.getAttribute("id");
            viewController.customClass = xml.getAttribute("customClass");
            viewController.customModule = xml.getAttribute("customModule");
            viewController.customModuleProvider = xml.getAttribute("customModuleProvider");
            viewController.sceneMemberID = xml.getAttribute("sceneMemberID");
            return viewController;
        }
    }
    storyboard.ViewController = ViewController;
})(storyboard || (storyboard = {}));
