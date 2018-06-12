//{INSERTORDER:4}
/**
 * This class provides the default implementation for the resize Manager
 * This class wil get loaded in the global space(last line of file)
 * Here it registeres for resize events and handles them 
 */
namespace seven {
    export class ResizeManager implements IResizeManager {
    public static className:string = "seven.ResizeManager";
    document: JBDocument;
    activeSizeClass: ISizeClass;
    baseSizeClass:ISizeClass;
    hasRegistered: boolean = false;
    userScale: number = 0;

    /**
     * This gives the instance, which was loaded by the Classloader
     * You can use this to access this instance afterwoulds-or don't, you decide
     */
    public static loadedInstance(): ResizeManager {
        var loadedInstance = ClassLoader.manager().getLoadedInstance(ResizeManager.className);
        if (loadedInstance != undefined) {
            JBDocument.document().setResizeManager(loadedInstance);
            return loadedInstance;
        }
        var resize = new ResizeManager();
        JBDocument.document().setResizeManager(resize);

        return resize;
    }
    public getClassName():string{
        return  ResizeManager.className;
    }
   
    /**
    * Here we register as the resizeManager
    * 
    */
    initDocument() {
        JBDocument.document().setResizeManager(this);
    }
    constructor() {}

    setup(document: JBDocument) {
        this.document = document;
    }

    startResizing() {
        this.registerForResizeEvent();
        this.handleResize(window.innerWidth, window.innerHeight);
    }
    public resize() {
        this.handleResize(this.document.doucmentView.referenceFrame.width(), this.document.doucmentView.referenceFrame.height());
    }
    hasSizeClass(): boolean {
        return this.activeSizeClass != undefined;
    }
    verticalScreenValue(value: number, useBaseClass: boolean = true): number {
        var resizeSizeClass = this.resizeSizeClass(useBaseClass);
        if (resizeSizeClass.getHeight() == undefined) {
            return value;
        }
        if (this.document == undefined || this.document.doucmentView == undefined) {
            return value;
        }

        return (value / resizeSizeClass.getHeight()) * this.document.doucmentView.referenceFrame.height();
    }

    horizontalScreenValue(value: number, useBaseClass: boolean = true): number {
        var resizeSizeClass = this.resizeSizeClass(useBaseClass);
        if (this.document == undefined || this.document.doucmentView == undefined) {
            return value;
        }
        return (value / resizeSizeClass.getWidth()) * this.document.doucmentView.referenceFrame.width();
    }

    verticalReferenceValue(value: number, useBaseClass: boolean = true): number {
        var resizeSizeClass = this.resizeSizeClass(useBaseClass);
        if (resizeSizeClass.getHeight() == undefined) {
            return value;
        }
        var testValue = 10;
        var temp = this.verticalScreenValue(testValue,useBaseClass);
        var ratio = testValue / temp;
        var result = value * ratio;
        return result;
    }
    horizontalReferenceValue(value: number, useBaseClass: boolean = true): number {
        var testValue = 10;
        var temp = this.horizontalScreenValue(testValue,useBaseClass);
        var ratio = testValue / temp;
        var result = value * ratio;
        return result;
    }
    private resizeSizeClass(useBaseClass: boolean = true):ISizeClass{
        if(useBaseClass == false ){
            return JBDocument.document().getSizeLoader().getSizeClass();
        }
        return JBDocument.document().getSizeLoader().getBaseClass();
    }
    private handleResize(newWidth, newHeight) {
        var userScaleChange = window.outerWidth / window.innerWidth;
        if (this.userScale != 0 && userScaleChange != this.userScale) {
            this.userScale = userScaleChange;
            return;
        }
        this.userScale = userScaleChange;
        this.document.doucmentView.initWithReferenceFrame(new Rect(0, 0, newWidth, newHeight));
       JBDocument.document().getSizeLoader().changeSizeClass(newWidth, newHeight);
       var nextSizeClass = JBDocument.document().getSizeLoader().getSizeClass();
        this.baseSizeClass = JBDocument.document().getSizeLoader().getBaseClass();
        if(this.activeSizeClass == undefined){
            this.activeSizeClass = this.baseSizeClass;
        }
        
        if (nextSizeClass != this.activeSizeClass) {
            SizeNotifier.notifier().postSizeClassChange(this.activeSizeClass, nextSizeClass);
            this.activeSizeClass = nextSizeClass;
        }
        var newFrame = new Rect(0, 0, newWidth, newHeight);
        this.document.render();
    }

    private registerForResizeEvent() {
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
}

seven.ClassLoader.manager().loadInstance(seven.ResizeManager.className);    
