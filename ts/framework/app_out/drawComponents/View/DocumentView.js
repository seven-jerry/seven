//{INSERTORDER:3}
/**
 * the view of the JBDocument
 * all windowViews are attached to here
*/
var seven;
(function (seven) {
    class DocumentView extends seven.View {
        constructor() {
            super();
        }
        get rect() {
            return this.frame;
        }
        getZIndex() {
            return 0;
        }
        //@override
        draw() {
            throw new Error("this view cannot be drawn. this should only be used for sizing the subviews");
        }
    }
    seven.DocumentView = DocumentView;
})(seven || (seven = {}));
