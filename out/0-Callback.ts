namespace seven {
    export class Callback<T,U,V> {
    thisRef: Object;
    method: (t?:T,u?:U,v?:V) => void;
    public constructor(thisRef: Object, method: (t?:T,u?:U,v?:V) => void) {
        this.thisRef = thisRef;
        this.method = method;
    }
    call(t?:T,u?:U,v?:V) {

        if(t != undefined && u != undefined && v != undefined){
            this.method.call(this.thisRef,t,u,v);
            return;
        }
        if(t != undefined && u != undefined){
            this.method.call(this.thisRef,t,u);
            return;
        }
        if(t != undefined){
            this.method.call(this.thisRef,t);
            return;
        }
    }
}
export class VoidCallback{
    thisRef: Object;
    method: () => void;
    public constructor(thisRef: Object, method: () => void) {
        this.thisRef = thisRef;
        this.method = method;
    }
    call() {
        this.method.call(this.thisRef);
    }
}
}