//{INSERTORDER:3}

namespace seven {
    export class DragTouchInterpreter extends TouchIntepreter implements IDragInterpreter, IMouseSenderAccess, IScreenSenderAccess {

        delegate: IDragIntepreterDelegate;
        sourceView: View;
        dragView: View;
        htmlContainer: View;
        delegateTouchEvent: ITouchEvent;
        touchOffset: Orgin = Orgin.empty();
        layoutView: Array<IDragLayout> = new Array<IDragLayout>();

        public static className: string = "seven.DragTouchInterpreter";
        /**
         * This gives the instance, which was loaded by the Classloader
         * You can use this to access this instance afterwoulds-or don't, you decide
        */
        public static loadedInstance(): DragTouchInterpreter {
            var loadedInstance = ClassLoader.manager().getLoadedInstance(DragTouchInterpreter.className);
            if (loadedInstance != undefined) {
                return loadedInstance;
            }
            var dragIntepreter = new DragTouchInterpreter();
            TouchManager.manager().dragIntepreter = dragIntepreter;
            return dragIntepreter;
        }
        constructor() {
            super();
            this.setDelegate(JBDocument.document());
        }
        setDelegate(delegate: IDragIntepreterDelegate): void {
            this.delegate = delegate;
        }

        mousedown(event: any, touchEvent: ITouchEvent) {
        }

        mouseup(event: any, touchEvent: ITouchEvent) {
            if (this.htmlContainer == undefined) {
                return;
            }
            this.delegate.dragEnd(touchEvent.getOrgin());
            this.sourceView.hidden = false;
            this.sourceView.mark = "";

            // this.sourceView.appliadFrame = Rect.copyRect(this.dragView.appliadFrame);

            //   this.sourceView.superView.addSubview(this.sourceView);
            this.htmlContainer.remove();
            this.htmlContainer = undefined;
            this.dragView = undefined;
            JBDocument.document().render();
        }
        mousemove(event: any, touchEvent: ITouchEvent) {
            this.delegateTouchEvent = touchEvent;


            //console.info(touchEvent.getDifference().toString());
            this.checkDrag();
            if (this.htmlContainer != undefined) {
                var x = JBDocument.document().getResizeManager().horizontalReferenceValue(touchEvent.getOrgin().x,true);
                var y = JBDocument.document().getResizeManager().verticalReferenceValue(touchEvent.getOrgin().y,true);
                this.htmlContainer.initialReferenceFrame.setX(x - this.touchOffset.x);
                this.htmlContainer.initialReferenceFrame.setY(y - this.touchOffset.y);
                JBDocument.document().render();
                this.delegate.dragMove(touchEvent.getOrgin());
                for (let view of this.layoutView) {
                    view.layoutForDrag(new Orgin(x, y));
                }
            }

        }
        mouseout(event: MouseEvent, touchEvent: ITouchEvent) {
            if (event.srcElement != event.target) {
                return;
            }
            JBDocument.document().render();
            if (this.htmlContainer != undefined) {
                this.delegate.dragEnd(touchEvent.getOrgin());
            }
        }

        touchstart(event: any, touchEvent: ITouchEvent) {
            this.delegateTouchEvent = touchEvent;
            TouchManager.manager().screenSender.addLongPressCallback(new VoidCallback(this, this.screenLongPressDected));
        }

        touchmove(event: any, touchEvent: ITouchEvent) {
            this.delegateTouchEvent = touchEvent;


            //console.info(touchEvent.getDifference().toString());
            this.checkDrag();
            if (this.htmlContainer != undefined) {
                var x = JBDocument.document().getResizeManager().horizontalReferenceValue(touchEvent.getOrgin().x,true);
                var y = JBDocument.document().getResizeManager().verticalReferenceValue(touchEvent.getOrgin().y,true);
                this.htmlContainer.initialReferenceFrame.setX(x - this.touchOffset.x);
                this.htmlContainer.initialReferenceFrame.setY(y - this.touchOffset.y);
                JBDocument.document().render();
                this.delegate.dragMove(touchEvent.getOrgin());
                for (let view of this.layoutView) {
                    view.layoutForDrag(new Orgin(x, y));
                }
                JBNotificationCenter.touchEventManager().postNotificationForName("dragStart", undefined);
            }
        }
        touchend(event: any, touchEvent: ITouchEvent) {
            this.delegateTouchEvent = touchEvent;
            if (this.htmlContainer == undefined) {
                return;
            }
            JBNotificationCenter.touchEventManager().postNotificationForName("dragEnd", undefined);
            this.delegate.dragEnd(touchEvent.getOrgin());
            this.sourceView.hidden = false;
            this.sourceView.mark = "";


            this.htmlContainer.remove();
            this.htmlContainer = undefined;
            this.dragView = undefined;
            JBDocument.document().render();
        }
        touchcancel(event: any, touchEvent: ITouchEvent) {
            JBNotificationCenter.touchEventManager().postNotificationForName("dragEnd", undefined);

        }

        longPressDetected() {
            this.delegateTouchEvent.setDragging(true);
            this.checkDrag();
        }

        screenLongPressDected() {
            this.delegateTouchEvent.setDragging(true);
            this.screenCheckDrag();
            this.checkDrag();
        }

        screenCheckDrag() {
            if (this.delegateTouchEvent.isDragging() == true && this.htmlContainer == undefined) {
                JBNotificationCenter.touchEventManager().postNotificationForName("dragStart", undefined);
            }
        }

        checkDrag() {
            if (this.delegateTouchEvent.isDragging() == true && this.htmlContainer == undefined) {

                this.sourceView = this.delegate.dragStart(this.delegateTouchEvent.getOrgin());
                if (this.sourceView == undefined) {
                    return;
                }
                this.sourceView.mark = "dragView";
                this.buildTouchOffset(this.sourceView);
                this.prepareDragView();
                this.prepareHtmlContainer();


                JBDocument.document().doucmentView.addSubview(this.htmlContainer);
                this.htmlContainer.addSubview(this.dragView);
                JBDocument.document().render();
            }
        }
        prepareDragView() {
            this.dragView = this.sourceView.copy();
            this.dragView.subViews = new Array();
            this.sourceView.hidden = true;
            this.dragView.referenceFrame.setX(0);
            this.dragView.referenceFrame.setY(0);
            this.sourceView.copyAllSubViews(this.dragView);
        }

        prepareHtmlContainer() {
            this.htmlContainer = this.dragView.createHtmlContainer("dragTouch");
            this.htmlContainer.zIndex = 20;
            var totalOffset = this.dragView.referenceOffset();

            this.htmlContainer.referenceFrame = Rect.copyRect(this.dragView.referenceFrame);
            this.htmlContainer.referenceFrame.setX(totalOffset.x);
            this.htmlContainer.referenceFrame.setY(totalOffset.y);
            this.htmlContainer.initWithReferenceFrame(this.htmlContainer.referenceFrame);

            var con = <HtmlCanvasView>this.htmlContainer;
            con.canvas.style.backgroundColor = "transparent";
        }
        buildTouchOffset(toView: View) {
            var viewOrgin: Orgin = toView.screenOffset();
            var touchOrgin = this.delegateTouchEvent.getOrgin();
            touchOrgin.removeOrgin(viewOrgin);

            var x = JBDocument.document().getResizeManager().horizontalReferenceValue(touchOrgin.x,true);
            var y = JBDocument.document().getResizeManager().verticalReferenceValue(touchOrgin.y,true);
            this.touchOffset = new Orgin(x, y);
        }

        addLayoutView(layoutView: IDragLayout) {
            for (let view of this.layoutView) {
                if (view == layoutView) {
                    return;
                }
            }
            this.layoutView.push(layoutView);
        }
        emptyLayoutView():void{
            this.layoutView = new Array();
        }

    }
}
seven.ClassLoader.manager().loadInstance(seven.DragTouchInterpreter.className);