//{INSERTORDER:2}

namespace seven {
    export abstract class View extends JBObject implements IDrawable {
        private sieProvider: ISizeProvider;
        private styleProvider: IStyleProdiver;
        public frame: Rect = Rect.empty();
        public bounds: Rect = Rect.empty();
        public viewId: string = "";
        public superView: View;
        public subViews: Array<View>;
        public tag: string;
        public gestureActions: JMBMap<string, GestureCallback> = new JMBMap<string, GestureCallback>();
        protected viewExtentions: Array<IViewDrawable> = new Array<IViewDrawable>();
        public window: JMBWindow;

        constructor() {
            super()
            this.subViews = new Array();
        }
        /** 
         * @param frame the frame which the view should get
         */
        initWitFrame(frame: Rect): View {
            this.frame = Rect.copyRect(frame);
            return this;
        }

        /**
        * @param key a vaid size-key
        */
        initWithViewId(id: string): View {
            this.viewId = id;
            return this;
        }

        public remove(): void {
            if (this.superView) {
                this.superView.removeSubView(this);
            }
            this.superView = undefined;
        }

        removeSubView(subView: View) {
            for (var index in this.subViews) {
                if (this.subViews[index] == subView) {
                    this.subViews.splice(parseInt(index), 1);
                }
            }
        }

        getWindow(): JMBWindow {
            if (this.window) {
                return this.window;
            }
            if (this.superView) {
                return this.superView.getWindow();
            }
        }

        addSubview(view: View) {
            if (view.superView != undefined) {
                view.superView.removeSubView(view);
            }
            this.subViews.push(view);
            view.setSuperView(this);
        }

        setSuperView(view: View) {
            this.superView = view;
        }


        //@override
        draw(orgin: Orgin) { }
        drawSubViews(orgin: Orgin) {
            var subViewOrgin = Orgin.copyOrgin(orgin);
            this.subViews.forEach(element => {
                element.draw(subViewOrgin);
            });
        }

        public addGestureCallback(callback: GestureCallback) {
            if (callback.getType() == GestureType.None) {
                Logger.error("view - addGestureCallback gesture txpe must not be null");
            }
            this.gestureActions.put(callback.getKey(), callback);
        }

        getSubViews(): Array<View> {
            var views = new Array();
            for (let view of this.subViews) {
                views.push(view);
            }
            return views;
        }

        createHtmlContainer(id: string): View {
            throw new Error("this method should be overwritten");
        }

        hasGestureType(needle: string): boolean {
            for (let gestureType of this.gestureActions.keys()) {
                if (gestureType == needle) {
                    return true;
                }
            }
            return false;
        }

        fireGesture(key: string, values: JMBMap<string, any>) {
            if (this.gestureActions.containsKey(key) == false || this.gestureActions.get(key) == undefined) {
                Logger.error("view.fireGesture() - gesture not found");
            }
            var gestureAction = this.gestureActions.get(key);
            gestureAction.call(values);
        }

        //@Override JBObject
        public copyAttributes(toObject: View): void {
            super.copyAttributes(toObject);
            toObject.superView = this.superView;
            for (let gesture of this.gestureActions.values()) {
                toObject.gestureActions.put(gesture.getKey(), gesture.copy());
            }
            toObject.window = this.window;
            toObject.tag = this.tag;
        }

        //@Override - JBObject 
        public copy(): View {
            throw new Error("can't create abstract object");
        }

        public scroll(diff: Orgin) {
            Logger.develepor("view - scrol() called and not taken");
        }

    }
}