//{INSERTORDER:2}
var seven;
(function (seven) {
    class JBDocument extends seven.JBObject {
        constructor() {
            super();
            this.windows = new Array();
        }
        /**@returns the shared document singleton */
        static document() {
            if (JBDocument._instance == undefined) {
                JBDocument._instance = new JBDocument();
                JBDocument._instance.documentController = new seven.DocumentController();
                JBDocument._instance.documentController.view = new seven.DocumentView();
                JBDocument._instance.doucmentView = JBDocument._instance.documentController.view;
            }
            return JBDocument._instance;
        }
        /**
        *
        * @param resizeManager resizeManager takes controll over resizing #BigSuprise usually u get this for free - your welcome
        * mostly it is defined in the {Global.ClassLoader} in the global space for the inital loader
        */
        setResizeManager(resizeManager) {
            this.resizeManager = resizeManager;
        }
        /**
        *
        * @returns resizeManager takes controll over resizing #BigSuprise usually u get this for free - your welcome
        * mostly it is defined in the {Global.ClassLoader} in the global space for the inital loader
        */
        getResizeManager() {
            return this.resizeManager;
        }
        /**
         *
         * @param sizeLoader handles the sizing - how many size classes and which one to use,i.e. ipadPortrait
         */
        setSizeLoader(sizeLoader) {
            this.sizeLoader = sizeLoader;
        }
        getSizeLoader() {
            return this.sizeLoader;
        }
        /**
         *
         * @param windowLoader the window loader is the instance that decides,which windows should be loaded
         * - this takes can only be handled by you - so provide a implementation to get started
         * mostly it is defined in the {Global.ClassLoader} in the global space for the inital loader
         */
        setWindowLoader(windowLoader) {
            this.windowLoader = windowLoader;
        }
        getWindowLoader() {
            return this.windowLoader;
        }
        hasWindowLoader() {
            if (this.windowLoader == undefined) {
                return false;
            }
            return true;
        }
        setRenderer(renderer) {
            this.renderer = renderer;
        }
        getRenderer() {
            return this.renderer;
        }
        hasRenderer() {
            if (this.renderer == undefined) {
                return false;
            }
            return true;
        }
        prepareLoading() {
            seven.Objects.requireNonNull("DocumentDelegate.setup() document must not be null", document);
            seven.Objects.requireNonNull("DocumentDelegate.windowLoader must not be null", this.windowLoader);
            seven.Objects.requireNonNull("DocumentDelegate.resizeManager must not be null", this.resizeManager);
            seven.Objects.requireNonNull("DocumentDelegate.sizeLoader must not be null", this.sizeLoader);
            seven.Objects.requireNonNull("DocumentDelegate.renderer must not be null", this.render);
            this.windowLoader.setup(this);
            this.resizeManager.setup(this);
        }
        load() {
            //@TODO - define options better userInfo (iPad,ScreenSize,...)
            this.sizeLoader.initWithOptions(seven.UserInfo.clientInfo());
            this.windowLoader.loadWindows(this.sizeLoader.getSizeClass());
        }
        startRendering() {
            this.render();
            this.resizeManager.startResizing();
        }
        /**
         *
         *this is needed to change the window loader (switch between pages)
         */
        reloadWindows() {
            JBDocument.document().getWindowLoader().loadWindows(this.sizeLoader.getSizeClass());
            this.render();
            this.resizeManager.startResizing();
        }
        setDocumentController(documentController) {
            this.documentController = documentController;
        }
        addSubWindow(window) {
            seven.Objects.requireNonNull("Document : Added window must not be null", window);
            this.windows.push(window);
            this.doucmentView.addSubview(window.view);
            if (window.getController() != undefined) {
                this.documentController.addChildViewController(window.getController());
            }
        }
        removeSubWindow(window) {
            for (var index in this.windows) {
                if (this.windows[index] == window) {
                    this.windows.splice(parseInt(index), 1);
                }
            }
        }
        getWindows() {
            return this.windows;
        }
        /**redraw the view - this is mainly to render the changes in the canvas views */
        render() {
            this.renderer.renderViewHierachy(this.doucmentView);
        }
        /**
        *                 |
        *  vetical   =    |
        *                 |
        * horizontal = -- -- --
        *
        * @argument value : the value in scale with the sizeclass
        *@returns the value in scale with the screen(actual displayed value)
        */
        verticalScreenValue(value, useBaseClass = true) {
            if (this.getResizeManager() == undefined || this.getResizeManager().hasSizeClass() == false) {
                return value;
            }
            return this.getResizeManager().verticalScreenValue(value, useBaseClass);
        }
        /**
         *                 |
         *   vetical  =    |
         *                 |
         * horizontal = -- -- --
         *
        * @argument value : the value in scale with the sizeclass
        *@returns the value in scale with the screen(actual displayed value)
        */
        horizontalScreenValue(value, useBaseClass = true) {
            if (this.getResizeManager() == undefined || this.getResizeManager().hasSizeClass() == false) {
                return value;
            }
            return this.getResizeManager().horizontalScreenValue(value, useBaseClass);
        }
        /**
         *                 |
         *   vetical  =    |
         *                 |
         * horizontal = -- -- --
         *
         * @argument value : the value in scale with the screen(actual displayed value)
         *@returns the value in scale with the sizeclass
         */
        verticalReferenceValue(value, useBaseClass = true) {
            if (this.getResizeManager() == undefined || this.getResizeManager().hasSizeClass() == false) {
                return value;
            }
            return this.getResizeManager().verticalReferenceValue(value, useBaseClass);
        }
        /**
         *                 |
         *   vetical  =    |
         *                 |
         * horizontal = -- -- --
         *
         * @argument value : the value in scale with the screen(actual displayed value)
         *@returns the value in scale with the sizeclass
         */
        horizontalReferenceValue(value, useBaseClass = true) {
            if (this.getResizeManager() == undefined || this.getResizeManager().hasSizeClass() == false) {
                return value;
            }
            return this.getResizeManager().horizontalReferenceValue(value, useBaseClass);
        }
        /*
            Callbacks from the Drag - Touchinterpreters
            will find the toppest view witch is dragable
            and notify its controller, that a dragStart
            @TODO - Maybe the wrong place for it here
        */
        dragStart(orgin) {
            /*  this.dragView = this.doucmentView.getViewForOrignAndOptions(orgin, (view: View): boolean => {
                  return view.dragable == true;
              });
              if(this.dragView != undefined){
                  this.dragView = this.dragView.getController().dragStart(orgin, this.dragView);
              }
          
              return this.dragView;*/
            return undefined;
        }
        /*
            Callbacks from the Drag - Touchinterpreters
            get the toppest view for the dragging position(finger location)
            and if a drag has stopped visiting a controllers region(draged over somewhere) --> notify that controller
            @TODO - Maybe the wrong place for it here
        */
        dragMove(orgin) {
            /* if (this.dragView == undefined) {
                 Logger.error("JBDocument.dragMove() - dragView should not be undefined here");
                 return;
             }
             var testView = this.doucmentView.getViewForOrignAndOptions(orgin, (view: View): boolean => {
                 return view.controller != undefined;
             });
     
             if (testView == undefined || testView.getController() == undefined) {
                 return;
             }
             var testViewController: AbstractViewController = testView.getController();
             if (this.currentDragReciever == undefined) {
                 this.currentDragReciever = testViewController;
             }
             if (testViewController != this.currentDragReciever) {
                 this.currentDragReciever.dragHasLeft();
                 this.currentDragReciever = testViewController;
             }
     
             testViewController.dragHasMoved(orgin, this.dragView);*/
        }
        /*
            Callbacks from the Drag - Touchinterpreters
            get the toppest view for the dragging position(finger location)
            that view's controller wins and gets to decide what to to with the view
            @TODO - Maybe the wrong place for it here
        */
        dragEnd(orgin) {
            /* var posiibleViews = new Array<View>();
             this.doucmentView.getViewsForOrgin(posiibleViews, orgin);
     
             for (let view of posiibleViews) {
                 if (view == undefined || view.getController() == undefined) {
                     continue;
                 }
                 var testViewController: AbstractViewController = view.getController();
                 if (testViewController.dragHasEnded(orgin, this.dragView)) {
                     break;
                 }
             }
             //reset them vars
             this.dragView = undefined;
             this.currentDragReciever = undefined;*/
        }
        /*
            Callbacks from the Scroll - Touchinterpreters
            get the toppest view that is scrollable and notify it that a scroll happend
            @TODO - Maybe the wrong place for it here
        */
        scrollMove(orgin, difference) {
            /* var scrollView = this.doucmentView.getViewForOrignAndOptions(orgin, (view: View): boolean => {
                 return view.scrollable == true;
             });
             if (scrollView == undefined) {
                 return;
             }
             scrollView.scroll(difference);
             this.render(); */
        }
        /*
            Callbacks from the Click-Gesture Sender
            get the toppest view that will react to the event
            @TODO - Maybe the wrong place for it here
        */
        tapRecieved(orgin, values) {
            /* var key = TapGestureCallback.keyOf(values);
             var gestureReciever = this.doucmentView.getViewForOrignAndOptions(orgin, (view: View): boolean => {
                 return view.hasGestureType(key);
             });
             if (gestureReciever != undefined) {
                 gestureReciever.fireGesture(key, values);
             }*/
        }
        /*
                Callbacks from the Click-Gesture Sender
                get the toppest view that will react to the event
                @TODO - Maybe the wrong place for it here
            */
        clickRecieved(orgin, values) {
            /* var key = ClickGestureCallback.keyOf(values);
             var gestureReciever = this.doucmentView.getViewForOrignAndOptions(orgin, (view: View): boolean => {
                 return view.hasGestureType(key);
             });
             if (gestureReciever != undefined) {
                 gestureReciever.fireGesture(key, values);
             }*/
        }
    }
    seven.JBDocument = JBDocument;
})(seven || (seven = {}));
