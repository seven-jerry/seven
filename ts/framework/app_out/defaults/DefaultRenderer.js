var seven;
(function (seven) {
    class DefaultRenderer {
        getClassName() { return seven.DefaultRenderer.classname; }
        ///AutoGeneratedClassName-end - do not eidt this line
        loadIfDefault() {
            if (seven.JBDocument.document().hasRenderer() == false) {
                seven.Logger.boot("no renderer found -- using default");
                seven.JBDocument.document().setRenderer(this);
            }
        }
        renderViewHierachy(superView) {
            for (let subView of superView.getSubViews()) {
                subView.drawInRect(superView.frame);
                this.drawSubView(subView);
            }
        }
        drawSubView(view) {
            for (let subView of view.getSubViews()) {
                subView.drawInRect(view.frame);
                this.drawSubView(subView);
            }
        }
    }
    //AutoGeneratedClassName-start - do not eidt this line
    DefaultRenderer.classname = "seven.DefaultRenderer";
    seven.DefaultRenderer = DefaultRenderer;
})(seven || (seven = {}));
