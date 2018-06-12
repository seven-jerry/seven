namespace seven {
    export interface ISizeCatalog {
    getBaseClass():ISizeClass;
    getSizeClasses():Array<ISizeClass>;
    getName():String;
    setName(name:String);
    changeForSize(width:number,height:number):void;
    getSizeClass():ISizeClass;
}
}