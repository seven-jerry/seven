namespace seven {
    export class DefaultWindowLoader implements IWindowLoader {
        document: JBDocument;

        loadIfDefault() {
            if (JBDocument.document().hasWindowLoader() == false) {
                Logger.boot("no window loader found -- using default");
                    JBDocument.document().setWindowLoader(this);
            }
        }
        setup(document: JBDocument) {
            this.document = document;
        }

        loadWindows(sizeClass: ISizeClass) {
            var window = new CanvasWindow().initWithCanvasID('main');
            window.view.initWithReferenceFrame(new Rect(0,0,1000,800));
            this.document.addSubWindow(window);
        }


    }
}
