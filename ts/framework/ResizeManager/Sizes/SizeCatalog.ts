namespace seven {
    export class SizeCatalog implements ISizeCatalog {
    classes: Array<ISizeClass>;
    private baseClass: ISizeClass;
    name: String;
    currentSizeClass: ISizeClass;

    constructor(name: String) {
        this.classes = new Array();
        this.name = name;
    }


    setBaseClass(sizeClass:ISizeClass){
        this.baseClass = sizeClass;
        this.classes.push(this.baseClass);
    }
    getBaseClass(): ISizeClass {
        return this.baseClass;
    }
    addSizeClasses(sizeCLass:ISizeClass):void{
        this.classes.push(sizeCLass);
    }
    getSizeClasses(): Array<ISizeClass> {
       return this.classes;
    }
    changeForSize(width: number, height: number): void {
        if (width < this.baseClass.getWidth()) {
            this.currentSizeClass = this.findBiggestClass(width);
        }
        if (width > this.baseClass.getWidth()) {
            this.currentSizeClass =  this.findSmallestClass(width);
        }
    }

    private findBiggestClass(width: number): ISizeClass {
        var modulo = width % this.baseClass.getWidth();
        var runningClassObj = this.baseClass;

        for (var i in this.classes) {
            var classObj = this.classes[i];
            if (classObj.getWidth() > this.baseClass.getWidth()) {
                continue;
            }
            if (classObj.getWidth() == width) {
                return classObj;
            }
            if (width < classObj.getWidth() && width % classObj.getWidth() > modulo) {
                runningClassObj = classObj;
            }
        }
        return runningClassObj;
    }
    private findSmallestClass(width: number): ISizeClass {
        var baseClassDifference = width - this.baseClass.getWidth();
        var runningClassObj = this.baseClass;

        for (var i in this.classes) {
            var classObj = this.classes[i];
            if (classObj.getWidth() < this.baseClass.getWidth()) {
                continue;
            }
            if (classObj.getWidth() == width) {
                return classObj;
            }
            var currentClassDifference =  width - classObj.getWidth();
            if (width > classObj.getWidth() && currentClassDifference < baseClassDifference) {
                runningClassObj = classObj;
            }
        }
        return runningClassObj;
    }
    getName(): String {
        return this.name;
    }
    setName(name: String) {
        this.name = name;
    }
    getSizeClass(): ISizeClass {
        return this.currentSizeClass || this.baseClass;
    }
}
}