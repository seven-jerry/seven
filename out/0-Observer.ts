namespace seven {
    export class Observer{
    public thisRef;
    public method;
    public userInfo: boolean;
    constructor(thisRef: any, method, userInfo) {
        this.thisRef = thisRef;
        this.method = method;
        this.userInfo = userInfo;
    }

    
}
}