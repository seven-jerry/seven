namespace storyboard {
    export class FileLoader {
        name: string;
        document: XMLDocument;
        constructor() {
        }

        load() {
            try {
                var storyboardAdapter = SevenAdapter.shared().storyboardAdapter;
                var documentEl = this.document.getElementsByTagName("document")[0];
                var deviceEl = documentEl.getElementsByTagName("device")[0];
                var adaptationsEl = deviceEl.getElementsByTagName("adaptation");
                var scenesEl = documentEl.getElementsByTagName("scenes")[0];
                var scenesEntriesEl = scenesEl.getElementsByTagName("scene");

                storyboardAdapter.document = Document.fromXML(documentEl);
                storyboardAdapter.document.device = Device.fromXML(deviceEl);
                for (const adaptationEl of adaptationsEl) {
                    var adaptation = Adaptation.fromXML(adaptationEl);
                    storyboardAdapter.document.device.adaptations.push(adaptation);
                }
                for(const scenesEntryEl of scenesEntriesEl){
                    this.loadScene(scenesEntryEl);
                }
            } catch (e) {
                console.error(e);
            }
        }
        loadScene(sceneEL:Element):void{
            var scene = Scene.fromXML(sceneEL);
            var objects = sceneEL.getElementsByTagName("objects")[0];
            for(let object of objects.children){
                if(object.nodeName == "viewController"){
                    scene.objects.push(this.loadViewController(<Element>object));
                }
            }
            SevenAdapter.shared().storyboardAdapter.scenes.push(scene);
        }

        loadViewController(element:Element):ViewController{
                var viewController = ViewController.fromXML(element);
                viewController.view = this.loadView(element.getElementsByTagName("view")[0]);

                return viewController;
        }

        loadView(viewEl:Element):View{
            var rectEl = viewEl.getElementsByTagName("rect")[0];
            var view = View.fromXML(viewEl);
            view.rect = Rect.fromXML(rectEl);
            var subviewsEl = viewEl.getElementsByTagName("subviews")[0];
            for(let subviewEl of subviewsEl.children){
                this.addSubView(view,<Element>subviewEl);
            }
            return view;
        }

        addSubView(parent:View,subView:Element){
            if(subView.nodeName == "textField"){
                parent.subViews.push(TextField.fromXML(subView));
            }
        }
    }

    export function main(args: Array<string>) {
        var fileLoader = new FileLoader();
        fileLoader.document = storyboardXml;
        fileLoader.load();
    }
}



window.onload = function () {
    storyboard.main([]);
}