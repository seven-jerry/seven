//{INSERTORDER:2}

namespace seven {
    export abstract class View extends JBObject implements IDrawable {
		//AutoGeneratedClassName-start - do not eidt this line
		public static classname:string = "seven.View";
		public getClassName():string{return View.classname;}
		//AutoGeneratedClassName-end - do not eidt this line
        style: IStyleProdiver;
        public frame: Rect = Rect.empty();
        public bounds: Rect = Rect.empty();
        public viewId: string = "";
        public superView: View;
        public subViews: Array<View>;
        public tag: string;
        public gestureActions: JMBMap<string, GestureCallback> = new JMBMap<string, GestureCallback>();
      //  protected viewExtentions: Array<IViewDrawable> = new Array<IViewDrawable>();
        constructor() {
            super()
            this.style = new DefaultStyleProvider();
            this.subViews = new Array();
        }
        /** 
         * @param frame the frame which the view should get
         */
        initWitFrame(frame: IRect): View {
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

        addSubview(view: View) {
            if (view.superView != undefined) {
                view.superView.removeSubView(view);
            }
            this.subViews.push(view);
            view.setSuperView(this);
        }

        setStyleProvider(styleProvider:IStyleProdiver){
            this.style = styleProvider;
        }
        setSuperView(view: View) {
            this.superView = view;
        }


        //@override
        public drawInRect(rect: Rect) { }

        protected drawSubViews(rect: Rect) {
            var subViewRect = Rect.copyRect(rect);
            this.subViews.forEach(element => {
                element.drawSubViews(subViewRect);
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