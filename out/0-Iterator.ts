namespace seven {
    export class JMBIterator{
    inputArray:Array<any>;
    private index:number = 0;
    constructor(arr:Array<any>){
        this.inputArray = arr;
    }
    hasNext():boolean{
        return this.index < this.inputArray.length;
    }
    next():any{
        if(this.hasNext() == false){
            return undefined;
        }
        var nextElement = this.inputArray[this.index];
        this.index ++;
        return nextElement;
    }

}
}