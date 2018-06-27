//{INSERTORDER:2}
var seven;
(function (seven) {
    class View extends seven.JBObject {
        //  protected viewExtentions: Array<IViewDrawable> = new Array<IViewDrawable>();
        constructor() {
            super();
            this.frame = seven.Rect.empty();
            this.bounds = seven.Rect.empty();
            this.viewId = "";
            this.gestureActions = new seven.JMBMap();
            this.style = new seven.DefaultStyleProvider();
            this.subViews = new Array();
        }
        /**
         * @param frame the frame which the view should get
         */
        initWitFrame(frame) {
            this.frame = seven.Rect.copyRect(frame);
            return this;
        }
        /**
        * @param key a vaid size-key
        */
        initWithViewId(id) {
            this.viewId = id;
            return this;
        }
        remove() {
            if (this.superView) {
                this.superView.removeSubView(this);
            }
            this.superView = undefined;
        }
        removeSubView(subView) {
            for (var index in this.subViews) {
                if (this.subViews[index] == subView) {
                    this.subViews.splice(parseInt(index), 1);
                }
            }
        }
        addSubview(view) {
            if (view.superView != undefined) {
                view.superView.removeSubView(view);
            }
            this.subViews.push(view);
            view.setSuperView(this);
        }
        setSuperView(view) {
            this.superView = view;
        }
        //@override
        drawInRect(rect) { }
        drawSubViews(rect) {
            var subViewRect = seven.Rect.copyRect(rect);
            this.subViews.forEach(element => {
                element.drawSubViews(subViewRect);
            });
        }
        addGestureCallback(callback) {
            if (callback.getType() == seven.GestureType.None) {
                seven.Logger.error("view - addGestureCallback gesture txpe must not be null");
            }
            this.gestureActions.put(callback.getKey(), callback);
        }
        getSubViews() {
            var views = new Array();
            for (let view of this.subViews) {
                views.push(view);
            }
            return views;
        }
        createHtmlContainer(id) {
            throw new Error("this method should be overwritten");
        }
        hasGestureType(needle) {
            for (let gestureType of this.gestureActions.keys()) {
                if (gestureType == needle) {
                    return true;
                }
            }
            return false;
        }
        fireGesture(key, values) {
            if (this.gestureActions.containsKey(key) == false || this.gestureActions.get(key) == undefined) {
                seven.Logger.error("view.fireGesture() - gesture not found");
            }
            var gestureAction = this.gestureActions.get(key);
            gestureAction.call(values);
        }
        //@Override JBObject
        copyAttributes(toObject) {
            super.copyAttributes(toObject);
            toObject.superView = this.superView;
            for (let gesture of this.gestureActions.values()) {
                toObject.gestureActions.put(gesture.getKey(), gesture.copy());
            }
            toObject.tag = this.tag;
        }
        //@Override - JBObject 
        copy() {
            throw new Error("can't create abstract object");
        }
        scroll(diff) {
            seven.Logger.develepor("view - scrol() called and not taken");
        }
    }
    seven.View = View;
})(seven || (seven = {}));
