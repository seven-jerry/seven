namespace seven {
    export class UniqueKeyEnumation {
    keys:Array<string>;
    constructor(){
        this.keys = new Array();
    }

    hasKey(key:string):boolean{
        var hasKey = 0;

        this.keys.forEach(element => {
            if(element == key){
                hasKey = 1;
            }
        });

        if( hasKey == 1 ){
            return true;
        }
        return false;
    }
    addKey(key:string){
        var hasKey = 0;
        this.keys.forEach(element => {
            if(element == key){
                hasKey = 1;
            }
        });

        if( hasKey == 1 ){
            throw new Error("UniqueKeyEnumation - tried to add duplicate key");
        }
        this.keys.push(key);
    }

}
}