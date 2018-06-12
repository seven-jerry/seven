//{INSERTORDER:3}

namespace seven {
    export class ScrollTouchInterpreter extends TouchIntepreter implements IScrollInterpreter {

        keyboardTouchOrgin: Orgin;
        animationStart: number = undefined;
        delegate: IScrollIntepreterDelegate;
        movedY: number;
        moveOrgin: Orgin;
        stop: boolean;
        ignoreScroll: boolean = false;

        animationY: number = 0;

        public static className: string = "seven.ScrollTouchInterpreter";
        /**
         * This gives the instance, which was loaded by the Classloader
         * You can use this to access this instance afterwoulds-or don't, you decide
        */
        public static loadedInstance(): ScrollTouchInterpreter {
            var loadedInstance = ClassLoader.manager().getLoadedInstance(ScrollTouchInterpreter.className);
            if (loadedInstance != undefined) {
                return loadedInstance;
            }
            var scrollInterpreter = new ScrollTouchInterpreter();
            TouchManager.manager().scrollIntepreter = scrollInterpreter;
            return scrollInterpreter;
        }
        constructor() {
            super();
            this.setDelegate(JBDocument.document());
            JBNotificationCenter.touchEventManager().addObserverForName("dragStart", new Observer(this, this.ignoreScrolling, undefined));
            JBNotificationCenter.touchEventManager().addObserverForName("dragEnd", new Observer(this, this.activateScrolling, undefined));

        }
        setDelegate(delegate: IScrollIntepreterDelegate): void {
            this.delegate = delegate;
        }

        touchstart(event, touchEvent) {
            //     this.animationY = 0;
        }
        touchmove(event, touchEvent) {
            if (this.ignoreScroll == true) {
                return;
            }
            var movedX = touchEvent.getDifference().x;
            this.movedY = touchEvent.getDifference().y;
            if (this.movedY < -5 || this.movedY > 5) {
                this.animationY += this.movedY * 5;
            } else {
                this.animationY = 0;
            }
            console.log("screen " + touchEvent.getDifference().y);
            this.moveOrgin = touchEvent.getOrgin().copy();

            
            this.delegate.scrollMove(this.moveOrgin, new Orgin(movedX, this.movedY));
        }
        touchend(event, touchEvent) {
            this.startAnimation();
        }
        touchcancel(event, touchEvent) {
        }
        startAnimation() {
            if (this.animationY < -10 && this.animationY > 10) {
                return;
            }
            this.animate();
        }
        animate() {
            if (this.animationY <= 0 && this.animationY > -10) {
                return;
            }
            if (this.animationY >= 0 && this.animationY < 10) {
                return;
            }
            var animationBite = this.animationY * 0.1;
            this.animationY -= animationBite;
            console.log(animationBite + "bite" + Math.abs(Math.round(animationBite)));
            var time = 10;
            if (Math.abs(animationBite) < 50) {
                time = 5;
            }
            if (Math.abs(animationBite) < 10) {
                time = 3;
            }
            if (Math.abs(animationBite) < 2) {
                time = 1;
            }

            console.log("time" + time);

            this.delegate.scrollMove(this.moveOrgin, new Orgin(0, this.movedY));
            setTimeout(() => { this.animate(); }, time);
        }



        mousedown(event: any, touchEvent: ITouchEvent) {
            this.keyboardTouchOrgin = touchEvent.getOrgin().copy();
        }
        mouseup(event: any, touchEvent: ITouchEvent) {
            this.keyboardTouchOrgin = touchEvent.getOrgin().copy();
        }
        mousemove(event: any, touchEvent: ITouchEvent) {
            this.keyboardTouchOrgin = touchEvent.getOrgin().copy();

        }
        mouseout(event: MouseEvent, touchEvent: ITouchEvent) {
            //  this.keyboardTouchOrgin = undefined;
        }
        mousewheel(event: WheelEvent): void {
            //console.log("x " + event.deltaX + " y " + event.deltaY);
            var movedX = event.deltaX;
            var movedY = event.deltaY;
            this.moveOrgin = new Orgin(event.clientX, event.clientY);
            //console.log(new Orgin(movedX, movedY).toString());
            this.delegate.scrollMove(this.moveOrgin, new Orgin(movedX, movedY));
            /*   if(  this.movedY > 0 ){
                   this.move();
               }
               else{
                   this.moveUp();
               }
               */
        }

        move() {
            this.delegate.scrollMove(this.moveOrgin, new Orgin(0, 50));
            var that = this;
            if (this.stop == true) {
                return;
            }
            setTimeout(function () {
                if (that.movedY > 0) {
                    that.movedY -= 50;
                    that.move();
                }
            }, 12);
        }
        moveUp() {
            this.delegate.scrollMove(this.moveOrgin, new Orgin(0, -50));
            var that = this;
            if (this.stop == true) {
                return;
            }
            setTimeout(function () {
                if (that.movedY < 0) {
                    that.movedY += 50;
                    that.moveUp();
                }
            }, 12);
        }

        keyDown(event: any, touchEvent: ITouchEvent) {
            if (this.keyboardTouchOrgin == undefined) {
                console.log("keyboardTouchOrgin = undefined");
                return;
            }
            this.delegate.scrollMove(this.keyboardTouchOrgin.copy(), touchEvent.getDifference());
        }
        keyUp(event: any, touchEvent: ITouchEvent) {

        }
        keyPress(event: any, touchEvent: ITouchEvent) {

        }


        /* */

        ignoreScrolling() {
            this.ignoreScroll = true;
        }
        activateScrolling() {
            this.ignoreScroll = false;
        }
    }
}



seven.ClassLoader.manager().loadInstance(seven.ScrollTouchInterpreter.className);