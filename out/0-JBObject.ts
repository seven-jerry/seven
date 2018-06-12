//{INSERTORDER:1}

namespace seven {
    export class JBObject implements IJBObject{
    className?:string;
    constructor(){
        this.className = this.constructor.name;
        ClassLoader.manager().hasLoaded(this.getClassName());
    }
    public getClassName():string{
       if(this.className == undefined){
        Logger.error("classname was not defined");
        
       }
        return this.className;
    }
    public equals(object:Object):boolean{
        if(object == undefined){
            return false;
        }
        return object == this;
    }
    
    public hasBeenLoaded():void{
    }

    public hashcode():number{
        return 0;
    }
    public toString():string{
        return this.className;
    }
    public copyAttributes(toObject:JBObject):void{
        toObject.className = this.className;
    }
    public copy():JBObject{
        var newObject:JBObject = new JBObject();
        this.copyAttributes(newObject);
        return newObject;
    }
}
}