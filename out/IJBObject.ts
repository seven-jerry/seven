namespace seven {
    export interface IJBObject{
     getClassName?():string;
     equals?(object:Object):boolean;
     hasBeenLoaded?():void;
     hashcode?():number;
     toString?():string;
     copyAttributes?(toObject:IJBObject):void;
     copy?():IJBObject;
}
}