//{INSERTORDER:2}

namespace seven {
    export abstract class View extends JBObject implements IDrawable {

    /*
        |----------------------------|
        |         sizing             |
        |----------------------------|
    */
    private sieProvider:ISizeProvider;
    public referenceFrame: Rect;
    public initialReferenceFrame: Rect;
    public appliadFrame: Rect = Rect.empty();
    public sizeKey: string = "";
    public useBaseClass: boolean = undefined;
    public constraints: Array<IConstraint> = new Array();
    public style: ViewStyle;

    /*
        |----------------------------|
        |         dispaly            |
        |----------------------------|
    */
    public superView: View;
    public subViews: Array<View>;
    public backgroundColor: string;
    public strokeColor: string;
    public strokewWidth: number = 1;
    public hidden = false;
    public zIndex: number = undefined;
    public padding: Rect = Rect.empty();
    public margin: Rect = Rect.empty();

    /*
        |----------------------------|
        |         info               |
        |----------------------------|
    */

    public totalOffset: Orgin;
    public mark: string;
    public tag: string;
    public dragable = false;
    public scrollable = false;

    /*
        |----------------------------|
        |          other             |
        |----------------------------|
    */

    public gestureActions: JMBMap<string, GestureCallback> = new JMBMap<string, GestureCallback>();
    protected viewExtentions: Array<IViewDrawable> = new Array<IViewDrawable>();
    public window: JMBWindow;
    public controller: AbstractViewController;

    private hasLoggedRefFrame: boolean = false;

    constructor() {
        super()
        this.tag = "";
        this.subViews = new Array();
        this.referenceFrame = Rect.empty();
        this.initialReferenceFrame = Rect.empty();
        this.totalOffset = Orgin.empty();
        this.style = new ViewStyle().initWithView(this);
    }

    public setController(viewController: AbstractViewController) {
        this.controller = viewController;
        this.controller.setView(this);
    }

    public remove(): void {
        if (this.superView) {
            this.superView.removeSubView(this);
        }
        this.superView = undefined;
    }
    /**
     * 
     * @param frame the frame which the view should get
     */
    initWithReferenceFrame(frame: Rect): View {
        this.initialReferenceFrame = Rect.copyRect(frame);
        this.referenceFrame = Rect.copyRect(frame);
        return this;
    }
     /**
     * 
     * @param key a vaid size-key
     */
    initWithSizeKey(key: string): View {
        this.initialReferenceFrame = Rect.empty();
        Object.freeze(this.initialReferenceFrame);
        this.sizeKey = key;
        this.setupFrameFromKey();
        return this;
    }
    /**
     * called to get the refframe from a size
     */
    private setupFrameFromKey() {
        if (JBDocument.document().getSizeLoader() == undefined) {
            Logger.develepor("View : setupFrameFromKey : JBDocument.document().getSizeLoader() falied");
            return;
        }
        var frame = JBDocument.document().getSizeLoader().getSizeRectForKey(this.sizeKey);
        if (frame != undefined) {
            this.changeReferenceFrame(frame);
        }
    }
    /**
     * 
     * @param frame the new frame for the view
     */
    changeReferenceFrame(frame: Rect) {
        this.referenceFrame = Rect.copyRect(frame);
        if(this.hasLoggedRefFrame == false){
            this.hasLoggedRefFrame = true;
            Logger.develeporInfo(this.getClassName() + " - changeReferenceFrame  : Generic signature used." +
            "Any Costums Views shoukd overwride it");
        }
       
    }
    /**
     * 
     * @param extention the extention(border) that should be added
     */
    addViewExtention(extention:IViewDrawable) {
        this.viewExtentions.push(extention);
    }
    /**
     * 
     * @param hidden hidden will not get drawn and ignored by touch events
     */
    public setHidden(hidden: boolean) {
        this.hidden = hidden;
    }

    /**
     * 
     * @returns gets a valid drawing rect
     */
    public getDrawingRect(): Rect {
        if (this.hidden == true) {
            return Rect.empty();
        }
        if (this.appliadFrame != undefined && this.appliadFrame.isEmpty() == false) {
            return this.appliadFrame;
        }
        if (this.referenceFrame != undefined && this.referenceFrame.isEmpty() == false) {
            return this.referenceFrame;
        }
        return this.initialReferenceFrame;
    }
    /**
     * frist draw lifecycle - reset all aplied tranformations
     */
    public resetReferenceFrame() {
        if (this.initialReferenceFrame.isEmpty() == false) {
            this.referenceFrame = this.initialReferenceFrame.copy();
        }
        if (this.sizeKey.length > 0) {
            this.setupFrameFromKey();
        }
        this.resetSubViewReferenceFrame();
    }


    protected resetSubViewReferenceFrame() {
        for (let subView of this.subViews) {
            subView.resetReferenceFrame();
        }
    }
    /**
     * secound draw lifecycle - change the view for given constraints
     */
    public buildConstraints(): void {
        for (let contraint of this.style.getConstraints()) {
            contraint.applyContraint(this, this.superView);
        }
        for (let contraint of this.constraints) {
            contraint.applyContraint(this, this.superView);
        }
        for (let subView of this.subViews) {
            subView.buildConstraints();
        };
    }
    /**
     * third draw lifecycle - the referenceframe gets scaled to screen
     */
    public buildAppliadFrame(): void {
        this.appliadFrame.setX(JBDocument.document().horizontalScreenValue(this.referenceFrame.x(), this.shouldUseBaseClass()));
        this.appliadFrame.setY(JBDocument.document().verticalScreenValue(this.referenceFrame.y(), this.shouldUseBaseClass()));
        this.appliadFrame.setWidth(JBDocument.document().horizontalScreenValue(this.referenceFrame.width(), this.shouldUseBaseClass()));
        this.appliadFrame.setHeight(JBDocument.document().verticalScreenValue(this.referenceFrame.height(), this.shouldUseBaseClass()));

        for (let subView of this.subViews) {
            subView.buildAppliadFrame();
        };
    }
    /**
     * if the view changes with the change of size class, 
     * it is not intended to reference the base size class
     */
    protected shouldUseBaseClass(): boolean {
        if (this.useBaseClass != undefined && this.useBaseClass == false) {
            return false;
        }
        if (this.sizeKey.length > 0) {
            return false;
        }
        return true;
    }


    getController(): AbstractViewController {
        if (this.controller) {
            return this.controller;
        }
        if (this.superView) {
            return this.superView.getController();
        }
        return undefined;
    }
    public copyAllSubViews(destinationView: View): void {
        this.recursiveCopySubviews(destinationView);
    }
    private recursiveCopySubviews(destinationView: View): void {
        for (let subView of this.subViews) {
            var cpySubview = subView.copy();

            destinationView.addSubview(cpySubview);
            subView.recursiveCopySubviews(cpySubview);
        }

    }
    /**
     * 
     * @param layers how deep should the action be appliad
     * @param action some action on the view
     */
    applyActionToSubViews(layers: number, action: (view: View) => void): void {
        this.applyActionToAllSubViews(layers, action);
    }

    private applyActionToAllSubViews(layers: number, action: (view: View) => void) {
        action(this);
        if (layers == 0) {
            return;
        }
        for (let view of this.subViews) {
            var sublayers = layers - 1;
            view.applyActionToAllSubViews(sublayers, action);
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
    public getViewForOrignAndOptions(orgin: Orgin, options: (view: View) => boolean): View {
        var buildArray = new Array<View>();
        this.getViewsForOrgin(buildArray, orgin.copy());
        if (buildArray.length == 0) {
            return undefined;
        }

        var index = 0;
        var optionView = undefined;
        buildArray = buildArray.sort((a: View, b: View) => {
            return b.getZIndex() - a.getZIndex();

        });

        while (optionView == undefined && buildArray.length > index) {
            var testView = buildArray[index];
            if (testView.viewHasOption(options)) {
                optionView = testView;
            }
            index++;
        }
        return optionView;
    }

    public getViewsForOrgin(buildArray: Array<View>, orgin: Orgin): View {
        this.subViews = this.subViews.sort((a: View, b: View) => {
            return b.getZIndex() - a.getZIndex();
        });
        if (this.getComparingRect().containsOrgin(orgin) == true) {
            var subViewOrgin = orgin.copy();
            subViewOrgin.removeX(this.getComparingRect().x());
            subViewOrgin.removeY(this.getComparingRect().y());
            this.addComparingOrgin(subViewOrgin);
            buildArray.push(this);
            for (let subView of this.subViews) {
                if (subView.getComparingRect().containsOrgin(subViewOrgin) == true && subView.hidden == false) {
                    subView.getViewsForOrgin(buildArray, subViewOrgin);
                }
            }
            return this;
        }
        return undefined;
    }
    public getViewForOrgin(orgin: Orgin): View {
        this.subViews = this.subViews.sort((a: View, b: View) => {
            return b.getZIndex() - a.getZIndex();
        });

        if (this.getComparingRect().containsOrgin(orgin) == true) {
            orgin.removeX(this.getComparingRect().x());
            orgin.removeY(this.getComparingRect().y());
            this.addComparingOrgin(orgin);
            for (let subView of this.subViews) {
                if (subView.getComparingRect().containsOrgin(orgin) == true && subView.hidden == false) {
                    return subView.getViewForOrgin(orgin);
                }
            }
            return this;
        }
        return undefined;
    }

    private viewHasOption(options: (view: View) => boolean): boolean {
        if (options(this) == true) {
            return true;
        }
        return false;
    }

    protected getComparingRect(): Rect {
        return this.getDrawingRect();
    }

    protected addComparingOrgin(orgin: Orgin): void { }

    getZIndex(): number {
        if (this.zIndex == undefined && this.superView != undefined) {
            return this.superView.getZIndex() + 1;
        }
        return this.zIndex;
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

    removeSubView(subView: View) {
        for (var index in this.subViews) {
            if (this.subViews[index] == subView) {
                this.subViews.splice(parseInt(index), 1);
            }
        }
    }

    apliadOffset(): Orgin {
        var orgin = this.screenOffset();
        if (orgin.isEmpty()) {
            return orgin;
        }
        return Orgin.copyOrgin(orgin);
    }

    referenceOffset(): Orgin {
        var orgin = this.screenOffset();
        if (orgin.isEmpty()) {
            return orgin;
        }
        var x = JBDocument.document().getResizeManager().horizontalReferenceValue(orgin.x, this.shouldUseBaseClass());
        var y = JBDocument.document().getResizeManager().verticalReferenceValue(orgin.y, this.shouldUseBaseClass());
        return new Orgin(x, y);
    }

    screenOffset(): Orgin {
        var returnOrgin = new Orgin(0, 0);
        return this.buildScreenOffset(returnOrgin);
    }

    buildScreenOffset(orgin: Orgin) {
        orgin.addOrgin(this.totalOffset);
        orgin.addOrgin(this.addScreenOffset());
        return orgin;
    }

    protected addScreenOffset(): Orgin {
        if (this.superView != undefined) {
            return this.superView.addScreenOffset();
        }
        return Orgin.empty();
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
        toObject.referenceFrame = this.referenceFrame.copy();
        toObject.appliadFrame = this.appliadFrame.copy();
        toObject.totalOffset = this.totalOffset.copy();
        toObject.backgroundColor = this.backgroundColor;
        toObject.strokeColor = this.strokeColor;
        toObject.controller = this.controller;
        toObject.mark = this.mark;
        toObject.sizeKey = this.sizeKey;
        toObject.useBaseClass = this.useBaseClass;
        for (let gesture of this.gestureActions.values()) {
            toObject.gestureActions.put(gesture.getKey(), gesture.copy());
        }
        toObject.window = this.window;
        toObject.tag = this.tag;
        toObject.dragable = this.dragable;
        toObject.hidden = this.hidden;
        toObject.zIndex = this.zIndex;
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