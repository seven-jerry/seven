//{INSERTORDER:4}
/**
 * This class provides the default implementation for the resize Manager
 * This class wil get loaded in the global space(last line of file)
 * Here it registeres for resize events and handles them
 */
var seven;
(function (seven) {
    class ResizeManager {
        constructor() {
            this.hasRegistered = false;
            this.userScale = 0;
        }
        getClassName() { return seven.ResizeManager.classname; }
        /**
         * This gives the instance, which was loaded by the Classloader
         * You can use this to access this instance afterwoulds-or don't, you decide
         */
        static loadedInstance() {
            var loadedInstance = seven.ClassLoader.manager().getLoadedInstance(ResizeManager.classname);
            if (loadedInstance != undefined) {
                seven.JBDocument.document().setResizeManager(loadedInstance);
                return loadedInstance;
            }
            var resize = new ResizeManager();
            seven.JBDocument.document().setResizeManager(resize);
            seven.on("documentInitSize", () => {
                resize.handleResize(window.innerWidth, window.innerHeight);
            });
            return resize;
        }
        /**
        * Here we register as the resizeManager
        *
        */
        initDocument() {
            seven.JBDocument.document().setResizeManager(this);
        }
        setup(document) {
            this.document = document;
        }
        startResizing() {
            this.registerForResizeEvent();
            this.handleResize(window.innerWidth, window.innerHeight);
        }
        resize() {
            this.handleResize(this.document.doucmentView.frame.width(), this.document.doucmentView.frame.height());
        }
        hasSizeClass() {
            return this.activeSizeClass != undefined;
        }
        verticalScreenValue(value, useBaseClass = true) {
            var resizeSizeClass = this.resizeSizeClass(useBaseClass);
            if (resizeSizeClass.getHeight() == undefined) {
                return value;
            }
            if (this.document == undefined || this.document.doucmentView == undefined) {
                return value;
            }
            return (value / resizeSizeClass.getHeight()) * this.document.doucmentView.frame.height();
        }
        horizontalScreenValue(value, useBaseClass = true) {
            var resizeSizeClass = this.resizeSizeClass(useBaseClass);
            if (this.document == undefined || this.document.doucmentView == undefined) {
                return value;
            }
            return (value / resizeSizeClass.getWidth()) * this.document.doucmentView.frame.width();
        }
        verticalReferenceValue(value, useBaseClass = true) {
            var resizeSizeClass = this.resizeSizeClass(useBaseClass);
            if (resizeSizeClass.getHeight() == undefined) {
                return value;
            }
            var testValue = 10;
            var temp = this.verticalScreenValue(testValue, useBaseClass);
            var ratio = testValue / temp;
            var result = value * ratio;
            return result;
        }
        horizontalReferenceValue(value, useBaseClass = true) {
            var testValue = 10;
            var temp = this.horizontalScreenValue(testValue, useBaseClass);
            var ratio = testValue / temp;
            var result = value * ratio;
            return result;
        }
        resizeSizeClass(useBaseClass = true) {
            if (useBaseClass == false) {
                return seven.JBDocument.document().getSizeLoader().getSizeClass();
            }
            return seven.JBDocument.document().getSizeLoader().getBaseClass();
        }
        handleResize(newWidth, newHeight) {
            var userScaleChange = window.outerWidth / window.innerWidth;
            if (this.userScale != 0 && userScaleChange != this.userScale) {
                this.userScale = userScaleChange;
                return;
            }
            this.userScale = userScaleChange;
            this.document.doucmentView.initWitFrame(new seven.Rect(0, 0, newWidth, newHeight));
            seven.JBDocument.document().getSizeLoader().changeSizeClass(newWidth, newHeight);
            var nextSizeClass = seven.JBDocument.document().getSizeLoader().getSizeClass();
            this.baseSizeClass = seven.JBDocument.document().getSizeLoader().getBaseClass();
            if (this.activeSizeClass == undefined) {
                this.activeSizeClass = this.baseSizeClass;
            }
            if (nextSizeClass != this.activeSizeClass) {
                seven.SizeNotifier.notifier().postSizeClassChange(this.activeSizeClass, nextSizeClass);
                this.activeSizeClass = nextSizeClass;
            }
            var newFrame = new seven.Rect(0, 0, newWidth, newHeight);
            this.document.render();
        }
        registerForResizeEvent() {
            if (this.hasRegistered == true) {
                return;
            }
            this.hasRegistered = true;
            var self = this;
            window.onresize = function () {
                // console.log("w: "+window.screen.width+" h: "+window.screen.height);
                //self.handleResize(window.innerWidth, window.innerHeight);
                setTimeout(function () {
                    self.handleResize(window.innerWidth, window.innerHeight);
                }, 200);
            };
        }
    }
    //AutoGeneratedClassName-start - do not eidt this line
    ResizeManager.classname = "seven.ResizeManager";
    seven.ResizeManager = ResizeManager;
})(seven || (seven = {}));
seven.ClassLoader.manager().loadInstance(seven.ResizeManager.classname);
